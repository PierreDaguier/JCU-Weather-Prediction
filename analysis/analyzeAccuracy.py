import pandas as pd
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.impute import KNNImputer
import joblib

print("Loading the imputer...")
imputer = joblib.load('../imputer.joblib')


print("Loading the model and column names...")
model = joblib.load('../model.joblib')
columns = joblib.load('../columns.joblib')

print("Reading the test data...")
df_test = pd.read_csv('../data/weatherAUS.csv', na_values='NA')

print("Preprocessing the test data...")
num_cols = df_test.select_dtypes(include=['int64', 'float64']).columns
df_test[num_cols] = imputer.transform(df_test[num_cols])

df_test = pd.get_dummies(df_test)
df_test = df_test.reindex(columns=columns, fill_value=0)

print("Separating the target variable and input variables...")
X_test = df_test.drop('RainTomorrow_Yes', axis=1)
y_test = df_test['RainTomorrow_Yes']

print("Predicting the target variable...")
y_pred = model.predict(X_test)

print("Model accuracy: ", accuracy_score(y_test, y_pred))

print("Confusion matrix: ")
print(confusion_matrix(y_test, y_pred))
