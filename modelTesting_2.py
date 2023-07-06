import requests
import json
import pandas as pd

df = pd.read_csv('data/weatherAUS.csv',na_values='NA')

# Drop rows with missing values
df = df.dropna()

# Select 10 rows where it will rain tomorrow
rain_tomorrow = df[df['RainTomorrow'] == 'Yes'].sample(10)

# Select 10 rows where it will not rain tomorrow
no_rain_tomorrow = df[df['RainTomorrow'] == 'No'].sample(10)

# Combine the two dataframes
test_data = pd.concat([rain_tomorrow, no_rain_tomorrow])

url = "http://localhost:8080/predict"

print('Rain tomorrow')
for _, row in rain_tomorrow.iterrows():
    data = row.to_dict()
    # We don't need the RainTomorrow value in the data we send to the model
    data.pop('RainTomorrow', None)
    print(data)
    response = requests.post(url, data=json.dumps(data))
    print(response.json())

print('Not Raining Tomorrow')
for _, row in no_rain_tomorrow.iterrows():
    data = row.to_dict()
    # We don't need the RainTomorrow value in the data we send to the model
    data.pop('RainTomorrow', None)
    print(data)
    response = requests.post(url, data=json.dumps(data))
    print(response.json())
