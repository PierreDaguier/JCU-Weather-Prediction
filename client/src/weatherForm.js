import React, { useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Select, Slider, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const localisations = [
  'Albury',
  'BadgerysCreek',
  'Cobar',
  'CoffsHarbour',
  'Moree',
  'Newcastle',
  'NorahHead',
  'NorfolkIsland',
  'Penrith',
  'Richmond',
  'Sydney',
  'SydneyAirport',
  'WaggaWagga',
  'Williamtown',
  'Wollongong',
  'Canberra',
  'Tuggeranong',
  'MountGinini',
  'Ballarat',
  'Bendigo',
  'Sale',
  'MelbourneAirport',
  'Melbourne',
  'Mildura',
  'Nhil',
  'Portland',
  'Watsonia',
  'Dartmoor',
  'Brisbane',
  'Cairns',
  'GoldCoast',
  'Townsville',
  'Adelaide',
  'MountGambier',
  'Nuriootpa',
  'Woomera',
  'Albany',
  'Witchcliffe',
  'PearceRAAF',
  'PerthAirport',
  'Perth',
  'SalmonGums',
  'Walpole',
  'Hobart',
  'Launceston',
  'AliceSprings',
  'Darwin',
  'Katherine',
  'Uluru'
];

const directions = [
  'W',
  'WNW',
  'WSW',
  'NE',
  'NNW',
  'N',
  'NNE',
  'SW',
  'nan',
  'ENE',
  'SSE',
  'S',
  'NW',
  'SE',
  'ESE',
  'E',
  'SSW'
];

const sliderMarks = (min, max, unit = '') => ({
  [min]: `${min}${unit}`,
  [max]: `${max}${unit}`
});

const metricGroups = [
  {
    title: 'Thermal & Water Balance',
    description: 'Core temperature and moisture signals used by the model.',
    fields: [
      {
        name: 'minTemp',
        label: 'Min Temperature',
        min: -10,
        max: 50,
        step: 0.1,
        unit: '°C',
        decimals: 1,
        defaultValue: 12,
        marks: sliderMarks(-10, 50, '°C')
      },
      {
        name: 'maxTemp',
        label: 'Max Temperature',
        min: -10,
        max: 50,
        step: 0.1,
        unit: '°C',
        decimals: 1,
        defaultValue: 23,
        marks: sliderMarks(-10, 50, '°C')
      },
      {
        name: 'temp9am',
        label: 'Temperature at 9am',
        min: -10,
        max: 50,
        step: 0.1,
        unit: '°C',
        decimals: 1,
        defaultValue: 16,
        marks: sliderMarks(-10, 50, '°C')
      },
      {
        name: 'temp3pm',
        label: 'Temperature at 3pm',
        min: -10,
        max: 50,
        step: 0.1,
        unit: '°C',
        decimals: 1,
        defaultValue: 22,
        marks: sliderMarks(-10, 50, '°C')
      },
      {
        name: 'rainfall',
        label: 'Rainfall',
        min: 0,
        max: 400,
        step: 1,
        unit: 'mm',
        defaultValue: 2,
        marks: sliderMarks(0, 400, 'mm')
      },
      {
        name: 'evaporation',
        label: 'Evaporation',
        min: 0,
        max: 150,
        step: 1,
        unit: 'mm',
        defaultValue: 5,
        marks: sliderMarks(0, 150, 'mm')
      },
      {
        name: 'sunshine',
        label: 'Sunshine',
        min: 0,
        max: 15,
        step: 0.5,
        unit: 'h',
        decimals: 1,
        defaultValue: 7,
        marks: sliderMarks(0, 15, 'h')
      }
    ]
  },
  {
    title: 'Wind Dynamics',
    description: 'Wind intensity captured at gust, 9am and 3pm checkpoints.',
    fields: [
      {
        name: 'windGustSpeed',
        label: 'Wind Gust Speed',
        min: 0,
        max: 100,
        step: 1,
        unit: 'km/h',
        defaultValue: 35,
        marks: sliderMarks(0, 100, 'km/h')
      },
      {
        name: 'windSpeed9am',
        label: 'Wind Speed at 9am',
        min: 0,
        max: 100,
        step: 1,
        unit: 'km/h',
        defaultValue: 15,
        marks: sliderMarks(0, 100, 'km/h')
      },
      {
        name: 'windSpeed3pm',
        label: 'Wind Speed at 3pm',
        min: 0,
        max: 100,
        step: 1,
        unit: 'km/h',
        defaultValue: 20,
        marks: sliderMarks(0, 100, 'km/h')
      }
    ]
  },
  {
    title: 'Humidity, Pressure & Clouds',
    description: 'Atmospheric conditions indicating rain probability trends.',
    fields: [
      {
        name: 'humidity9am',
        label: 'Humidity at 9am',
        min: 0,
        max: 100,
        step: 1,
        unit: '%',
        defaultValue: 65,
        marks: sliderMarks(0, 100, '%')
      },
      {
        name: 'humidity3pm',
        label: 'Humidity at 3pm',
        min: 0,
        max: 100,
        step: 1,
        unit: '%',
        defaultValue: 52,
        marks: sliderMarks(0, 100, '%')
      },
      {
        name: 'pressure9am',
        label: 'Pressure at 9am',
        min: 990,
        max: 1040,
        step: 0.5,
        unit: 'hPa',
        decimals: 1,
        defaultValue: 1016,
        marks: sliderMarks(990, 1040, 'hPa')
      },
      {
        name: 'pressure3pm',
        label: 'Pressure at 3pm',
        min: 990,
        max: 1040,
        step: 0.5,
        unit: 'hPa',
        decimals: 1,
        defaultValue: 1013,
        marks: sliderMarks(990, 1040, 'hPa')
      },
      {
        name: 'cloud9am',
        label: 'Cloud Cover at 9am',
        min: 0,
        max: 8,
        step: 1,
        unit: 'oktas',
        defaultValue: 4,
        marks: sliderMarks(0, 8)
      },
      {
        name: 'cloud3pm',
        label: 'Cloud Cover at 3pm',
        min: 0,
        max: 8,
        step: 1,
        unit: 'oktas',
        defaultValue: 3,
        marks: sliderMarks(0, 8)
      }
    ]
  }
];

const metricFields = metricGroups.flatMap((group) => group.fields);

const initialMetricValues = metricFields.reduce((accumulator, field) => {
  accumulator[field.name] = field.defaultValue;
  return accumulator;
}, {});

const initialValues = {
  location: 'Sydney',
  rainToday: 'No',
  windGustDir: 'N',
  windDir9am: 'N',
  windDir3pm: 'N',
  ...initialMetricValues
};

const getTodayISODate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function WeatherForm() {
  const [form] = Form.useForm();
  const [prediction, setPrediction] = useState(null);
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBase = useMemo(
    () =>
      process.env.REACT_APP_API_URL ||
      (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''),
    []
  );

  const submitForm = async (values) => {
    setIsSubmitting(true);
    setRequestError('');

    const numericPayload = metricFields.reduce((accumulator, field) => {
      accumulator[field.name] = Number(values[field.name]);
      return accumulator;
    }, {});

    const payload = {
      date: getTodayISODate(),
      location: values.location,
      rainToday: values.rainToday,
      windGustDir: values.windGustDir,
      windDir9am: values.windDir9am,
      windDir3pm: values.windDir3pm,
      ...numericPayload
    };

    try {
      const response = await fetch(`${apiBase}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed with status ${response.status}`);
      }

      const result = await response.json();
      const normalized =
        typeof result.result === 'boolean'
          ? result.result
          : ['true', 'yes', '1', 'rain'].includes(String(result.result).toLowerCase());

      setPrediction(normalized);
    } catch (error) {
      setPrediction(null);
      setRequestError(
        'Unable to fetch prediction. Verify the API URL and backend status, then retry.'
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="surface-card form-shell">
      <div className="section-heading">
        <p className="content-kicker">Prediction Console</p>
        <Title level={2}>Rain Tomorrow Classifier</Title>
        <Paragraph>
          Enter the latest weather signals to estimate whether it will rain tomorrow.
          The model combines thermal, humidity, pressure and wind indicators.
        </Paragraph>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="weather-form"
        initialValues={initialValues}
        onFinish={submitForm}
      >
        <Card className="input-card" bordered={false}>
          <Title level={4}>Location & Direction Inputs</Title>
          <div className="form-top-grid">
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: 'Location is required.' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={localisations.map((location) => ({
                  value: location,
                  label: location
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Rain Today"
              name="rainToday"
              rules={[{ required: true, message: 'Please specify rain status for today.' }]}
            >
              <Select
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' }
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Wind Gust Direction"
              name="windGustDir"
              rules={[{ required: true, message: 'Wind gust direction is required.' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={directions.map((direction) => ({
                  value: direction,
                  label: direction
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Wind Direction at 9am"
              name="windDir9am"
              rules={[{ required: true, message: 'Wind direction at 9am is required.' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={directions.map((direction) => ({
                  value: direction,
                  label: direction
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Wind Direction at 3pm"
              name="windDir3pm"
              rules={[{ required: true, message: 'Wind direction at 3pm is required.' }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={directions.map((direction) => ({
                  value: direction,
                  label: direction
                }))}
              />
            </Form.Item>
          </div>
        </Card>

        {metricGroups.map((group) => (
          <Card key={group.title} className="input-card metric-group-card" bordered={false}>
            <div className="metric-group-header">
              <Title level={4}>{group.title}</Title>
              <Text>{group.description}</Text>
            </div>

            <Row gutter={[16, 16]}>
              {group.fields.map((field) => (
                <Col xs={24} sm={12} lg={8} key={field.name}>
                  <Card className="metric-card" bordered={false}>
                    <Form.Item
                      className="metric-form-item"
                      label={field.label}
                      name={field.name}
                      rules={[{ required: true, message: `${field.label} is required.` }]}
                    >
                      <Slider
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        marks={field.marks}
                        tooltip={{ formatter: (value) => `${value}${field.unit}` }}
                      />
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(previousValues, currentValues) =>
                        previousValues[field.name] !== currentValues[field.name]
                      }
                    >
                      {({ getFieldValue }) => {
                        const value = getFieldValue(field.name);
                        const isValidNumber = typeof value === 'number' && !Number.isNaN(value);
                        const formatted = isValidNumber
                          ? value.toFixed(field.decimals ?? 0)
                          : '--';

                        return (
                          <div className="metric-value">
                            <span>Current value</span>
                            <strong>
                              {formatted}
                              {field.unit}
                            </strong>
                          </div>
                        );
                      }}
                    </Form.Item>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        ))}

        <div className="submit-row">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="predict-button"
            loading={isSubmitting}
          >
            Predict Tomorrow
          </Button>
        </div>
      </Form>

      {requestError ? (
        <Alert
          className="prediction-alert"
          type="error"
          showIcon
          message={requestError}
        />
      ) : null}

      {prediction !== null ? (
        <div className={`prediction-banner ${prediction ? 'rainy' : 'dry'}`}>
          <p className="prediction-kicker">Prediction Result</p>
          <h3>{prediction ? 'Rain expected tomorrow.' : 'No rain expected tomorrow.'}</h3>
          <p>
            {prediction
              ? 'Prepare for wet conditions and possible precipitation events.'
              : 'Conditions currently indicate a mostly dry weather profile.'}
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default WeatherForm;
