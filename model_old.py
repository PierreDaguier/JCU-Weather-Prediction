# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# import joblib
# from sklearn.impute import KNNImputer

# imputer = KNNImputer(n_neighbors=5)


# # 1. Read Dataset
# df = pd.read_csv('data/weatherAUS.csv', na_values='NA')


# # 2. Pre treatment of data
# # Appliquer l'imputation seulement sur les colonnes numériques
# try:
#     num_cols = df.select_dtypes(include=['int64', 'float64']).columns
#     df[num_cols] = imputer.fit_transform(df[num_cols])
# except Exception as e:
#     print("Erreur pendant l'imputation :", e)


# # Encode the variables by category
# df = pd.get_dummies(df)

# # 3. Split the data into test data and training data
# X = df.drop('RainTomorrow_Yes', axis=1)  
# y = df['RainTomorrow_Yes']  
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# # Save column names after get_dummies
# column_names = X_train.columns
# joblib.dump(column_names, 'columns.joblib')

# print('Training data:', X_train.shape, y_train.shape)
# print('Test data:', X_test.shape, y_test.shape)

# # 4. Model creation
# model = RandomForestClassifier()

# # 5. Model training 
# model.fit(X_train, y_train)

# # 6. Model evaluation
# accuracy = model.score(X_test, y_test)
# print('Précision du modèle:', accuracy)

# # 7. Model saving
# joblib.dump(model, 'model.joblib')
# print('Model saved as model.joblib')


import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import KNNImputer
from imblearn.over_sampling import SMOTE
import joblib

imputer = KNNImputer(n_neighbors=5)

# 1. Read Dataset
df = pd.read_csv('data/weatherAUS.csv', na_values='NA')

# 2. Pre treatment of data
# Appliquer l'imputation seulement sur les colonnes numériques
try:
    num_cols = df.select_dtypes(include=['int64', 'float64']).columns
    df[num_cols] = imputer.fit_transform(df[num_cols])
except Exception as e:
    print("Erreur pendant l'imputation :", e)

# Encode the variables by category
df = pd.get_dummies(df)

# 3. Split the data into test data and training data
X = df.drop('RainTomorrow_Yes', axis=1)  
y = df['RainTomorrow_Yes']

# Balancing the dataset
sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X, y)

# Split the balanced data
X_train, X_test, y_train, y_test = train_test_split(X_res, y_res, test_size=0.2, random_state=42)

# Save column names after get_dummies
column_names = X_train.columns
joblib.dump(column_names, 'columns.joblib')

print('Training data:', X_train.shape, y_train.shape)
print('Test data:', X_test.shape, y_test.shape)

# 4. Model creation
model = RandomForestClassifier()

# 5. Model training 
model.fit(X_train, y_train)

# Model parameter tuning
param_grid = {
    'n_estimators': [100, 200, 300, 400, 500],
    'max_depth' : [4,6,8,10]
}

CV_rfc = GridSearchCV(estimator=model, param_grid=param_grid, cv= 5)
CV_rfc.fit(X_res, y_res)
print('Best parameters:', CV_rfc.best_params_)

# 6. Model evaluation
accuracy = model.score(X_test, y_test)
print('Précision du modèle:', accuracy)

# Cross Validation
# scores = cross_val_score(model, X_res, y_res, cv=5)
# print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))

# 7. Model saving
joblib.dump(model, 'model.joblib')
print('Model saved as model.joblib')
