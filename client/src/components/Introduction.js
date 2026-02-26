import React from 'react';
import { List, Typography } from 'antd';

const { Paragraph, Title } = Typography;

const nextSections = [
  {
    title: 'Tool Description',
    description: 'Understand all input variables used for inference.'
  },
  {
    title: 'About Dataset',
    description: 'Review coverage, temporal span and variable distributions.'
  },
  {
    title: 'Prediction Model',
    description: 'See preprocessing, training and evaluation details.'
  },
  {
    title: 'Technical Description',
    description: 'Get architecture, flow and repository structure.'
  }
];

function Introduction() {
  return (
    <div className="doc-section">
      <Typography>
        <Title>Welcome to the Rain Prediction Tool</Title>
        <Paragraph>
          This application predicts whether it will rain tomorrow using weather
          observations from Australian stations. The model is based on Logistic
          Regression and trained on a large Kaggle dataset.
        </Paragraph>

        <Title level={3}>Dataset Source</Title>
        <Paragraph>
          The training data was compiled from multiple weather stations and contains
          145,460 observations. The source comes from the Bureau of Meteorology:
          {' '}
          <a href="http://www.bom.gov.au/climate/data" target="_blank" rel="noopener noreferrer">
            bom.gov.au/climate/data
          </a>
          .
        </Paragraph>

        <Title level={3}>Tech Stack</Title>
        <Paragraph>
          The predictive model is written in Python, the API server is in Go,
          and the interface is built in React with Ant Design.
        </Paragraph>

        <Title level={3}>Explore Next</Title>
      </Typography>

      <List
        className="doc-inline-list"
        dataSource={nextSections}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.title}:</strong>&nbsp;{item.description}
          </List.Item>
        )}
      />
    </div>
  );
}

export default Introduction;
