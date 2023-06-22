import pandas as pd
import joblib
df = pd.read_csv('data/weatherAUS.csv')

# Load model
model = joblib.load('model.joblib')


df = df.dropna()  # Delete lines with missing data

# Encode variables
df = pd.get_dummies(df)

X = df.drop('RainTomorrow_Yes', axis=1)  # Focus on RainTomorrow_Yes


# Predictions
predictions = model.predict(X)

# Print them 
for prediction in predictions:
    print(prediction)
