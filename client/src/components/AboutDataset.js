import React from 'react';
import { Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;

function AboutDataset() {
  return (
    <div style={{ maxWidth: '60%', margin: '0 auto', textAlign:'left'}}>
      <Title style={{fontFamily: 'Playfair Display'}}>About the Dataset</Title>
      <Paragraph>
        This comprehensive dataset encompasses about a decade's worth of daily weather observations, spanning from October 31, 2007, to June 24, 2017. Drawn from numerous Australian weather stations, it provides a detailed overview of various weather parameters, painting a vivid picture of the nation's climate and weather patterns over the 10-year period. The dataset comprises an impressive total of 145,460 records.
      </Paragraph>

      <h2>Data Source</h2>
      <Paragraph>
        The data is sourced directly from the Australian Government's Bureau of Meteorology's official website, providing a level of credibility, thoroughness, and accuracy that is often unmatched. It is an invaluable resource for meteorologists, climate scientists, and data scientists alike. You can find more information and explore the raw data <a href="http://www.bom.gov.au/climate/data" target="_blank" rel="noopener noreferrer">here</a>.
      </Paragraph>

      <h2>Geospatial Coverage</h2>
      <Paragraph>
        The dataset captures weather data from a wide array of locations across the Australian continent. From Alice Springs in the heart of the continent to the coastal cities of Sydney and Brisbane, the dataset provides a comprehensive geographical coverage of Australia.
      </Paragraph>

      <h2>Temporal Coverage</h2>
      <Paragraph>
        The dataset offers temporal coverage from October 31, 2007, to June 24, 2017. This ten-year span allows for the exploration of long-term trends and the observation of seasonal variations and climatic cycles, adding another layer of depth to any analysis.
      </Paragraph>

      <h2>Variables in the Dataset</h2>
      <Paragraph>
        There are 23 columns in the dataset, each representing a specific weather parameter. These include temperature, humidity, pressure, cloud cover, wind speed, wind direction, location, and rainfall, among others. Each parameter has its specific range of values. For example, the 'MinTemp' values range from -8.5°C to 33.9°C, and the 'MaxTemp' ranges from -4.8°C to 48.1°C. Other parameters like 'Humidity9am' and 'Humidity3pm' range from 0 to 100, representing the percentage of humidity at those specific times.
      </Paragraph>

      <h2>Target Variable: RainTomorrow</h2>
      <Paragraph>
        Of these variables, 'RainTomorrow' is the target variable to predict. It's a binary variable indicating whether it rained the following day (Yes or No). Specifically, 'Yes' indicates that rainfall on the day was 1mm or more.
      </Paragraph>

      <h2>Quality and Usability</h2>
      <Paragraph>
        This dataset is of high quality due to its detailed and accurate data recording, as well as its wide coverage of multiple weather variables over a considerable time span and across diverse geographical locations. It is a rich resource for anyone interested in developing robust predictive models, conducting climatic research, or studying weather patterns in Australia. Its range of applications extends from scientific research and meteorological studies to the development of data-driven solutions in sectors such as agriculture, environmental management, and urban planning.
      </Paragraph>
      <h2>Understanding the Distribution Plots</h2>
    <Paragraph>
      The distribution plots visualize the frequency of each weather variable, further categorized by whether it rained the next day or not. Each plot represents a weather variable on the x-axis, and the frequency of these values on the y-axis. The data are split into two categories, represented by different colors. Orange bars represent days when it did not rain the next day, while blue bars represent days when it did. By comparing the heights of the bars, we can see how each weather variable's distribution is affected by whether it rains the next day.
    </Paragraph>

    <h2>Temperature Variables</h2>
    <Image width={200} src="/curves/MinTemp.png" />
    <Image width={200} src="/curves/MaxTemp.png" />
    <Image width={200} src="/curves/Temp9am.png" />
    <Image width={200} src="/curves/Temp3pm.png" />

    <h2>Wind Variables</h2>
    <Image width={200} src="/curves/WindGustSpeed.png" />
    <Image width={200} src="/curves/WindSpeed9am.png" />
    <Image width={200} src="/curves/WindSpeed3pm.png" />
    <Image width={200} src="/curves/WindGustDir.png" />
    <Image width={200} src="/curves/WindDir9am.png" />
    <Image width={200} src="/curves/WindDir3pm.png" />

    <h2>Pressure Variables</h2>
    <Image width={200} src="/curves/Pressure9am.png" />
    <Image width={200} src="/curves/Pressure3pm.png" />

    <h2>Humidity Variables</h2>
    <Image width={200} src="/curves/Humidity9am.png" />
    <Image width={200} src="/curves/Humidity3pm.png" />

    <h2>Cloud Variables</h2>
    <Image width={200} src="/curves/Cloud9am.png" />
    <Image width={200} src="/curves/Cloud3pm.png" />

    <h2>Other Variables</h2>
    <Image width={200} src="/curves/Evaporation.png" />
    <Image width={200} src="/curves/RainFall.png" />
    <Image width={200} src="/curves/Sunshine.png" />
    </div>


  );
}

export default AboutDataset;
