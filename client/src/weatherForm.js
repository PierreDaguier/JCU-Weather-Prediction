import React, { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Segmented,
  Select,
  Slider,
  Space,
  Typography
} from 'antd';

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

const simpleMetricNames = ['minTemp', 'maxTemp', 'windGustSpeed', 'humidity3pm'];

const locationProfiles = {
  tropical: new Set(['Darwin', 'Cairns', 'Townsville', 'Brisbane', 'GoldCoast', 'Katherine']),
  dry: new Set(['AliceSprings', 'Uluru', 'Woomera', 'Mildura', 'Cobar', 'Nhil', 'SalmonGums'])
};

const profileConfig = {
  tropical: {
    humidityBase: 78,
    pressureBase: 1008,
    cloudBase: 6,
    rainfallBase: 8,
    sunshineBase: 5,
    evaporationBase: 6,
    windBase: 30
  },
  dry: {
    humidityBase: 36,
    pressureBase: 1017,
    cloudBase: 2,
    rainfallBase: 1,
    sunshineBase: 10,
    evaporationBase: 9,
    windBase: 25
  },
  temperate: {
    humidityBase: 58,
    pressureBase: 1013,
    cloudBase: 4,
    rainfallBase: 3,
    sunshineBase: 7,
    evaporationBase: 5,
    windBase: 28
  }
};

const metricFields = metricGroups.flatMap((group) => group.fields);

const metricByName = metricFields.reduce((accumulator, field) => {
  accumulator[field.name] = field;
  return accumulator;
}, {});

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

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const toNumber = (value, fallback) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const getProfileType = (location) => {
  if (locationProfiles.tropical.has(location)) {
    return 'tropical';
  }

  if (locationProfiles.dry.has(location)) {
    return 'dry';
  }

  return 'temperate';
};

const buildSmartCompletion = (rawValues) => {
  const values = { ...initialValues, ...rawValues };
  const profileType = getProfileType(values.location);
  const profile = profileConfig[profileType];
  const rainy = values.rainToday === 'Yes';
  const autoDirection = values.windGustDir || 'N';

  const minTemp = clamp(
    toNumber(values.minTemp, initialValues.minTemp),
    metricByName.minTemp.min,
    metricByName.minTemp.max
  );

  const suggestedMaxTemp = rainy ? minTemp + 7 : minTemp + 12;
  const maxTemp = clamp(
    Math.max(toNumber(values.maxTemp, suggestedMaxTemp), minTemp + 1),
    metricByName.maxTemp.min,
    metricByName.maxTemp.max
  );

  const windGustSpeed = clamp(
    toNumber(values.windGustSpeed, profile.windBase + (rainy ? 6 : 0)),
    metricByName.windGustSpeed.min,
    metricByName.windGustSpeed.max
  );

  const humidity3pm = clamp(
    toNumber(values.humidity3pm, profile.humidityBase + (rainy ? 10 : -6)),
    metricByName.humidity3pm.min,
    metricByName.humidity3pm.max
  );

  const humidity9am = clamp(
    profile.humidityBase + (rainy ? 14 : 6),
    metricByName.humidity9am.min,
    metricByName.humidity9am.max
  );

  const rainfall = clamp(
    rainy ? profile.rainfallBase + humidity3pm * 0.12 : profile.rainfallBase * 0.25,
    metricByName.rainfall.min,
    metricByName.rainfall.max
  );

  const cloud3pm = clamp(
    rainy ? profile.cloudBase + 2 : profile.cloudBase - 1,
    metricByName.cloud3pm.min,
    metricByName.cloud3pm.max
  );

  const cloud9am = clamp(
    rainy ? profile.cloudBase + 1 : profile.cloudBase,
    metricByName.cloud9am.min,
    metricByName.cloud9am.max
  );

  const pressure3pm = clamp(
    rainy ? profile.pressureBase - 4 : profile.pressureBase + 1,
    metricByName.pressure3pm.min,
    metricByName.pressure3pm.max
  );

  const pressure9am = clamp(
    rainy ? profile.pressureBase - 2 : profile.pressureBase + 2,
    metricByName.pressure9am.min,
    metricByName.pressure9am.max
  );

  const sunshine = clamp(
    rainy ? profile.sunshineBase - 2 : profile.sunshineBase + 1,
    metricByName.sunshine.min,
    metricByName.sunshine.max
  );

  const evaporation = clamp(
    rainy
      ? profile.evaporationBase - 1
      : profile.evaporationBase + Math.max(0, (maxTemp - minTemp) * 0.25),
    metricByName.evaporation.min,
    metricByName.evaporation.max
  );

  const temp9am = clamp(minTemp + (rainy ? 1.5 : 2.8), metricByName.temp9am.min, metricByName.temp9am.max);
  const temp3pm = clamp(maxTemp - (rainy ? 1.8 : 1.2), metricByName.temp3pm.min, metricByName.temp3pm.max);

  const windSpeed9am = clamp(windGustSpeed * 0.45, metricByName.windSpeed9am.min, metricByName.windSpeed9am.max);
  const windSpeed3pm = clamp(windGustSpeed * 0.62, metricByName.windSpeed3pm.min, metricByName.windSpeed3pm.max);

  return {
    ...values,
    minTemp,
    maxTemp,
    windGustSpeed,
    humidity3pm,
    humidity9am,
    rainfall,
    cloud9am,
    cloud3pm,
    pressure9am,
    pressure3pm,
    sunshine,
    evaporation,
    temp9am,
    temp3pm,
    windSpeed9am,
    windSpeed3pm,
    windDir9am: autoDirection,
    windDir3pm: autoDirection
  };
};

const getTodayISODate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const normalizeApiBase = (value) => (value ? value.replace(/\/+$/, '') : '');

const getApiBase = () => {
  const configuredUrl = normalizeApiBase(process.env.REACT_APP_API_URL);

  if (configuredUrl) {
    return configuredUrl;
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080';
  }

  return '';
};

function WeatherForm() {
  const [form] = Form.useForm();
  const [prediction, setPrediction] = useState(null);
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputMode, setInputMode] = useState('simple');
  const [modeMessage, setModeMessage] = useState('');

  const apiBase = useMemo(() => getApiBase(), []);
  const predictionEndpoint = useMemo(
    () => (apiBase ? `${apiBase}/predict` : ''),
    [apiBase]
  );

  const applySmartProfile = () => {
    const completed = buildSmartCompletion(form.getFieldsValue(true));
    form.setFieldsValue(completed);
    setModeMessage('Advanced fields were auto-completed from climate profile and core inputs.');
  };

  const resetForm = () => {
    form.resetFields();
    form.setFieldsValue(initialValues);
    setPrediction(null);
    setRequestError('');
    setModeMessage('');
  };

  const submitForm = async (values) => {
    if (!predictionEndpoint) {
      setPrediction(null);
      setRequestError(
        'Prediction API not configured. Set REACT_APP_API_URL in Netlify environment variables and redeploy.'
      );
      return;
    }

    setIsSubmitting(true);
    setRequestError('');

    const baseValues = { ...initialValues, ...values };
    const completedValues =
      inputMode === 'simple' ? buildSmartCompletion(baseValues) : baseValues;

    if (inputMode === 'simple') {
      form.setFieldsValue(completedValues);
    }

    const numericPayload = metricFields.reduce((accumulator, field) => {
      accumulator[field.name] = Number(completedValues[field.name]);
      return accumulator;
    }, {});

    const payload = {
      date: getTodayISODate(),
      location: completedValues.location,
      rainToday: completedValues.rainToday,
      windGustDir: completedValues.windGustDir,
      windDir9am: completedValues.windDir9am,
      windDir3pm: completedValues.windDir3pm,
      ...numericPayload
    };

    try {
      const response = await fetch(predictionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Prediction endpoint did not return JSON.');
      }

      const result = await response.json();
      const normalizedResult =
        typeof result.result === 'boolean'
          ? result.result
          : ['true', 'yes', '1', 'rain'].includes(String(result.result).toLowerCase());

      const probability =
        typeof result.probability === 'number' ? result.probability : null;

      setPrediction({
        result: normalizedResult,
        probability,
        threshold: result.threshold,
        modelVersion: result.modelVersion || null
      });
    } catch (error) {
      setPrediction(null);
      const details =
        error instanceof Error ? ` Details: ${error.message}` : '';
      setRequestError(
        `Unable to fetch prediction. Verify backend status and REACT_APP_API_URL.${details}`
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMetricCard = (fieldName) => {
    const field = metricByName[fieldName];
    if (!field) {
      return null;
    }

    return (
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
    );
  };

  return (
    <section className="surface-card form-shell">
      <div className="section-heading">
        <p className="content-kicker">Prediction Console</p>
        <Title level={2}>Rain Tomorrow Classifier</Title>
        <Paragraph>
          Switch between Simple and Advanced modes. Simple mode auto-completes hidden
          model features to avoid manual entry of every variable.
        </Paragraph>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="weather-form"
        initialValues={initialValues}
        onFinish={submitForm}
      >
        <Card className="input-card mode-card" bordered={false}>
          <Space direction="vertical" size={10} className="mode-stack">
            <Title level={4}>Input Mode</Title>
            <Segmented
              value={inputMode}
              onChange={setInputMode}
              options={[
                { label: 'Simple', value: 'simple' },
                { label: 'Advanced', value: 'advanced' }
              ]}
            />
            <Text className="mode-helper">
              {inputMode === 'simple'
                ? 'Simple mode keeps only key inputs visible and auto-fills the rest.'
                : 'Advanced mode exposes all model features for full manual control.'}
            </Text>
            <Space wrap>
              <Button type="default" onClick={applySmartProfile}>
                Auto-complete Advanced Fields
              </Button>
              <Button onClick={resetForm}>Reset Defaults</Button>
            </Space>
            {modeMessage ? <Text className="mode-feedback">{modeMessage}</Text> : null}
          </Space>
        </Card>

        <Card className="input-card" bordered={false}>
          <Title level={4}>Location & Conditions</Title>
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

            {inputMode === 'advanced' ? (
              <>
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
              </>
            ) : null}
          </div>
        </Card>

        {inputMode === 'simple' ? (
          <Card className="input-card metric-group-card" bordered={false}>
            <div className="metric-group-header">
              <Title level={4}>Quick Weather Inputs</Title>
              <Text>
                These 4 inputs drive the prediction. Remaining model features are
                auto-completed using location climate profile.
              </Text>
            </div>

            <Row gutter={[16, 16]}>
              {simpleMetricNames.map((fieldName) => renderMetricCard(fieldName))}
            </Row>
          </Card>
        ) : (
          metricGroups.map((group) => (
            <Card key={group.title} className="input-card metric-group-card" bordered={false}>
              <div className="metric-group-header">
                <Title level={4}>{group.title}</Title>
                <Text>{group.description}</Text>
              </div>

              <Row gutter={[16, 16]}>
                {group.fields.map((field) => renderMetricCard(field.name))}
              </Row>
            </Card>
          ))
        )}

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
        <div className={`prediction-banner ${prediction.result ? 'rainy' : 'dry'}`}>
          <p className="prediction-kicker">Prediction Result</p>
          <h3>{prediction.result ? 'Rain expected tomorrow.' : 'No rain expected tomorrow.'}</h3>
          <p>
            {prediction.result
              ? 'Prepare for wet conditions and possible precipitation events.'
              : 'Conditions currently indicate a mostly dry weather profile.'}
          </p>
          {typeof prediction.probability === 'number' ? (
            <p>
              Model confidence: {(prediction.probability * 100).toFixed(1)}% (threshold {prediction.threshold})
              {prediction.modelVersion ? ` - ${prediction.modelVersion}` : ''}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default WeatherForm;
