from joblib import load
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_curve, roc_auc_score
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from google.colab import drive
import pandas as pd
from imblearn.over_sampling import SMOTE

drive.mount('/content/drive')

# Charger le modèle, l'imputer et le scaler
model = load('/content/drive/My Drive/modelv4.joblib')
column_names = load('/content/drive/My Drive/columns_logistic.joblib')
imputer = load('/content/drive/My Drive/imputerv4.joblib')
scaler = load('/content/drive/My Drive/scalerv4.joblib')
drive.mount('/content/drive', force_remount=True)

# Charger les données
df = pd.read_csv('/content/drive/My Drive/weatherAUS.csv', na_values='NA')

# Convert dates to ordinal (numeric) form
df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())

# Impute missing data
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
df[num_cols] = imputer.transform(df[num_cols])  # Utiliser 'transform' et non 'fit_transform'

# Scale the features
df[num_cols] = scaler.transform(df[num_cols])  # Utiliser 'transform' et non 'fit_transform'

df = pd.get_dummies(df)

# Assurez-vous que toutes les colonnes existent
for col in column_names:
    if col not in df.columns:
        df[col] = 0

# Définir les features et les labels
X = df.drop('RainTomorrow_Yes', axis=1)
y = df['RainTomorrow_Yes']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Appliquer SMOTE pour suréchantillonner la classe minoritaire
sm = SMOTE(random_state=42)
X_train, y_train = sm.fit_resample(X_train, y_train)

# Prédictions
y_pred = model.predict(X_test)

# Matrice de confusion
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Précision, Rappel et Score F1
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
print(f"Precision: {precision}, Recall: {recall}, F1-Score: {f1}")

y_prob = model.predict_proba(X_test)[:,1] # Probabilité d'appartenir à la classe positive
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
auc = roc_auc_score(y_test, y_prob)

# Enregistrement de l'image de la courbe ROC
plt.figure()
plt.plot(fpr, tpr, label='ROC curve (area = %0.2f)' % auc)
plt.plot([0, 1], [0, 1], 'k--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc="lower right")
drive.mount('/content/drive', force_remount=True)
plt.savefig('/content/drive/My Drive/roc_curve_logistic.png') # Sauvegarder l'image

print('Matrice de confusion: ' + str(cm) + '\n' +
            'Precision: ' + str(precision) + '\n' +
            'Recall: '+ str(recall) + '\n' +
            'F1Score: ' + str(f1) + '\n' +
            'AUC: ' + str(auc))

# Enregistrement des résultats dans un fichier texte
with open('/content/drive/My Drive/modelanalysis_logistic.txt', 'w') as f:
    f.write('Matrice de confusion: ' + str(cm) + '\n' +
            'Precision: ' + str(precision) + '\n' +
            'Recall: '+ str(recall) + '\n' +
            'F1Score: ' + str(f1) + '\n' +
            'AUC: ' + str(auc))
