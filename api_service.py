from __future__ import annotations

import os
from functools import lru_cache
from typing import Any

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, field_validator

FEATURE_NAME_MAP = {
    "date": "Date",
    "location": "Location",
    "minTemp": "MinTemp",
    "maxTemp": "MaxTemp",
    "rainfall": "Rainfall",
    "evaporation": "Evaporation",
    "sunshine": "Sunshine",
    "windGustDir": "WindGustDir",
    "windGustSpeed": "WindGustSpeed",
    "windDir9am": "WindDir9am",
    "windDir3pm": "WindDir3pm",
    "windSpeed9am": "WindSpeed9am",
    "windSpeed3pm": "WindSpeed3pm",
    "humidity9am": "Humidity9am",
    "humidity3pm": "Humidity3pm",
    "pressure9am": "Pressure9am",
    "pressure3pm": "Pressure3pm",
    "cloud9am": "Cloud9am",
    "cloud3pm": "Cloud3pm",
    "temp9am": "Temp9am",
    "temp3pm": "Temp3pm",
    "rainToday": "RainToday",
}

WIND_DIRECTIONS = {
    "W",
    "WNW",
    "WSW",
    "NE",
    "NNW",
    "N",
    "NNE",
    "SW",
    "nan",
    "ENE",
    "SSE",
    "S",
    "NW",
    "SE",
    "ESE",
    "E",
    "SSW",
}


class PredictionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    date: str = Field(..., examples=["2026-02-26"])
    location: str
    minTemp: float
    maxTemp: float
    rainfall: float
    evaporation: float
    sunshine: float
    windGustDir: str
    windGustSpeed: float
    windDir9am: str
    windDir3pm: str
    windSpeed9am: float
    windSpeed3pm: float
    humidity9am: float
    humidity3pm: float
    pressure9am: float
    pressure3pm: float
    cloud9am: float
    cloud3pm: float
    temp9am: float
    temp3pm: float
    rainToday: str

    @field_validator("rainToday")
    @classmethod
    def validate_rain_today(cls, value: str) -> str:
        normalized = value.strip()
        if normalized not in {"Yes", "No"}:
            raise ValueError("rainToday must be 'Yes' or 'No'.")
        return normalized

    @field_validator("windGustDir", "windDir9am", "windDir3pm")
    @classmethod
    def validate_wind_direction(cls, value: str) -> str:
        normalized = value.strip()
        if normalized not in WIND_DIRECTIONS:
            raise ValueError("Invalid wind direction.")
        return normalized


class PredictionResponse(BaseModel):
    result: bool
    probability: float
    threshold: float
    modelVersion: str


class PredictorService:
    def __init__(self) -> None:
        model_file = os.getenv("MODEL_FILE", "modelv4.joblib")
        columns_file = os.getenv("COLUMNS_FILE", "columnsv4.joblib")
        imputer_file = os.getenv("IMPUTER_FILE", "imputerv4.joblib")
        scaler_file = os.getenv("SCALER_FILE", "scalerv4.joblib")

        self.model = joblib.load(model_file)
        self.columns = list(joblib.load(columns_file))
        self.imputer = joblib.load(imputer_file)
        self.scaler = joblib.load(scaler_file)
        self.threshold = float(os.getenv("MODEL_THRESHOLD", "0.5"))
        self.model_version = os.getenv("MODEL_VERSION", "logreg-v4")

    def _to_frame(self, payload: PredictionRequest) -> pd.DataFrame:
        raw_payload = payload.model_dump()
        mapped_payload = {
            FEATURE_NAME_MAP[key]: value for key, value in raw_payload.items()
        }

        frame = pd.DataFrame([mapped_payload])
        frame["Date"] = pd.to_datetime(frame["Date"], errors="coerce")

        if frame["Date"].isna().any():
            raise ValueError("Invalid date format. Expected YYYY-MM-DD.")

        frame["Date"] = frame["Date"].map(pd.Timestamp.toordinal)
        numeric_columns = frame.select_dtypes(include=["int64", "float64"]).columns

        frame[numeric_columns] = self.imputer.transform(frame[numeric_columns])
        frame[numeric_columns] = self.scaler.transform(frame[numeric_columns])
        frame = pd.get_dummies(frame)
        frame = frame.reindex(columns=self.columns, fill_value=0)

        return frame

    def predict(self, payload: PredictionRequest) -> PredictionResponse:
        prepared_frame = self._to_frame(payload)
        probability = float(self.model.predict_proba(prepared_frame)[0][1])
        prediction = bool(probability >= self.threshold)

        return PredictionResponse(
            result=prediction,
            probability=round(probability, 4),
            threshold=self.threshold,
            modelVersion=self.model_version,
        )


@lru_cache(maxsize=1)
def get_predictor() -> PredictorService:
    return PredictorService()


def build_allowed_origins() -> list[str]:
    value = os.getenv("ALLOWED_ORIGIN", "*").strip()
    if value == "" or value == "*":
        return ["*"]

    return [origin.strip() for origin in value.split(",") if origin.strip()]


app = FastAPI(
    title="JCU Weather Prediction API",
    version="1.0.0",
    description="Inference API for rain-tomorrow prediction.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=build_allowed_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def warmup_model() -> None:
    get_predictor()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/ready")
def ready() -> dict[str, Any]:
    predictor = get_predictor()
    return {
        "status": "ready",
        "modelVersion": predictor.model_version,
        "threshold": predictor.threshold,
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest) -> PredictionResponse:
    try:
        predictor = get_predictor()
        return predictor.predict(payload)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    except HTTPException:
        raise
    except Exception as error:  # pragma: no cover
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {error}",
        ) from error
