from joblib import load
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_curve, roc_auc_score
import matplotlib.pyplot as plt
import pandas as pd

# Charger le modèle
model = load('model(1).joblib')
column_names = load('columns(1).joblib')
imputer = load('imputer.joblib')

# Charger les données
df = pd.read_csv('data/weatherAUS.csv', na_values='NA')

# Prétraiter les données
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
df[num_cols] = imputer.transform(df[num_cols])
df = pd.get_dummies(df)

missing_cols = set(column_names) - set(df.columns)
for c in missing_cols:
    df[c] = 0
df = df[column_names]

# Définir les features et les labels
X = df.drop('RainTomorrow_Yes', axis=1) # Assurez-vous que 'RainTomorrow_Yes' est le bon nom de votre colonne cible
y = df['RainTomorrow_Yes']

# Prédictions
y_pred = model.predict(X)

# Matrice de confusion
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Précision, Rappel et Score F1
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
print(f"Precision: {precision}, Recall: {recall}, F1-Score: {f1}")

# Courbe ROC
y_prob = model.predict_proba(X_test)[:,1] # Probabilité d'appartenir à la classe positive
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
auc = roc_auc_score(y_test, y_prob)

plt.figure()
plt.plot(fpr, tpr, label='ROC curve (area = %0.2f)' % auc)
plt.plot([0, 1], [0, 1], 'k--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc="lower right")
plt.show()
