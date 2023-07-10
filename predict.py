# import sys
# import numpy as np
# import pandas as pd
# import joblib

# # Load model and column names
# model = joblib.load('modelv3.joblib')
# columns = joblib.load('columnsv3.joblib')

# # Use command line arguments for input values
# data = {
#     'Date'          :[sys.argv[1]],
#     'Location'      :[sys.argv[2]],
#     'MinTemp'       :[float(sys.argv[3])],
#     'MaxTemp'       :[float(sys.argv[4])],
#     'Rainfall'      :[float(sys.argv[5])],
#     'Evaporation'   :[float(sys.argv[6])],
#     'Sunshine'      :[float(sys.argv[7])],
#     'WindGustDir'   :[str(sys.argv[8])],
#     'WindGustSpeed' :[float(sys.argv[9])],
#     'WindDir9am'    :[str(sys.argv[10])], 
#     'WindDir3pm'    :[str(sys.argv[11])], 
#     'WindSpeed9am'  :[float(sys.argv[12])],
#     'WindSpeed3pm'  :[float(sys.argv[13])],
#     'Humidity9am'   :[float(sys.argv[14])],
#     'Humidity3pm'   :[float(sys.argv[15])],
#     'Pressure9am'   :[float(sys.argv[16])],
#     'Pressure3pm'   :[float(sys.argv[17])], 
#     'Cloud9am'      :[float(sys.argv[18])], 
#     'Cloud3pm'      :[float(sys.argv[19])],
#     'Temp9am'       :[float(sys.argv[20])], 
#     'Temp3pm'       :[float(sys.argv[21])], 
#     'RainToday'     :[str(sys.argv[22])], 

# }

# # Transform the input to dataframe
# df = pd.DataFrame(data)

# # Use pd.get_dummies to encode the input
# df = pd.get_dummies(df)

# # Ensure the order of column after get_dummies function
# df = df.reindex(columns=columns, fill_value=0)

# # Predict the class
# prediction = model.predict(df)
# prediction_bool = bool(prediction[0])
# print(prediction_bool)

# import sys
# import numpy as np
# import pandas as pd
# import joblib

# # Load model, column names, imputer and scaler
# model = joblib.load('./modelv3.joblib')
# columns = joblib.load('./columnsv3.joblib')
# imputer = joblib.load('./imputerv3.joblib')
# scaler = joblib.load('./scalerv3.joblib')

# # Use command line arguments for input values
# data = {
#     'Date'          :[sys.argv[1]],
#     'Location'      :[sys.argv[2]],
#     'MinTemp'       :[float(sys.argv[3])],
#     'MaxTemp'       :[float(sys.argv[4])],
#     'Rainfall'      :[float(sys.argv[5])],
#     'Evaporation'   :[float(sys.argv[6])],
#     'Sunshine'      :[float(sys.argv[7])],
#     'WindGustDir'   :[str(sys.argv[8])],
#     'WindGustSpeed' :[float(sys.argv[9])],
#     'WindDir9am'    :[str(sys.argv[10])], 
#     'WindDir3pm'    :[str(sys.argv[11])], 
#     'WindSpeed9am'  :[float(sys.argv[12])],
#     'WindSpeed3pm'  :[float(sys.argv[13])],
#     'Humidity9am'   :[float(sys.argv[14])],
#     'Humidity3pm'   :[float(sys.argv[15])],
#     'Pressure9am'   :[float(sys.argv[16])],
#     'Pressure3pm'   :[float(sys.argv[17])], 
#     'Cloud9am'      :[float(sys.argv[18])], 
#     'Cloud3pm'      :[float(sys.argv[19])],
#     'Temp9am'       :[float(sys.argv[20])], 
#     'Temp3pm'       :[float(sys.argv[21])], 
#     'RainToday'     :[str(sys.argv[22])], 
# }

# # Transform the input to dataframe
# df = pd.DataFrame(data)

# # Select numeric columns
# num_cols = df.select_dtypes(include=['int64', 'float64']).columns

# # Apply imputer and scaler
# df[num_cols] = imputer.transform(df[num_cols])
# df[num_cols] = scaler.transform(df[num_cols])

# # Use pd.get_dummies to encode the input
# df = pd.get_dummies(df)

# # Ensure the order of column after get_dummies function
# df = df.reindex(columns=columns, fill_value=0)


# probabilities = model.predict_proba(df)

# # Choose a threshold
# threshold = 0.98515  # or any other value

# # Classify the predictions
# predictions = (probabilities[:, 1] >= threshold).astype('int')  # Class 1 if probability >= threshold, else class 0

# prediction_bool = bool(predictions[0])
# print(prediction_bool)

# import sys
# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
# from imblearn.over_sampling import SMOTE

# # Load model, column names, imputer and scaler
# model = joblib.load('modelv4.joblib')
# columns = joblib.load('columnsv4.joblib')
# imputer = joblib.load('imputerv4.joblib')
# scaler = joblib.load('scalerv4.joblib')

# # Use command line arguments for input values
# data = {
#     'Date'          :[sys.argv[1]],
#     'Location'      :[sys.argv[2]],
#     'MinTemp'       :[float(sys.argv[3])],
#     'MaxTemp'       :[float(sys.argv[4])],
#     'Rainfall'      :[float(sys.argv[5])],
#     'Evaporation'   :[float(sys.argv[6])],
#     'Sunshine'      :[float(sys.argv[7])],
#     'WindGustDir'   :[str(sys.argv[8])],
#     'WindGustSpeed' :[float(sys.argv[9])],
#     'WindDir9am'    :[str(sys.argv[10])], 
#     'WindDir3pm'    :[str(sys.argv[11])], 
#     'WindSpeed9am'  :[float(sys.argv[12])],
#     'WindSpeed3pm'  :[float(sys.argv[13])],
#     'Humidity9am'   :[float(sys.argv[14])],
#     'Humidity3pm'   :[float(sys.argv[15])],
#     'Pressure9am'   :[float(sys.argv[16])],
#     'Pressure3pm'   :[float(sys.argv[17])], 
#     'Cloud9am'      :[float(sys.argv[18])], 
#     'Cloud3pm'      :[float(sys.argv[19])],
#     'Temp9am'       :[float(sys.argv[20])], 
#     'Temp3pm'       :[float(sys.argv[21])], 
#     'RainToday'     :[str(sys.argv[22])], 
# }


# # Transform the input to dataframe
# df = pd.DataFrame(data)

# df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())


# # Select numeric columns
# num_cols = df.select_dtypes(include=['int64', 'float64']).columns

# # Convert 'Date' to ordinal form before KNN imputation


# # Apply imputer and scaler
# df[num_cols] = imputer.transform(df[num_cols])
# df[num_cols] = scaler.transform(df[num_cols])

# # Use pd.get_dummies to encode the input
# df = pd.get_dummies(df)

# # Ensure the order of column after get_dummies function
# df = df.reindex(columns=columns, fill_value=0)
# # X = df.drop('RainTomorrow_Yes', axis=1)
# # y = df['RainTomorrow_Yes']
# # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
# # sm = SMOTE(random_state=42)
# # X_train, y_train = sm.fit_resample(X_train, y_train)


# probabilities = model.predict_proba(df)

# # Choose a threshold
# threshold = 0.5  # or any other value

# # Classify the predictions
# predictions = (probabilities[:, 1] >= threshold).astype('int')  # Class 1 if probability >= threshold, else class 0

# prediction_bool = bool(predictions[0])

# print(prediction_bool)

# import sys
# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
# from imblearn.over_sampling import SMOTE
# from sklearn.preprocessing import LabelEncoder
# import logging

# logger = logging.getLogger(__name__)
# c_handler = logging.StreamHandler()
# f_handler = logging.FileHandler('data.log')
# c_handler.setLevel(logging.WARNING)
# f_handler.setLevel(logging.WARNING)

# c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
# f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# c_handler.setFormatter(c_format)
# f_handler.setFormatter(f_format)

# logger.addHandler(c_handler)
# logger.addHandler(f_handler)


# # Load model, column names, imputer and scaler
# model = joblib.load('modelv4.joblib')
# columns = joblib.load('columnsv4.joblib')
# imputer = joblib.load('imputerv4.joblib')
# scaler = joblib.load('scalerv4.joblib')

# # Use command line arguments for input values
# # data = {
# #     'Date'          :[sys.argv[1]],
# #     'Location'      :[sys.argv[2]],
# #     'MinTemp'       :[float(sys.argv[3])],
# #     'MaxTemp'       :[float(sys.argv[4])],
# #     'Rainfall'      :[float(sys.argv[5])],
# #     'Evaporation'   :[float(sys.argv[6])],
# #     'Sunshine'      :[float(sys.argv[7])],
# #     'WindGustDir'   :[str(sys.argv[8])],
# #     'WindGustSpeed' :[float(sys.argv[9])],
# #     'WindDir9am'    :[str(sys.argv[10])], 
# #     'WindDir3pm'    :[str(sys.argv[11])], 
# #     'WindSpeed9am'  :[float(sys.argv[12])],
# #     'WindSpeed3pm'  :[float(sys.argv[13])],
# #     'Humidity9am'   :[float(sys.argv[14])],
# #     'Humidity3pm'   :[float(sys.argv[15])],
# #     'Pressure9am'   :[float(sys.argv[16])],
# #     'Pressure3pm'   :[float(sys.argv[17])], 
# #     'Cloud9am'      :[float(sys.argv[18])], 
# #     'Cloud3pm'      :[float(sys.argv[19])],
# #     'Temp9am'       :[float(sys.argv[20])], 
# #     'Temp3pm'       :[float(sys.argv[21])], 
# #     'RainToday'     :[str(sys.argv[22])], 
# # }

# data = {
#     'Date'          :['2023-07-07'],
#     'Location'      :['Sydney'],
#     'MinTemp'       :[15.5],
#     'MaxTemp'       :[25.0],
#     'Rainfall'      :[0.0],
#     'Evaporation'   :[5.0],
#     'Sunshine'      :[8.0],
#     'WindGustDir'   :['ENE'],
#     'WindGustSpeed' :[30.0],
#     'WindDir9am'    :['ENE'], 
#     'WindDir3pm'    :['ESE'], 
#     'WindSpeed9am'  :[15.0],
#     'WindSpeed3pm'  :[20.0],
#     'Humidity9am'   :[60.0],
#     'Humidity3pm'   :[55.0],
#     'Pressure9am'   :[1012.5],
#     'Pressure3pm'   :[1010.5], 
#     'Cloud9am'      :[5.0], 
#     'Cloud3pm'      :[4.0],
#     'Temp9am'       :[18.5], 
#     'Temp3pm'       :[23.5], 
#     'RainToday'     :['No'], 
# }
# # Transform the input to dataframe
# df = pd.DataFrame(data)
# print(df)
# df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d').apply(lambda date: date.toordinal())
# print(df['Date'])
# num_cols = [col for col in df.select_dtypes(include=['int64', 'float64']).columns if col not in ['Date']]
# num_cols = num_cols.drop('Date')  # Exclude 'Date' column

# # Apply imputer and scaler

# # num_cols = df.select_dtypes(include=['int64', 'float64']).columns

# df[num_cols] = imputer.transform(df[num_cols])
# df[num_cols] = scaler.transform(df[num_cols])

# # Apply one-hot encoding to the categorical columns
# df = pd.get_dummies(df)


# # Ensure the order of column after get_dummies function
# missing_cols = set(columns) - set(df.columns)
# for c in missing_cols:
#     df[c] = 0
# df = df[columns]

# logger.warning(f'Preprocessed data: \n {df.head()} \n')
# probabilities = model.predict_proba(df)

# # Choose a threshold
# threshold = 0.5  # or any other value

# # Classify the predictions
# predictions = (probabilities[:, 1] >= threshold).astype('int')  # Class 1 if probability >= threshold, else class 0

# prediction_bool = bool(predictions[0])

# print(prediction_bool)

# import sys
# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
# from imblearn.over_sampling import SMOTE
# from sklearn.preprocessing import LabelEncoder
# import logging

# logger = logging.getLogger(__name__)
# c_handler = logging.StreamHandler()
# f_handler = logging.FileHandler('data.log')
# c_handler.setLevel(logging.WARNING)
# f_handler.setLevel(logging.WARNING)

# c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
# f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# c_handler.setFormatter(c_format)
# f_handler.setFormatter(f_format)

# logger.addHandler(c_handler)
# logger.addHandler(f_handler)

# # Load model, column names, imputer and scaler
# model = joblib.load('modelv4.joblib')
# columns = joblib.load('columnsv4.joblib')
# imputer = joblib.load('imputerv4.joblib')
# scaler = joblib.load('scalerv4.joblib')

# # Example data for prediction
# data = {
#     'Date'          :['2023-07-07'],
#     'Location'      :['Sydney'],
#     'MinTemp'       :[15.5],
#     'MaxTemp'       :[25.0],
#     'Rainfall'      :[0.0],
#     'Evaporation'   :[5.0],
#     'Sunshine'      :[8.0],
#     'WindGustDir'   :['ENE'],
#     'WindGustSpeed' :[30.0],
#     'WindDir9am'    :['ENE'], 
#     'WindDir3pm'    :['ESE'], 
#     'WindSpeed9am'  :[15.0],
#     'WindSpeed3pm'  :[20.0],
#     'Humidity9am'   :[60.0],
#     'Humidity3pm'   :[55.0],
#     'Pressure9am'   :[1012.5],
#     'Pressure3pm'   :[1010.5], 
#     'Cloud9am'      :[5.0], 
#     'Cloud3pm'      :[4.0],
#     'Temp9am'       :[18.5], 
#     'Temp3pm'       :[23.5], 
#     'RainToday'     :['No'], 
# }

# # Transform the input to dataframe
# df = pd.DataFrame(data)

# # Convert 'Date' to ordinal
# df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d').apply(lambda date: date.toordinal())
# print("1")
# date_column = df['Date']
# print("2")
# df = df.drop(columns=['Date'])
# print("3")
# # Identify the numeric columns (excluding 'Date')
# num_cols = [col for col in df.columns if df[col].dtype in ['int64', 'float64'] ]
# print("4")
# print('num_cols',num_cols)

# # Apply imputer and scaler to the numeric columns (excluding 'Date')
# df[num_cols] = imputer.transform(df[num_cols])
# print("5")
# df[num_cols] = scaler.transform(df[num_cols])
# print("6")
# df['Date'] = date_column
# df = df.drop(columns=['Date'])

# # Apply one-hot encoding to the categorical columns
# df = pd.get_dummies(df)

# # Ensure the order of column after get_dummies function
# missing_cols = set(columns) - set(df.columns)
# for c in missing_cols:
#     df[c] = 0
# df = df[columns]

# logger.warning(f'Preprocessed data: \n {df.head()} \n')

# # Make predictions
# probabilities = model.predict_proba(df)

# # Choose a threshold
# threshold = 0.5  # or any other value

# # Classify the predictions
# predictions = (probabilities[:, 1] >= threshold).astype('int')  # Class 1 if probability >= threshold, else class 0

# prediction_bool = bool(predictions[0])

# print(prediction_bool)

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.impute import KNNImputer
import joblib
import logging
import sys
pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)

logger = logging.getLogger(__name__)
c_handler = logging.StreamHandler()
f_handler = logging.FileHandler('data3.log')
c_handler.setLevel(logging.WARNING)
f_handler.setLevel(logging.WARNING)

c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
c_handler.setFormatter(c_format)
f_handler.setFormatter(f_format)

logger.addHandler(c_handler)
logger.addHandler(f_handler)
logger.warning(f'Script starting \n')
# Load model, column names, imputer and scaler
model = joblib.load('modelv4.joblib')
columns = joblib.load('columnsv4.joblib')
imputer = joblib.load('imputerv4.joblib')
scaler = joblib.load('scalerv4.joblib')

# data = {
#     'Date'          :['2023-07-07'],
#     'Location'      :['Sydney'],
#     'MinTemp'       :[15.5],
#     'MaxTemp'       :[25.0],
#     'Rainfall'      :[0.0],
#     'Evaporation'   :[5.0],
#     'Sunshine'      :[8.0],
#     'WindGustDir'   :['ENE'],
#     'WindGustSpeed' :[30],
#     'WindDir9am'    :['ENE'], 
#     'WindDir3pm'    :['ESE'], 
#     'WindSpeed9am'  :[15],
#     'WindSpeed3pm'  :[20],
#     'Humidity9am'   :[60],
#     'Humidity3pm'   :[55],
#     'Pressure9am'   :[1012.5],
#     'Pressure3pm'   :[1010.5], 
#     'Cloud9am'      :[5], 
#     'Cloud3pm'      :[4],
#     'Temp9am'       :[18.5], 
#     'Temp3pm'       :[23.5], 
#     'RainToday'     :['No'], 
# }

data = {
    'Date'          :[str(sys.argv[1])],
    'Location'      :[str(sys.argv[2])],
    'MinTemp'       :[float(sys.argv[3])],
    'MaxTemp'       :[float(sys.argv[4])],
    'Rainfall'      :[float(sys.argv[5])],
    'Evaporation'   :[float(sys.argv[6])],
    'Sunshine'      :[float(sys.argv[7])],
    'WindGustDir'   :[str(sys.argv[8])],
    'WindGustSpeed' :[float(sys.argv[9])],
    'WindDir9am'    :[str(sys.argv[10])], 
    'WindDir3pm'    :[str(sys.argv[11])], 
    'WindSpeed9am'  :[float(sys.argv[12])],
    'WindSpeed3pm'  :[float(sys.argv[13])],
    'Humidity9am'   :[float(sys.argv[14])],
    'Humidity3pm'   :[float(sys.argv[15])],
    'Pressure9am'   :[float(sys.argv[16])],
    'Pressure3pm'   :[float(sys.argv[17])], 
    'Cloud9am'      :[float(sys.argv[18])], 
    'Cloud3pm'      :[float(sys.argv[19])],
    'Temp9am'       :[float(sys.argv[20])], 
    'Temp3pm'       :[float(sys.argv[21])], 
    'RainToday'     :[str(sys.argv[22])], 
}

logger.warning(f'data : {data} \n')
# Convert data to DataFrame
df = pd.DataFrame(data)

# Convert dates to ordinal (numeric) form
df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())
logger.warning(f'After Date conversion: \n {df.head()} \n')

# Select numeric columns
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
logger.warning(f'Numeric columns: \n {num_cols} \n')

# Apply imputer and scaler
df[num_cols] = imputer.transform(df[num_cols])
logger.warning(f'After imputer: \n {df.head()} \n')

df[num_cols] = scaler.transform(df[num_cols])
logger.warning(f'After scaler: \n {df.head()} \n')

# Encode categorical data
df = pd.get_dummies(df)
logger.warning(f'After get_dummies: \n {df.head()} \n')

# Ensure the order of column after get_dummies function
df = df.reindex(columns=columns, fill_value=0)
logger.warning(f'After reindex: \n {df.head()} \n')

probabilities = model.predict_proba(df)
logger.warning(f'After probability: \n {probabilities} \n')
# Choose a threshold
# threshold = 0.9851  # or any other value
threshold = 0.5

# Classify the predictions
predictions = (probabilities[:, 1] >= threshold).astype('int')  # Class 1 if probability >= threshold, else class 0

prediction_bool = bool(predictions[0])
logger.warning(f'After prediction: \n {prediction_bool} \n')
print(prediction_bool)