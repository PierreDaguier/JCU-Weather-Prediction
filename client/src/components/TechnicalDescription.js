import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

function TechnicalDescription() {
  return (
    <div style={{ maxWidth: '60%', margin: '0 auto', textAlign:'left'}}>
      <Title style={{fontFamily: 'Playfair Display'}}>Technical Description</Title>
      
      <h2>Application Overview</h2>
      <p>This application is a weather forecasting system that employs a Machine Learning model to predict whether it will rain tomorrow or not. This application's structure follows a typical three-tier architecture:</p>
      <ul>
        <li><strong>Front-end</strong>: built with React and Ant Design</li>
        <li><strong>Back-end server</strong>: built with Go</li>
        <li><strong>Data Analysis and Prediction scripts</strong>: built with Python</li>
      </ul>
      
      <h2>Front-end</h2>
      <p>The front-end of this application is built using React, a popular JavaScript library for building user interfaces, especially single page applications. For the UI design, we use Ant Design, a design system with a set of high-quality React components which are written in TypeScript. This allows us to build a consistent and user-friendly interface that offers a great user experience.</p>
      
      <h2>Back-end Server</h2>
      <p>The back-end server of this application is implemented using Go. Go, also known as Golang, is a statically typed, compiled programming language designed at Google. It provides excellent support for multithreading and it's efficient in terms of memory and CPU usage, which makes it a perfect choice for our server-side operations.</p>

      <h2>Data Analysis and Prediction Scripts</h2>
      <p>Data Analysis and Machine Learning prediction scripts are implemented in Python. Python is a versatile language widely used in Data Science thanks to its comprehensive ecosystem of scientific libraries like pandas, NumPy, and sci-kit learn. We utilize these libraries to handle our data and to implement and train our Logistic Regression machine learning model.</p>

      <h2>Application Flow</h2>
      <p>The application operates as follows:</p>
      <ol>
        <li>User interacts with the front-end of the application.</li>
        <li>React captures the user input and sends it to the back-end server implemented in Go.</li>
        <li>The server processes the request and forwards it to the appropriate Python script.</li>
        <li>Python script loads the Machine Learning model, scales the input data, and runs the prediction.</li>
        <li>The prediction result is sent back to the Go server, which then forwards it to the React application.</li>
        <li>Finally, React displays the prediction result to the user.</li>
      </ol>

      <h2>Application File Structure</h2>
      <pre>
        <code>
{`
.
├── analysis
│   ├── Various Python scripts for data analysis
├── client
│   ├── React front-end application
├── data
│   └── weatherAUS.csv
├── env
│   ├── Python virtual environment
├── main.go
│   ├── Go server
├── various .joblib files
│   ├── Trained model and Scaler objects saved with joblib
├── various .py files
│   ├── Python scripts for model training and prediction
└── Readme.md
`}
        </code>
      </pre>
      <p>This tree structure gives a quick overview of how the project is organized. All the parts work together to deliver accurate weather predictions to the end-user.</p>
    </div>
  );
}

export default TechnicalDescription;
