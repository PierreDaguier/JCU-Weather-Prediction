import React from 'react';
import { Typography, Space, List, Anchor } from 'antd';
const { Title, Paragraph, Text } = Typography;
const { Link } = Anchor;

function Introduction() {
  return (
    <div style={{ maxWidth: '60%', margin: '0 auto', textAlign:'left' }}>
      <Typography>
        <Title style={{fontFamily: 'Playfair Display'}}>Welcome to Rain Prediction Tool</Title>
        <Paragraph>
          The Rain Prediction Tool is a deep learning-based application capable of predicting whether tomorrow will be rainy or not. 
          This tool leverages the power of Logistic Regression, trained on a comprehensive dataset sourced from Kaggle. The purpose of creating this tool 
          is purely educational and it was developed to be presented at James Cook University.
        </Paragraph>

        <Title level={3}>Dataset Source</Title>
        <Paragraph>
          The dataset was compiled from several weather stations and includes a vast amount of observations. You can access 
          these observations at <a href="http://www.bom.gov.au/climate/data">Bureau of Meteorology</a>. The dataset contains 
          145460 lines of data, each representing a unique observation.
        </Paragraph>

        <Title level={3}>Tech Stack</Title>
        <Paragraph>
          The application has been built using a variety of technologies. The predictive model is written in Python. The server is developed using Go, 
          and the front-end is designed using React, supplemented with Ant Design. Google Colab was used as the platform for training the model.
        </Paragraph>

        <Title level={3}>What's Next?</Title>
        <Paragraph>
          Explore more about this application in the following sections:
        </Paragraph>
        <List>
  <List.Item>
    <Title level={4}><Link href="#tool-description" title="Tool Description" /></Title>
    </List.Item>
    <Paragraph>
      This section explains the various input parameters (e.g., "locations," "humidity," "WindGustDir") used by the model.
    </Paragraph>
  
  <List.Item>
    <Title level={4}><Link href="#about-dataset" title="About Dataset" /></Title>
    </List.Item>
    <Paragraph>
      Here you can find information about the measurements in the dataset.
    </Paragraph>
  
  <List.Item>
    <Title level={4}><Link href="#about-prediction-model" title="About Prediction Model" /></Title>
    </List.Item>
    <Paragraph>
      This part describes how the model functions step-by-step.
    </Paragraph>
  
  <List.Item>
    <Title level={4}><Link href="#technical-description" title="Technical Description" /></Title>
    </List.Item>
    <Paragraph>
      This section offers a comprehensive technical overview of the application, along with a link to the GitHub repository where the source code resides.
    </Paragraph>
  
</List>
      </Typography>
    </div>
  );
}

export default Introduction;