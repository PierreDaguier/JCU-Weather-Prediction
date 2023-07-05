import sys
import numpy as np
import pandas as pd
import joblib

# Load model and column names
model = joblib.load('model_old.joblib')
columns = joblib.load('columns_old.joblib')

# Use command line arguments for input values
data = {
    'Date'          :[sys.argv[1]],
    'Location'      :[sys.argv[2]],
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
# data = {
#     'Date'          :['2023-05-06'],
#     'Location'      :['Sydney'],
#     'MinTemp'       :[20.0],
#     'MaxTemp'       :[30.0],
#     'Rainfall'      :[0.0],
#     'Evaporation'   :[5.0],
#     'Sunshine'      :[10.0],
#     'WindGustDir'   :['NE'],
#     'WindGustSpeed' :[30.0],
#     'WindDir9am'    :['NE'], 
#     'WindDir3pm'    :['NE'], 
#     'WindSpeed9am'  :[10.0],
#     'WindSpeed3pm'  :[15.0],
#     'Humidity9am'   :[60.0],
#     'Humidity3pm'   :[40.0],
#     'Pressure9am'   :[1000.0],
#     'Pressure3pm'   :[1000.0], 
#     'Cloud9am'      :[5.0], 
#     'Cloud3pm'      :[3.0],
#     'Temp9am'       :[22.0], 
#     'Temp3pm'       :[28.0], 
#     'RainToday'     :['No'], 
# }
# Transform the input to dataframe
df = pd.DataFrame(data)

# Use pd.get_dummies to encode the input
df = pd.get_dummies(df)

# Ensure the order of column after get_dummies function
df = df.reindex(columns=columns, fill_value=0)

# Predict the class
prediction = model.predict(df)
prediction_bool = bool(prediction[0])
# Print the prediction
# print(prediction[0])
print(prediction_bool)

