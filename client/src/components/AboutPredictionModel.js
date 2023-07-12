import React from 'react';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;


function AboutPredictionModel() {
  return (
    <div style={{ maxWidth: '60%', margin: '0 auto', textAlign:'left'}}>
      <Title style={{fontFamily: 'Playfair Display'}}>Prediction Model</Title>
      <p>In our effort to predict rainfall in Australia, we utilized a Machine Learning model, more specifically, a Logistic Regression Model. We processed and modeled the data using the popular Python libraries: Pandas, Scikit-learn, and Imbalanced-learn. Data processing and modeling pipeline consisted of the following steps:</p>

      <h2>Data Loading</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Load data
          df = pd.read_csv('/content/drive/My Drive/weatherAUS.csv', na_values='NA')
          
          // Convert dates to ordinal (numeric) form
          df['Date'] = pd.to_datetime(df['Date']).apply(lambda date: date.toordinal())
        </code>
      </pre>
      <p>First step was to load our dataset into a pandas DataFrame, and convert the 'Date' column to an ordinal (numeric) form. This is a common practice when working with date data in machine learning as it makes it more compatible with various algorithms.</p>

      <h2>Missing Data Imputation</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Impute missing data
          imputer = KNNImputer(n_neighbors=5)
          num_cols = df.select_dtypes(include=['int64', 'float64']).columns
          df[num_cols] = imputer.fit_transform(df[num_cols])
        </code>
      </pre>
      <p>With our data loaded, we next moved to handle missing data within our dataset. We used a method called K-Nearest Neighbors Imputation (KNN Imputation) to fill missing values based on the 5 closest neighbors of the datapoint being considered. This is a powerful imputation method that often yields better results than simple imputation methods, such as mean or median imputation.</p>

      <h2>Feature Scaling</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Standardize the features
          scaler = StandardScaler()
          df[num_cols] = scaler.fit_transform(df[num_cols])
        </code>
      </pre>
      <p>After imputing missing data, we then standardized our numeric features using Standard Scaler from scikit-learn. Standardizing the features around the center and 0 with a standard deviation of 1 is important when we compare measurements that have different units. Variables that are measured at different scales do not contribute equally to the analysis and might end up creating a bais.</p>

      <h2>Encoding Categorical Data</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Encode categorical data
          df = pd.get_dummies(df)
        </code>
      </pre>
      <p>We next encoded our categorical features into a format that's easier for our machine learning model to interpret. We did this through a method called one-hot encoding, where each unique category value within a feature gets its own column. The value in these new columns indicates the presence (1) or absence (0) of the category value in the original data.</p>

      <h2>Data Splitting</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Split data with stratification
          X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        </code>
      </pre>
      <p>We divided our data into a training set and a test set. The training set is used to train our machine learning model, while the test set is used to evaluate the model's performance. We used a stratified splitting method to ensure that the proportion of each class in our target variable 'RainTomorrow' is the same in both the training and test sets.</p>

      <h2>Handling Class Imbalance</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Apply SMOTE to oversample the minority class
          sm = SMOTE(random_state=42)
          X_train, y_train = sm.fit_resample(X_train, y_train)
        </code>
      </pre>
      <p>As our dataset was imbalanced, meaning the classes in our target variable were not represented equally, we applied Synthetic Minority Over-sampling Technique (SMOTE) to balance our dataset. SMOTE works by generating synthetic samples from the minor class instead of creating copies, thus helping to increase the information available to the model.</p>

      <h2>Model Training</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
        {`
          model = LogisticRegression(max_iter=1000)

          // Model parameter tuning
          param_grid = {
              "C": [0.1, 1, 10, 100],
              "solver": ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga'],
          }

          CV_lr = GridSearchCV(estimator=model, param_grid=param_grid, cv= 5, scoring='f1')
          CV_lr.fit(X_train, y_train)
          print('Best parameters:', CV_lr.best_params_)

          // Use the best model from grid search for further steps
          best_model = CV_lr.best_estimator_

          `}
        </code>
      </pre>
      <p>We trained our model using Logistic Regression, a machine learning algorithm that is used for binary classification problems. To ensure that we found the best hyperparameters for our model, we utilized GridSearchCV, which performs an exhaustive search over specified parameter values for the model. The parameters of the estimator that gave the highest score on our left-out data were selected.</p>

      <h2>Model Evaluation</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Model evaluation
          accuracy = best_model.score(X_test, y_test)
          with open('/content/drive/My Drive/accuracy_logistic.txt', 'w') as f:
              f.write('Précision du modèle: ' + str(accuracy))

          // Cross Validation
          scores = cross_val_score(best_model, X_test, y_test, cv=5, scoring='f1')
          print("Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() * 2))

          // Confusion Matrix
          Matrice de confusion: [[22295    422]
                                [    51   6324]]
        </code>
      </pre>
      <p>We evaluated our model using multiple performance metrics. These include Accuracy, F1-Score, and the Confusion Matrix:</p>
      <ul>
        <li><strong>Accuracy:</strong> This is the ratio of the total number of correct predictions over the total number of predictions. The model achieved an accuracy of approximately 93.74%, which is quite high.</li>
        <li><strong>F1-Score:</strong> The F1-score is the harmonic mean of precision and recall and is a better measure than accuracy especially for imbalanced class problems. The highest possible value for F1-Score is 1, and our model achieved a score of approximately 0.9639, indicating a good balance between precision and recall.</li>
        <li><strong>Confusion Matrix:</strong> This is a table used to describe the performance of a classification model. In our case, the matrix indicates that our model performed well, with only a small fraction of false negatives and false positives.</li>
      </ul>
      
      <h2>ROC Curve</h2>
      <p>The ROC (Receiver Operating Characteristic) curve is a plot that illustrates the diagnostic ability of a binary classifier as its discrimination threshold is varied. The model achieved an AUC (Area Under Curve) of 0.9979, indicating excellent performance. The closer the AUC is to 1, the better the model's performance.</p>
      <img src='/roc_curve_logistic.png'></img>
      
      <h2>Model Saving</h2>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          // Save the model
          joblib.dump(best_model, '/content/drive/My Drive/modelv4.joblib')
          joblib.dump(imputer, '/content/drive/My Drive/imputerv4.joblib')
          joblib.dump(scaler, '/content/drive/My Drive/scalerv4.joblib')
          print('Model saved as model_logistic.joblib')
        </code>
      </pre>
      <p>Finally, we saved our model using joblib, a Python library used for serializing Python objects into files. This allows us to use our model in the future without needing to retrain it.</p>

    </div>
  );
}

export default AboutPredictionModel;
