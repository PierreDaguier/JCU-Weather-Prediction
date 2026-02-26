import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

const locations = [
  { name: 'Albury', lat: -36.072596, lng: 146.909419 },
  { name: 'BadgerysCreek', lat: -33.872934, lng: 150.748446 },
  { name: 'Cobar', lat: -31.487246, lng: 145.831592 },
  { name: 'CoffsHarbour', lat: -30.299782, lng: 153.114905 },
  { name: 'Moree', lat: -29.456833, lng: 149.848633 },
  { name: 'Newcastle', lat: -32.931334, lng: 151.732192 },
  { name: 'NorahHead', lat: -33.281585, lng: 151.566156 },
  { name: 'NorfolkIsland', lat: -29.035165, lng: 167.956664 },
  { name: 'Penrith', lat: -33.752252, lng: 150.688772 },
  { name: 'Richmond', lat: -33.602047, lng: 150.749752 },
  { name: 'Sydney', lat: -33.867192, lng: 151.227185 },
  { name: 'SydneyAirport', lat: -33.949731, lng: 151.186555 },
  { name: 'WaggaWagga', lat: -35.106623, lng: 147.355623 },
  { name: 'Williamtown', lat: -32.806394, lng: 151.822625 },
  { name: 'Wollongong', lat: -34.424381, lng: 150.89023 },
  { name: 'Canberra', lat: -35.28197, lng: 149.128105 },
  { name: 'Tuggeranong', lat: -35.443946, lng: 149.092748 },
  { name: 'MountGinini', lat: -35.527882, lng: 148.773008 },
  { name: 'Ballarat', lat: -37.559803, lng: 143.840722 },
  { name: 'Bendigo', lat: -36.759136, lng: 144.279937 },
  { name: 'Sale', lat: -38.105267, lng: 147.064842 },
  { name: 'MelbourneAirport', lat: -37.670255, lng: 144.844652 },
  { name: 'Melbourne', lat: -37.846315, lng: 144.966319 },
  { name: 'Mildura', lat: -34.211444, lng: 142.133432 },
  { name: 'Nhil', lat: -36.274153, lng: 141.615599 },
  { name: 'Portland', lat: -38.355307, lng: 141.610029 },
  { name: 'Watsonia', lat: -37.709612, lng: 145.081142 },
  { name: 'Dartmoor', lat: -37.904379, lng: 141.293118 },
  { name: 'Brisbane', lat: -27.446367, lng: 153.07417 },
  { name: 'Cairns', lat: -16.909199, lng: 145.685953 },
  { name: 'GoldCoast', lat: -27.990509, lng: 153.400248 },
  { name: 'Townsville', lat: -19.263886, lng: 146.824104 },
  { name: 'Adelaide', lat: -34.882094, lng: 138.562782 },
  { name: 'MountGambier', lat: -37.824941, lng: 140.774975 },
  { name: 'Nuriootpa', lat: -34.470422, lng: 138.984643 },
  { name: 'Woomera', lat: -31.162438, lng: 136.816551 },
  { name: 'Albany', lat: -35.020216, lng: 117.885241 },
  { name: 'Witchcliffe', lat: -34.01597, lng: 115.106073 },
  { name: 'PearceRAAF', lat: -31.668852, lng: 116.025594 },
  { name: 'PerthAirport', lat: -31.948453, lng: 115.973586 },
  { name: 'Perth', lat: -31.956948, lng: 115.934022 },
  { name: 'SalmonGums', lat: -32.8378086, lng: 121.63382 },
  { name: 'Walpole', lat: -34.979014, lng: 116.766366 },
  { name: 'Hobart', lat: -42.896031, lng: 147.328193 },
  { name: 'Launceston', lat: -41.441151, lng: 147.153629 },
  { name: 'AliceSprings', lat: -23.698941, lng: 133.882748 },
  { name: 'Darwin', lat: -12.430247, lng: 130.970727 },
  { name: 'Katherine', lat: -14.471459, lng: 132.265002 },
  { name: 'Uluru', lat: -25.344842, lng: 131.031696 }
];

function LocationsGrid() {
  return (
    <div className="locations-grid">
      {locations.map((location) => (
        <div key={location.name} className="location-item">
          <strong>{location.name}</strong>
          <span>
            Lat {location.lat}, Lng {location.lng}
          </span>
        </div>
      ))}
    </div>
  );
}

function ToolDescription() {
  return (
    <div className="doc-section">
      <Title>Tool Description</Title>
      <Paragraph>
        The predictor estimates rain probability from a multi-signal weather profile.
        Each variable captures a different part of the atmosphere.
      </Paragraph>

      <Title level={3}>Temperature Signals</Title>
      <Paragraph>
        <strong>MinTemp</strong>, <strong>MaxTemp</strong>, <strong>Temp9am</strong>
        {' '}
        and <strong>Temp3pm</strong> describe the thermal profile of the day.
        Temperature affects evaporation and water-vapor holding capacity,
        which strongly influences rain formation.
      </Paragraph>

      <Title level={3}>Humidity Signals</Title>
      <Paragraph>
        <strong>Humidity9am</strong> and <strong>Humidity3pm</strong> track moisture
        saturation in the air. High values generally increase the chance of cloud
        development and precipitation.
      </Paragraph>

      <Title level={3}>Pressure Signals</Title>
      <Paragraph>
        <strong>Pressure9am</strong> and <strong>Pressure3pm</strong> provide pressure
        trends over the day. Falling pressure can indicate unstable weather and
        increased rain potential.
      </Paragraph>

      <Title level={3}>Cloud Signals</Title>
      <Paragraph>
        <strong>Cloud9am</strong> and <strong>Cloud3pm</strong> (oktas) represent cloud
        cover intensity. Higher cloud coverage often correlates with incoming rainfall.
      </Paragraph>

      <Title level={3}>Wind Signals</Title>
      <Paragraph>
        <strong>WindGustSpeed</strong>, <strong>WindSpeed9am</strong> and
        {' '}
        <strong>WindSpeed3pm</strong> capture intensity, while <strong>WindGustDir</strong>,
        {' '}
        <strong>WindDir9am</strong> and <strong>WindDir3pm</strong> capture direction.
        Direction can reveal if moisture-rich air masses are moving into the area.
      </Paragraph>

      <Title level={3}>Hydrology & Solar Signals</Title>
      <Paragraph>
        <strong>Rainfall</strong>, <strong>Evaporation</strong> and <strong>Sunshine</strong>
        {' '}
        complete the profile by adding recent water-cycle behavior and solar exposure,
        two factors that shape near-term weather transitions.
      </Paragraph>

      <Title level={3}>Supported Locations</Title>
      <Paragraph>
        Observations are tied to Australian weather stations listed below.
      </Paragraph>
      <LocationsGrid />
    </div>
  );
}

export default ToolDescription;
