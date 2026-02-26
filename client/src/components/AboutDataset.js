import React from 'react';
import { Image, Typography } from 'antd';

const { Paragraph, Title } = Typography;

const curveGroups = [
  {
    title: 'Temperature Variables',
    images: ['MinTemp', 'MaxTemp', 'Temp9am', 'Temp3pm']
  },
  {
    title: 'Wind Variables',
    images: [
      'WindGustSpeed',
      'WindSpeed9am',
      'WindSpeed3pm',
      'WindGustDir',
      'WindDir9am',
      'WindDir3pm'
    ]
  },
  {
    title: 'Pressure Variables',
    images: ['Pressure9am', 'Pressure3pm']
  },
  {
    title: 'Humidity Variables',
    images: ['Humidity9am', 'Humidity3pm']
  },
  {
    title: 'Cloud Variables',
    images: ['Cloud9am', 'Cloud3pm']
  },
  {
    title: 'Other Variables',
    images: ['Evaporation', 'RainFall', 'Sunshine']
  }
];

function AboutDataset() {
  return (
    <div className="doc-section">
      <Title>About the Dataset</Title>
      <Paragraph>
        The dataset contains roughly 10 years of daily weather observations,
        from October 31, 2007 to June 24, 2017, across Australian stations.
        It includes 145,460 records and 23 variables.
      </Paragraph>

      <Title level={3}>Data Source</Title>
      <Paragraph>
        Data comes from the Australian Bureau of Meteorology. You can inspect
        the source at
        {' '}
        <a href="http://www.bom.gov.au/climate/data" target="_blank" rel="noopener noreferrer">
          bom.gov.au/climate/data
        </a>
        .
      </Paragraph>

      <Title level={3}>Coverage Summary</Title>
      <Paragraph>
        The dataset spans many climates, from tropical northern stations to
        temperate and arid regions. This broad coverage improves generalization
        when predicting rain.
      </Paragraph>

      <Title level={3}>Target Variable</Title>
      <Paragraph>
        <strong>RainTomorrow</strong> is the binary target: <strong>Yes</strong> means
        rainfall of at least 1mm the next day, <strong>No</strong> means below that threshold.
      </Paragraph>

      <Title level={3}>Distribution Plots</Title>
      <Paragraph>
        The following charts show variable distributions split by the next-day rain outcome.
        They help reveal which signals differ most between rainy and non-rainy conditions.
      </Paragraph>

      {curveGroups.map((group) => (
        <div key={group.title} className="curve-group">
          <Title level={4}>{group.title}</Title>
          <div className="curve-grid">
            {group.images.map((imageName) => (
              <div key={imageName} className="curve-card">
                <Image
                  src={`/curves/${imageName}.png`}
                  alt={`${imageName} distribution`}
                  preview={false}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutDataset;
