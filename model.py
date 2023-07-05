import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import KNNImputer
from imblearn.over_sampling import SMOTE
import joblib
#from google.colab import drive
from joblib import Memory
cachedir = '.'
memory = Memory(cachedir, verbose=0)


#drive.mount('/content/drive',force_remount=True)


imputer = KNNImputer(n_neighbors=5)

@memory.cache
def impute_data(df):
    num_cols = df.select_dtypes(include=['int64', 'float64']).columns
    df[num_cols] = imputer.fit_transform(df[num_cols])
    return df

@memory.cache
def encode_data(df):
    return pd.get_dummies(df)

# 1. Read Dataset
#df = pd.read_csv('/content/drive/My Drive/weatherAUS.csv', na_values='NA')
df = pd.read_csv('data/weatherAUS.csv', na_values='NA')

# Appliquer l'imputation et l'encodage avec le cache
df = impute_data(df)
df = encode_data(df)

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
# sm = SMOTE(random_state=42)


# Split the balanced data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save column names after get_dummies
column_names = X_train.columns
#drive.mount('/content/drive',force_remount=True)
joblib.dump(column_names, './columns.joblib')

print('Training data:', X_train.shape, y_train.shape)
print('Test data:', X_test.shape, y_test.shape)

# 4. Model creation
model = RandomForestClassifier()

# 5. Model training
model.fit(X_train, y_train)

# # Model parameter tuning
param_grid = {
    'n_estimators': [100, 200, 300, 400, 500],
    'max_depth' : [4,6,8,10]
}

CV_rfc = GridSearchCV(estimator=model, param_grid=param_grid, cv= 5)
CV_rfc.fit(X, y)
print('Best parameters:', CV_rfc.best_params_)

# 6. Model evaluation
accuracy = model.score(X_test, y_test)
with open('./accuracy.txt', 'w') as f:
    f.write('Précision du modèle: ' + str(accuracy))

# Cross Validation
# scores = cross_val_score(model, X_res, y_res, cv=5)
# print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))

# 7. Model saving
drive.mount('/content/drive',force_remount=True)
joblib.dump(model, './model.joblib')
print('Model saved as model.joblib')
