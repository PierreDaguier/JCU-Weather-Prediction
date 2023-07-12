import React from 'react';
import { Typography, List, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const { Title, Paragraph } = Typography;




const mapStyles = {        
  height: "50vh",
  width: "100%"};

  const defaultCenter = {
    lat: -25.3455, lng: 131.0369 
  }

  const locations = [
    { name: "Albury", lat: -36.072596 , lng: 146.909419 },
    { name: "BadgerysCreek", lat: -33.872934 , lng:  150.748446 },
    { name: "Cobar", lat: -31.487246 , lng: 145.831592 },
    { name: "CoffsHarbour", lat: -30.299782 , lng: 153.114905 },
    { name: "Moree", lat: -29.456833 , lng: 149.848633 },
    { name: "Newcastle", lat: -32.931334 , lng: 151.732192 },
    { name: "NorahHead", lat: -33.281585 , lng: 151.566156 },
    { name: "NorfolkIsland", lat: -29.035165 , lng: 167.956664 },
    { name: "Penrith", lat: -33.752252 , lng: 150.688772 },
    { name: "Richmond", lat: -33.602047 , lng: 150.749752 },
    { name: "Sydney", lat: -33.867192 , lng: 151.227185 },
    { name: "SydneyAirport", lat: -33.949731 , lng: 151.186555 },
    { name: "WaggaWagga", lat: -35.106623 , lng: 147.355623 },
    { name: "Williamtown", lat: -32.806394 , lng: 151.822625 },
    { name: "Wollongong", lat: -34.424381 , lng: 150.890230 },
    { name: "Canberra", lat: -35.281970 , lng: 149.128105 },
    { name: "Tuggeranong", lat: -35.443946 , lng: 149.092748 },
    { name: "MountGinini", lat: -35.527882 , lng: 148.773008 },
    { name: "Ballarat", lat: -37.559803 , lng: 143.840722 },
    { name: "Bendigo", lat: -36.759136 , lng: 144.279937 },
    { name: "Sale", lat: -38.105267 , lng:  147.064842 },
    { name: "MelbourneAirport", lat: -37.670255 , lng: 144.844652 },
    { name: "Melbourne", lat: -37.846315 , lng: 144.966319 },
    { name: "Mildura", lat: -34.211444 , lng: 142.133432 },
    { name: "Nhil", lat: -36.274153, lng: 141.615599 },
    { name: "Portland", lat: -38.355307, lng:  141.610029 },
    { name: "Watsonia", lat: -37.709612, lng: 145.081142 },
    { name: "Dartmoor", lat: -37.904379, lng:  141.293118 },
    { name: "Brisbane", lat: -27.446367, lng: 153.074170 },
    { name: "Cairns", lat: -16.909199, lng: 145.685953 },
    { name: "GoldCoast", lat: -27.990509, lng: 153.400248 },
    { name: "Townsville", lat: -19.263886, lng: 146.824104 },
    { name: "Adelaide", lat: -34.882094, lng: 138.562782 },
    { name: "MountGambier", lat: -37.824941, lng: 140.774975 },
    { name: "Nuriootpa", lat: -34.470422, lng: 138.984643 },
    { name: "Woomera", lat: -31.162438, lng: 136.816551 },
    { name: "Albany", lat: -35.020216, lng: 117.885241 },
    { name: "Witchcliffe", lat: -34.015970, lng: 115.106073 },
    { name: "PearceRAAF", lat: -31.668852, lng: 116.025594 },
    { name: "PerthAirport", lat: -31.948453, lng: 115.973586 },
    { name: "Perth", lat: -31.956948, lng: 115.934022 },
    { name: "SalmonGums", lat: -32.8378086, lng: 121.633820 },
    { name: "Walpole", lat: -34.979014, lng: 116.766366 },
    { name: "Hobart", lat: -42.896031, lng: 147.328193 },
    { name: "Launceston", lat: -41.441151, lng: 147.153629 },
    { name: "AliceSprings", lat: -23.698941, lng: 133.882748 },
    { name: "Darwin", lat: -12.430247, lng: 130.970727 },
    { name: "Katherine", lat: -14.471459, lng: 132.265002 },
    { name: "Uluru", lat: -25.344842, lng: 131.031696 },
];

function LocationsList() {

  // Créer des tranches de trois éléments
  const chunkedLocations = [];
  for(let i = 0; i < locations.length; i += 3) {
    chunkedLocations.push(locations.slice(i, i + 3));
  }

  return (
    <div style={{ maxWidth: '60%', margin: '0 auto', textAlign:'left' }}>
      <Title style={{fontFamily: 'Playfair Display'}}>Locations</Title>
      {chunkedLocations.map((chunk, index) => (
        <Row gutter={16} key={index}>
          {chunk.map(location => (
            <Col span={8} key={location.name}>
              <List.Item>
                <List.Item.Meta
                  title={location.name}
                  description={`Latitude: ${location.lat}, Longitude: ${location.lng}`}
                />
              </List.Item>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}


function ToolDescription() {
  return (
    <div style={{ maxWidth: '60%', margin: '0 auto', textAlign:'left' }}>
      <Title style={{fontFamily: 'Playfair Display'}}>Tool Description</Title>
      <Paragraph>
        This tool predicts the possibility of rain using various parameters related to weather. Each parameter plays a significant role in the weather prediction model. Here's an in-depth explanation of each parameter used:
      </Paragraph>

      <Title level={2}>Temperature</Title>
      <h2>MinTemp and MaxTemp</h2>
      <Paragraph>
        Temperature is a fundamental aspect of our climate and weather. In our tool, MinTemp and MaxTemp parameters record the minimum and maximum temperatures of the day in Celsius. They are crucial as they help determine the heat content of the atmosphere, which influences the rate of evaporation and the capacity of the air to hold water vapor - key factors in the formation of rain.
      </Paragraph>
      <h2>Temp9am and Temp3pm</h2>
      <Paragraph>
        The temperature during different parts of the day can influence weather patterns. Temp9am and Temp3pm denote the temperature at 9 AM and 3 PM, respectively. The temperatures at these times help us understand daily temperature variations, which can impact the likelihood of rain.
      </Paragraph>

      <Title level={2}>Humidity</Title>
      <h2>Humidity9am and Humidity3pm</h2>
      <Paragraph>
        Humidity refers to the concentration of water vapor present in the air. Humidity plays a critical role in weather prediction as it directly correlates with the likelihood of precipitation, dew, or fog. High humidity indicates that the air is saturated with water vapor, and if other conditions are right, it can lead to rain. Our tool measures humidity at 9 AM and 3 PM, providing insights into daily humidity patterns.
      </Paragraph>

      <Title level={2}>Pressure</Title>
      <h2>Pressure9am and Pressure3pm</h2>
      <Paragraph>
        Atmospheric pressure is the force exerted by the atmosphere at a given point. It can greatly influence weather conditions. High pressure often brings clear skies, while low pressure typically brings clouds and rain. In this tool, we measure pressure at 9 AM and 3 PM to understand the pressure trends during the day, which can help predict the likelihood of rain.
      </Paragraph>

      <Title level={2}>Cloud Cover</Title>
      <h2>Cloud9am and Cloud3pm</h2>
      <Paragraph>
        Cloud cover refers to the fraction of the sky covered by clouds. It is essential for predicting weather as it affects temperature, humidity, and radiation from the sun. Clouds also play a direct role in precipitation. The values are measured in 'oktas', ranging from 0 (clear sky) to 9 (completely overcast). These measures taken at 9 AM and 3 PM help us understand how cloud cover changes during the day and influence the prediction of rain.
      </Paragraph>

      <Title level={2}>Wind</Title>
      <h2>WindGustSpeed, WindSpeed9am, WindSpeed3pm</h2>
      <Paragraph>
        Wind patterns can greatly impact weather conditions. Wind affects the rate of evaporation, humidity levels, and cloud formation, all of which are important factors for rain. WindGustSpeed records the highest wind speed during the day, while WindSpeed9am and WindSpeed3pm provide insights into the wind conditions at those specific times, which can help predict the likelihood of rain.
      </Paragraph>
      <h2>WindGustDir, WindDir9am, WindDir3pm</h2>
      <Paragraph>
        The direction of the wind can influence weather patterns. Certain wind directions might bring moist air, increasing the chances of rain, while others might bring dry air, reducing the chances of rain. These parameters record the wind direction at different times, providing valuable data to predict the possibility of rain.
      </Paragraph>

      <Title level={2}>Location</Title>
      <Paragraph>
        The geographic location plays a significant role in local weather conditions. Different locations have different climates and weather patterns, and understanding these patterns can greatly enhance the accuracy of weather prediction. 
         <LocationsList />
      </Paragraph>

      <Title level={2}>Rainfall and Evaporation</Title>
      <Paragraph>
        Rainfall and evaporation are key components of the water cycle, which is integral to weather patterns. Rainfall measures the amount of rain that has fallen over a 24-hour period, providing direct evidence of the occurrence of precipitation. Evaporation, on the other hand, is the process by which water is converted from liquid to vapor and is a crucial part of the formation of clouds and precipitation. Both these parameters provide key information for the prediction of rain.
      </Paragraph>

      <Title level={2}>Sunshine</Title>
      <Paragraph>
        Sunshine measures the amount of solar radiation received by a specific area. It influences temperature, humidity, and evaporation rates, all of which are important factors for predicting rain. This parameter records the number of hours of bright sunshine in the day. By understanding the amount of sunshine in a given day, the model can make more accurate predictions about the likelihood of rain.
      </Paragraph>
    </div>
  );
}

export default ToolDescription;
