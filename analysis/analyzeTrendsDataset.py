import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Lire le fichier CSV
df = pd.read_csv('../data/weatherAUS.csv')

# Analyse descriptive des données
print(df.describe())

# Pour chaque colonne, afficher le nombre de valeurs uniques et leurs comptes
for col in df.columns:
    print(df[col].value_counts())
    print("\n")

numeric_cols = df.select_dtypes(include=['int64', 'float64'])
corr = numeric_cols.corr()
sns.heatmap(corr)
plt.show()

# Histogrammes pour chaque variable numérique
df.hist(bins=50, figsize=(20,15))
plt.show()

# Diagramme en boîte (Box plot) pour visualiser les quartiles et détecter les valeurs aberrantes
df.boxplot(figsize=(20,15))
plt.show()

# Analyser la relation entre 'RainTomorrow' et d'autres variables
# Assurez-vous que 'RainTomorrow' est de type 'object'
df['RainTomorrow'] = df['RainTomorrow'].astype('object')
for col in df.columns:
    if df[col].dtype == 'object':
        pd.crosstab(df[col], df['RainTomorrow']).plot(kind='bar')
    else:
        df[[col, 'RainTomorrow']].groupby('RainTomorrow').mean().plot.bar()

plt.show()
