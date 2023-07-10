import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.impute import KNNImputer
import joblib
import logging
pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)

logger = logging.getLogger(__name__)
c_handler = logging.StreamHandler()
f_handler = logging.FileHandler('data2.log')
c_handler.setLevel(logging.WARNING)
f_handler.setLevel(logging.WARNING)

c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c_handler.setFormatter(c_format)
f_handler.setFormatter(f_format)

logger.addHandler(c_handler)
logger.addHandler(f_handler)
# Load model, column names, imputer and scaler
model = joblib.load('modelv4.joblib')
columns = joblib.load('columnsv4.joblib')
imputer = joblib.load('imputerv4.joblib')
scaler = joblib.load('scalerv4.joblib')

# Load data
df = pd.read_csv('data/weatherAUS.csv', na_values='NA')
df = df.dropna()
# Convert dates to ordinal (numeric) form
df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())

# Select 10 rows where it will rain tomorrow
rain_tomorrow = df[df['RainTomorrow'] == 'Yes'].sample(1)
# Select 10 rows where it will not rain tomorrow
no_rain_tomorrow = df[df['RainTomorrow'] == 'No'].sample(1)

# Combine the two dataframes
test_data = pd.concat([rain_tomorrow, no_rain_tomorrow])

# Select numeric columns
num_cols = test_data.select_dtypes(include=['int64', 'float64']).columns

# Apply imputer and scaler
test_data[num_cols] = imputer.transform(test_data[num_cols])
test_data[num_cols] = scaler.transform(test_data[num_cols])

# Encode categorical data
test_data = pd.get_dummies(test_data)

# Ensure the order of column after get_dummies function
test_data = test_data.reindex(columns=columns, fill_value=0)

# Now we add our target columns
test_data['RainTomorrow_Yes'] = df['RainTomorrow'].map({'Yes': 1, 'No': 0})

# Separate input and expected output
X = test_data.drop('RainTomorrow_Yes', axis=1)
y = test_data['RainTomorrow_Yes']

logger.warning(f'Preprocessed data: \n {df.head()} \n')
logger.warning(f'model predict: \n {X} \n')

# Make predictions
predictions = model.predict(X)

# Print results
for i in range(len(y)):
    print(f"Expected: {y.iloc[i]}, Predicted: {predictions[i]}")
