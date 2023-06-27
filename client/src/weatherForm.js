import React, { useState } from 'react';

import { Layout, Menu, Form, Input, Button, Select, DatePicker, Typography } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;



const directions = ['N','NE','E','SE','S','SW','W','NW']; 


  function WeatherForm() {
    const [form] = Form.useForm();
    const [prediction, setPrediction] = useState(null);
  
    const submitForm = (values) => {
        const payload = {
            ...values,
            date: values.date.format("YYYY-MM-DD"),
            minTemp: parseFloat(values.minTemp),
            maxTemp: parseFloat(values.maxTemp),
            rainfall: parseFloat(values.rainfall),
            evaporation: parseFloat(values.evaporation),
            sunshine: parseFloat(values.sunshine),
            windGustSpeed: parseFloat(values.windGustSpeed),
            windDir9am: values.windDir9am,
            windDir3pm: values.windDir3pm,
            windSpeed9am: parseFloat(values.windSpeed9am),
            windSpeed3pm: parseFloat(values.windSpeed3pm),
            humidity9am: parseFloat(values.humidity9am),
            humidity3pm: parseFloat(values.humidity3pm),
            pressure9am: parseFloat(values.pressure9am),
            pressure3pm: parseFloat(values.pressure3pm),
            cloud9am: parseFloat(values.cloud9am),
            cloud3pm: parseFloat(values.cloud3pm),
            temp9am: parseFloat(values.temp9am),
            temp3pm: parseFloat(values.temp3pm),
          }
        console.log(payload)
      fetch("http://localhost:8080/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => setPrediction(data.result))
        .catch(error => console.log(error));

      form.resetFields();
    };
  return (

    
    <div>

  <div>

        

<Layout>
<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><AppstoreOutlined />Weather Prediction</Menu.Item>
        <Menu.Item key="2"><AppstoreOutlined />Documentation</Menu.Item>
    </Menu>
</Header>
<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Title level={2}>Weather Prediction Form</Title>
        <p>This form uses machine learning to predict whether it will rain tomorrow based on the weather data you input.</p>
        <Form onFinish={submitForm} layout="vertical" form={form}>
        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      <Form.Item label="Location" name="location" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Wind Gust Direction" name="windGustDir" rules={[{ required: true }]}>
        <Select>
          {directions.map(dir => <Option key={dir} value={dir}>{dir}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="Wind Direction 9am" name="windDir9am" rules={[{ required: true }]}>
        <Select>
          {directions.map(dir => <Option key={dir} value={dir}>{dir}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="Wind Direction 3pm" name="windDir3pm" rules={[{ required: true }]}>
        <Select>
          {directions.map(dir => <Option key={dir} value={dir}>{dir}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label="Min Temp" name="minTemp" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Max Temp" name="maxTemp" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Rainfall" name="rainfall" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Evaporation" name="evaporation" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Sunshine" name="sunshine" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Wind Gust Speed" name="windGustSpeed" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Wind Speed 9am" name="windSpeed9am" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Wind Speed 3pm" name="windSpeed3pm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Humidity 9am" name="humidity9am" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Humidity 3pm" name="humidity3pm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Pressure 9am" name="pressure9am" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Pressure 3pm" name="pressure3pm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Cloud 9am" name="cloud9am" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Cloud 3pm" name="cloud3pm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Temp 9am" name="temp9am" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Temp 3pm" name="temp3pm" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Rain Today" name="rainToday" rules={[{ required: true }]}>
        <Select>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Predict</Button>
      </Form.Item>

      {prediction && (
        <Form.Item label="Prediction">
          <Input disabled value={prediction} />
        </Form.Item>
      )}
    </Form>
    </div>
</Content>
<Footer style={{ textAlign: 'center' }}>Weather Prediction ©2023 Created by Your Name</Footer>
</Layout>

{prediction && <p>The weather prediction is: {prediction===true?"Rain tomorrow":"No Rain tomorrow"}</p>}
  </div>
    </div>

  );
}

export default WeatherForm;
