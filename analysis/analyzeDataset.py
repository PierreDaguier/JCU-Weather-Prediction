import pandas as pd

# Charger le dataset
df = pd.read_csv('../data/weatherAUS.csv')

# Liste des colonnes numériques et catégoriques
numerical_columns = ['MinTemp','MaxTemp','Evaporation', 'Sunshine', 'WindGustSpeed', 'WindSpeed9am', 'WindSpeed3pm',
                     'Humidity9am', 'Humidity3pm', 'Pressure9am', 'Pressure3pm', 'Cloud9am',
                     'Cloud3pm', 'Temp9am', 'Temp3pm', 'Rainfall']
categorical_columns = ['WindGustDir', 'WindDir9am', 'WindDir3pm', 'Location']

# Créer un dictionnaire pour stocker les ranges de valeurs
ranges = {}

# Pour les colonnes numériques, trouver le minimum et le maximum
for column in numerical_columns:
    ranges[column] = {'min': df[column].min(), 'max': df[column].max()}

# Pour les colonnes catégoriques, trouver les valeurs uniques
for column in categorical_columns:
    ranges[column] = df[column].unique().tolist()

print(ranges)
