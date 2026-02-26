import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

function AboutPredictionModel() {
  return (
    <div className="doc-section">
      <Title>Prediction Model</Title>
      <Paragraph>
        The project uses a Logistic Regression classifier trained with a preprocessing
        pipeline in Python (Pandas, scikit-learn, imbalanced-learn).
      </Paragraph>

      <Title level={3}>1. Data Loading</Title>
      <pre>
        <code>{`# Load data
df = pd.read_csv('/content/drive/My Drive/weatherAUS.csv', na_values='NA')

# Convert dates to ordinal format
df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())`}</code>
      </pre>

      <Title level={3}>2. Missing Data Imputation</Title>
      <pre>
        <code>{`imputer = KNNImputer(n_neighbors=5)
num_cols = df.select_dtypes(include=['int64', 'float64']).columns
df[num_cols] = imputer.fit_transform(df[num_cols])`}</code>
      </pre>
      <Paragraph>
        KNN Imputation estimates missing values from nearby observations and generally
        preserves structure better than simple mean/median fills.
      </Paragraph>

      <Title level={3}>3. Feature Scaling</Title>
      <pre>
        <code>{`scaler = StandardScaler()
df[num_cols] = scaler.fit_transform(df[num_cols])`}</code>
      </pre>
      <Paragraph>
        Scaling keeps features comparable and avoids dominance from variables with larger ranges.
      </Paragraph>

      <Title level={3}>4. Categorical Encoding</Title>
      <pre>
        <code>{`df = pd.get_dummies(df)`}</code>
      </pre>

      <Title level={3}>5. Train/Test Split and Class Balancing</Title>
      <pre>
        <code>{`X_train, X_test, y_train, y_test = train_test_split(
  X,
  y,
  test_size=0.2,
  random_state=42,
  stratify=y
)

sm = SMOTE(random_state=42)
X_train, y_train = sm.fit_resample(X_train, y_train)`}</code>
      </pre>

      <Title level={3}>6. Model Training + Grid Search</Title>
      <pre>
        <code>{`model = LogisticRegression(max_iter=1000)

param_grid = {
  'C': [0.1, 1, 10, 100],
  'solver': ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga']
}

CV_lr = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, scoring='f1')
CV_lr.fit(X_train, y_train)
best_model = CV_lr.best_estimator_`}</code>
      </pre>

      <Title level={3}>7. Evaluation</Title>
      <pre>
        <code>{`accuracy = best_model.score(X_test, y_test)
scores = cross_val_score(best_model, X_test, y_test, cv=5, scoring='f1')

# Confusion matrix
# [[22295   422]
#  [   51  6324]]`}</code>
      </pre>
      <Paragraph>
        Reported metrics include high accuracy and strong F1 performance with low false negatives.
      </Paragraph>

      <Title level={3}>8. ROC Curve</Title>
      <Paragraph>
        The model ROC AUC reaches approximately 0.9979, indicating strong class discrimination.
      </Paragraph>
      <img
        src="/roc_curve_logistic.png"
        alt="ROC curve for logistic regression model"
        className="roc-image"
      />

      <Title level={3}>9. Model Export</Title>
      <pre>
        <code>{`joblib.dump(best_model, '/content/drive/My Drive/modelv4.joblib')
joblib.dump(imputer, '/content/drive/My Drive/imputerv4.joblib')
joblib.dump(scaler, '/content/drive/My Drive/scalerv4.joblib')`}</code>
      </pre>
    </div>
  );
}

export default AboutPredictionModel;
