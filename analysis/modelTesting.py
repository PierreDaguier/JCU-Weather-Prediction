import requests
import random
import json
import pandas as pd
import datetime
wind_directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"]
df = pd.read_csv('data/weatherAUS.csv')
locations = df['Location'].unique()
start_date = datetime.date(2000, 1, 1)
end_date = datetime.date.today()
random_date = (start_date + (end_date - start_date) * random.random()).isoformat()
raintoday = ["Yes","No"]


url = "http://localhost:8080/predict"

# Supposons que nous avons ces plages de valeurs pour chaque variable
ranges = {
    "MinTemp": (0, 40),
    "MaxTemp": (0, 50),
    "Rainfall":(0.0, 50),
    "Evaporation":(0.0,25.0),
    "Sunshine":(0.0,14.5),
    "WindGustDir":(
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
        "SSW"
        ),
    "WindGustSpeed":(6.0,100.0),
    "WindDir9am":(
        "W",
        "NNW", 
        "SE", 
        "ENE", 
        "SW", 
        "SSE", 
        "S", 
        "NE", 
        "nan",
        "SSW",
        "N", 
        "WSW", 
        "ESE", 
        "E", 
        "NW", 
        "WNW", 
        "NNE"
    ),
    "WindDir3pm":(
        "W",
        "NNW", 
        "SE", 
        "ENE", 
        "SW", 
        "SSE", 
        "S", 
        "NE", 
        "nan",
        "SSW",
        "N", 
        "WSW", 
        "ESE", 
        "E", 
        "NW", 
        "WNW", 
        "NNE"
    ),
    "WindSpeed9am":(0.0,60),
    "WindSpeed3pm":(0.0,60),
    "Humidity9am":(0.0,100.0),
    "Humidity3pm":(0.0,100.0),
    "Pressure9am":(990,1041.0),
    "Pressure3pm":(990,1039.6),
    "Cloud9am":(0.0,9.0),
    "Cloud3pm":(0.0,9.0),
    "Temp9am":(-7.2,40.2),
    "Temp3pm":(-5.4,46.7),
    "RainToday":("Yes","No")
}

for _ in range(100):
    # data = {
    #     "Date": random_date,  
    #     "Location": random.choice(locations),  
    #     "Rainfall":random.uniform(*ranges["Rainfall"]),
    #     "Evaporation":random.uniform(*ranges["Evaporation"]),
    #     "Sunshine":random.uniform(*ranges["Sunshine"]),
    #     "WindGustDir":random.choice(wind_directions),
    #     "WindGustSpeed":random.uniform(*ranges["WindGustSpeed"]),
    #     "WindDir9am":random.choice(wind_directions),
    #     "WindDir3pm":random.choice(wind_directions),
    #     "WindSpeed9am":random.uniform(*ranges["WindSpeed9am"]),
    #     "WindSpeed3pm":random.uniform(*ranges["WindSpeed3pm"]),
    #     "Humidity9am":random.uniform(*ranges["Humidity9am"]),
    #     "Humidity3pm":random.uniform(*ranges["Humidity3pm"]),
    #     "Pressure9am":random.uniform(*ranges["Pressure9am"]),
    #     "Pressure3pm":random.uniform(*ranges["Pressure3pm"]),
    #     "Cloud9am":random.uniform(*ranges["Cloud9am"]),
    #     "Cloud3pm":random.uniform(*ranges["Cloud3pm"]),
    #     "Temp9am":random.uniform(*ranges["Temp9am"]),
    #     "Temp3pm":random.uniform(*ranges["Temp3pm"]),
    #     "RainToday":random.choice(raintoday),
    #     "MinTemp": random.uniform(*ranges["MinTemp"]),
    #     "MaxTemp": random.uniform(*ranges["MaxTemp"]),
    #     # Add all your variables here
    # }
    random_date = (start_date + (end_date - start_date) * random.random()).isoformat()
    data = {
        "Date": random_date,  
        "Location": random.choice(locations),  
        "Rainfall":random.uniform(*ranges["Rainfall"]),
        "Evaporation":random.uniform(*ranges["Evaporation"]),
        "Sunshine":random.uniform(*ranges["Sunshine"]),
        "WindGustDir":random.choice(ranges["WindGustDir"]),
        "WindGustSpeed":random.uniform(*ranges["WindGustSpeed"]),
        "WindDir9am":random.choice(ranges["WindDir9am"]),
        "WindDir3pm":random.choice(ranges["WindDir3pm"]),
        "WindSpeed9am":random.uniform(*ranges["WindSpeed9am"]),
        "WindSpeed3pm":random.uniform(*ranges["WindSpeed3pm"]),
        "Humidity9am":random.uniform(*ranges["Humidity9am"]),
        "Humidity3pm":random.uniform(*ranges["Humidity3pm"]),
        "Pressure9am":random.uniform(*ranges["Pressure9am"]),
        "Pressure3pm":random.uniform(*ranges["Pressure3pm"]),
        "Cloud9am":random.uniform(*ranges["Cloud9am"]),
        "Cloud3pm":random.uniform(*ranges["Cloud3pm"]),
        "Temp9am":random.uniform(*ranges["Temp9am"]),
        "Temp3pm":random.uniform(*ranges["Temp3pm"]),
        "RainToday":random.choice(ranges["RainToday"]),
        "MinTemp": random.uniform(*ranges["MinTemp"]),
        "MaxTemp": random.uniform(*ranges["MaxTemp"]),
    }
    response = requests.post(url, data=json.dumps(data))
    # print(data)
    # print(response.status_code)
    # print(response.text)
    print(response.json())
