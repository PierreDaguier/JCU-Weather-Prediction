FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements-runtime.txt ./
RUN pip install --no-cache-dir -r requirements-runtime.txt

COPY api_service.py modelv4.joblib columnsv4.joblib imputerv4.joblib scalerv4.joblib /app/

EXPOSE 8080

CMD ["uvicorn", "api_service:app", "--host", "0.0.0.0", "--port", "8080"]
