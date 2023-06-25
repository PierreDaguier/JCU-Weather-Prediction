import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib


# 1. Read Dataset
df = pd.read_csv('data/weatherAUS.csv')


# 2. Pre treatment of data
df = df.dropna()  # Delete all the lines with empty data

# Encode the variables by category
df = pd.get_dummies(df)

# 3. Split the data into test data and training data
X = df.drop('RainTomorrow_Yes', axis=1)  
y = df['RainTomorrow_Yes']  

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save column names after get_dummies
column_names = X_train.columns
joblib.dump(column_names, 'columns.joblib')

print('Training data:', X_train.shape, y_train.shape)
print('Test data:', X_test.shape, y_test.shape)

# 4. Model creation
model = RandomForestClassifier()

# 5. Model training 
model.fit(X_train, y_train)

# 6. Model evaluation
accuracy = model.score(X_test, y_test)
print('Précision du modèle:', accuracy)

# 7. Model saving
joblib.dump(model, 'model.joblib')
print('Model saved as model.joblib')
