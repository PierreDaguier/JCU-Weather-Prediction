import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

function TechnicalDescription() {
  return (
    <div className="doc-section">
      <Title>Technical Description</Title>

      <Title level={3}>Application Overview</Title>
      <Paragraph>
        This project predicts rain for the next day using a 3-tier architecture:
        React front-end, Go API server, and Python-based ML artifacts.
      </Paragraph>

      <Title level={3}>Architecture Layers</Title>
      <ul>
        <li><strong>Front-end:</strong> React + Ant Design interface for user inputs and results.</li>
        <li><strong>Back-end:</strong> Go service handling requests and model execution flow.</li>
        <li><strong>ML Layer:</strong> Python preprocessing and Logistic Regression model artifacts.</li>
      </ul>

      <Title level={3}>Request Flow</Title>
      <ol>
        <li>User enters weather metrics in the UI.</li>
        <li>React sends a JSON payload to the Go server endpoint.</li>
        <li>The server prepares input for the trained model pipeline.</li>
        <li>The model returns a binary rain/no-rain prediction.</li>
        <li>The API returns the prediction and the UI renders the result state.</li>
      </ol>

      <Title level={3}>Project Structure</Title>
      <pre>
        <code>{`.
├── analysis/              # Python analysis and model experiments
├── client/                # React application
├── data/                  # weatherAUS.csv and related files
├── main.go                # Go API server entry point
├── *.joblib               # Serialized model artifacts
└── README.md`}</code>
      </pre>
      <Paragraph>
        This separation keeps concerns clear and allows independent iteration on UI,
        API orchestration, and model lifecycle.
      </Paragraph>
    </div>
  );
}

export default TechnicalDescription;
