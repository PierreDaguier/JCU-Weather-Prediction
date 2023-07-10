import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.impute import KNNImputer
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
import joblib
from google.colab import drive

drive.mount('/content/drive', force_remount=True)

# Load data
df = pd.read_csv('/content/drive/My Drive/weatherAUS.csv', na_values='NA')

# Convert dates to ordinal (numeric) form
df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())

# Impute missing data
imputer = KNNImputer(n_neighbors=5)
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
df[num_cols] = imputer.fit_transform(df[num_cols])

# Standardize the features
scaler = StandardScaler()
df[num_cols] = scaler.fit_transform(df[num_cols])

# Encode categorical data
df = pd.get_dummies(df)

X = df.drop('RainTomorrow_Yes', axis=1)
y = df['RainTomorrow_Yes']

# Split data with stratification
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Apply SMOTE to oversample the minority class
sm = SMOTE(random_state=42)
X_train, y_train = sm.fit_resample(X_train, y_train)

column_names = X_train.columns
joblib.dump(column_names, '/content/drive/My Drive/columns_logistic.joblib')

print('Training data:', X_train.shape, y_train.shape)
print('Test data:', X_test.shape, y_test.shape)

model = LogisticRegression(max_iter=1000)

# Model parameter tuning
param_grid = {
    'C': [0.1, 1, 10, 100],
    'solver': ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga'],
}

CV_lr = GridSearchCV(estimator=model, param_grid=param_grid, cv= 5, scoring='f1')
CV_lr.fit(X_train, y_train)
print('Best parameters:', CV_lr.best_params_)

# Use the best model from grid search for further steps
best_model = CV_lr.best_estimator_

# Cross Validation
scores = cross_val_score(best_model, X_test, y_test, cv=5, scoring='f1')
print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))

# Model evaluation
accuracy = best_model.score(X_test, y_test)
with open('/content/drive/My Drive/accuracy_logistic.txt', 'w') as f:
    f.write('Précision du modèle: ' + str(accuracy))

joblib.dump(best_model, '/content/drive/My Drive/modelv4.joblib')
joblib.dump(imputer, '/content/drive/My Drive/imputerv4.joblib')
joblib.dump(scaler, '/content/drive/My Drive/scalerv4.joblib')
print('Model saved as model_logistic.joblib')
