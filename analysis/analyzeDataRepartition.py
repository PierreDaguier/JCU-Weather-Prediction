import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import pandas as pd
import logging

df = pd.read_csv('../data/weatherAUS.csv')
# Configuration du logging
logging.basicConfig(filename='output.txt', level=logging.INFO)

# Liste des variables continues
continuous_vars = ["MinTemp", "MaxTemp", "Evaporation", "Rainfall", "Sunshine", "WindGustSpeed", 
                   "WindSpeed9am", "WindSpeed3pm", "Humidity9am", "Humidity3pm", "Pressure9am", 
                   "Pressure3pm", "Cloud9am", "Cloud3pm", "Temp9am", "Temp3pm"]

# Liste des variables catégorielles
categorical_vars = ["WindGustDir", "WindDir9am", "WindDir3pm", "Location"]

# Séparation du dataframe en fonction de 'RainTomorrow'
rain = df[df['RainTomorrow'] == 'Yes']
no_rain = df[df['RainTomorrow'] == 'No']

with PdfPages('output.pdf') as pdf:
    for var in continuous_vars:
        plt.figure()
        plt.hist([rain[var], no_rain[var]], bins=30, alpha=0.5, label=['Rain', 'No rain'], color=['b', 'r'])
        plt.title(f'Distribution of {var} when it rains vs when it does not')
        plt.xlabel(var)
        plt.ylabel('Frequency')
        plt.legend(loc='upper right')
        pdf.savefig()  # saves the current figure into a pdf page
        plt.close()

        # Logging the output
        logging.info(f'Generated histogram for {var}')
        logging.info(f'Statistics for {var}:\n')
        logging.info('Rain')
        logging.info(rain[var].describe())
        logging.info('No Rain')
        logging.info(no_rain[var].describe())

    for var in categorical_vars:
        plt.figure()
        rain[var].value_counts(normalize=True).plot(kind='bar', color='b', alpha=0.5, label='Rain')
        no_rain[var].value_counts(normalize=True).plot(kind='bar', color='r', alpha=0.5, label='No rain', width=0.5)
        plt.title(f'Distribution of {var} when it rains vs when it does not')
        plt.xlabel(var)
        plt.ylabel('Frequency')
        plt.legend(loc='upper right')
        pdf.savefig()  # saves the current figure into a pdf page
        plt.close()

        # Logging the output
        logging.info(f'Generated bar chart for {var}')
        logging.info(f'Frequencies for {var}:\n')
        logging.info('Rain')
        logging.info(rain[var].value_counts(normalize=True))
        logging.info('No Rain')
        logging.info(no_rain[var].value_counts(normalize=True))
