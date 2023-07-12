import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './navbar';
import { Card, Layout, Form, Button, Slider, Select, Typography, Row, Col } from 'antd';

import './App.css'
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;



const localisations = [
  "Albury",
  "BadgerysCreek", 
  "Cobar", 
  "CoffsHarbour",
  "Moree", 
  "Newcastle", 
  "NorahHead", 
  "NorfolkIsland", 
  "Penrith", 
  "Richmond", 
  "Sydney", 
  "SydneyAirport", 
  "WaggaWagga", 
  "Williamtown", 
  "Wollongong",
  "Canberra", 
  "Tuggeranong", 
  "MountGinini", 
  "Ballarat", 
  "Bendigo", 
  "Sale", 
  "MelbourneAirport", 
  "Melbourne", 
  "Mildura", 
  "Nhil", 
  "Portland",
  "Watsonia", 
  "Dartmoor", 
  "Brisbane", 
  "Cairns", 
  "GoldCoast", 
  "Townsville", 
  "Adelaide", 
  "MountGambier", 
  "Nuriootpa", 
  "Woomera", 
  "Albany", 
  "Witchcliffe", 
  "PearceRAAF", 
  "PerthAirport", 
  "Perth", 
  "SalmonGums", 
  "Walpole", 
  "Hobart", 
  "Launceston", 
  "AliceSprings",
  "Darwin", 
  "Katherine", 
  "Uluru"
]

const directions = [
  "W", 
  "WNW", 
  "WSW", 
  "NE", 
  "NNW", 
  "N", 
  "NNE", 
  "SW",
  "nan",
  "ENE",
  "SSE",
  "S", 
  "NW",
  "SE",
  "ESE", 
  "E", 
  "SSW"
]; 

const dateTime = new Date();
const year = dateTime.getFullYear();
const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Les mois commencent à 0 en JS, donc nous ajoutons 1
const day = ('0' + dateTime.getDate()).slice(-2);


  function WeatherForm() {
    const [form] = Form.useForm();
    const [prediction, setPrediction] = useState(null);

  const [videoSrc, setVideoSrc] = useState("/default-background.mp4");
    useEffect(() => {

      if (prediction === true) {
        setVideoSrc("/rain-background.mp4");
      } else if (prediction === false) {
        setVideoSrc("/sunny-background.mp4");
      } else {
        setVideoSrc("/default-background.mp4");
      }

    }, [prediction]);
    useEffect(() => {
      console.log("videoSrc changed:", videoSrc);
    }, [videoSrc]);
        
    const submitForm = (values) => {
        const payload = {
            ...values,
            date: `${year}-${month}-${day}`,
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
    
      //form.resetFields();
    };
  return (

    
    <div>

  <div>

        

<Layout style={{ background: 'transparent' }}>
<div className='body'>
<video key={videoSrc} autoPlay loop muted className='video' src={videoSrc} type="video/mp4" />
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Playfair+Display&display=swap');
</style> 
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
</style> 

<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
  <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
  <Card className="custom-card">
    <Title style={{ fontFamily: 'Playfair Display'}} level={2}>Weather Prediction Tool</Title>
      <p style={{ fontFamily: 'Playfair Display'}}>This form uses machine learning to predict whether it will rain tomorrow based on the weather data you input.</p>
      <Form onFinish={submitForm} layout="vertical" className="form" form={form}>
        <Row  justify="start"
              align="middle"
        >
          <div className="left_col">
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>  
            <div>
             <Row  className="row" 
                   justify="start"
                   align="middle"
             >
                
              <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="dropdown_col">
        
        
      <Form.Item label="Location" name="location" rules={[{ required: true }]}>
        <Select>
          {localisations.map(dir => <Option key={dir} value={dir}>{dir}</Option>)}
        </Select>
      </Form.Item>
      
      <Form.Item label="Rain Today" name="rainToday" rules={[{ required: true }]}>
        <Select>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
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
      </div>
              </Col>
      
              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
                <Form.Item label="Min Temp (°C)" name="minTemp" rules={[{ required: true }]}>
                  <div className="sliderUnit">
                  <Slider 
                    min={-10}
                    max={50}
                    onChange={(value) => form.setFieldsValue({ minTemp: value })}
                    marks={{
                      "-10": '-10',
                      0: '0',
                      10: '10',
                      20: '20',
                      30: '30',
                      40: '40',
                      50: '50'
                    }}
                    vertical
                    className='slider'
                  />
                  </div>
                </Form.Item>
              </Col>

              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
                <Form.Item label="Max Temp (°C)" name="maxTemp" rules={[{ required: true }]}>
                <div className="sliderUnit">
                <Slider
                    min={-10}
                    max={50}
                    onChange={(value) => form.setFieldsValue({ maxTemp: value })}
                    marks={{
                      "-10": '-10',
                      0: '0',
                      10: '10',
                      20: '20',
                      30: '30',
                      40: '40',
                      50: '50'
                    }}
                    vertical
                    className='slider'
                  />
                  </div>
                </Form.Item>
              </Col>
              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
            <Form.Item label="Rainfall (mm)" name="rainfall" rules={[{ required: true }]}>
            <div className="sliderUnit">
            <Slider
                min={0.0}
                max={400.0}
                onChange={(value) => form.setFieldsValue({ rainfall: value })}
                marks={{
                  0.0: '0',
                  40.0: '40',
                  80.0: '80',
                  120.0: '120',
                  160.0: '160',
                  200.0: '200',
                  240.0: '240',
                  280.0: '280',
                  320.0: '320',
                  360.0: '360',
                  400.0: '400' 
                }}
                vertical
                className='slider'
              />
              </div>
            </Form.Item>
              </Col>
              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
            <Form.Item label="Evaporation (mm)" name="evaporation" rules={[{ required: true }]}>
            <div className="sliderUnit">
            <Slider
                min={0}
                max={150}
                onChange={(value) => form.setFieldsValue({ evaporation: value })}
                marks={{
                  0: '0',
                  15: '15',
                  30: '30',
                  45: '45',
                  60: '60',
                  75: '75',
                  90: '90',
                  105: '105',
                  120: '120',
                  135: '135',
                  150: '150'
                }}
                vertical
                className='slider'
              />
              </div>
            </Form.Item>
              </Col>
          
              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
            <Form.Item label="Sunshine (h)" name="sunshine" rules={[{ required: true }]}>
            <div className="sliderUnit">
            <Slider
                min={0.0}
                max={15}
                onChange={(value) => form.setFieldsValue({ sunshine: value })}
                marks={{
                  0: '0',
                  1: '1',
                  2: '2',
                  3: '3',
                  4: '4',
                  5: '5',
                  6: '6',
                  7: '7',
                  8: '8',
                  9: '9',
                  10: '10',
                  11: '11',
                  12: '12',
                  13: '13',
                  14: '14',
                  15: '15'
                }}
                vertical
                className='slider'
              />
              </div>
            </Form.Item>
              </Col>

              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
                <Form.Item label="Wind Gust Speed (km/h)" name="windGustSpeed" rules={[{ required: true }]}>
                <div className="sliderUnit">
                <Slider
                    min={0}
                    max={100}
                    onChange={(value) => form.setFieldsValue({ windGustSpeed: value })}
                    marks={{
                      0: '0',
                      10: '10',
                      20: '20',
                      30: '30',
                      40: '40',
                      50: '50',
                      60: '60',
                      70: '70',
                      80: '80',
                      90: '90',
                      100: '100'
                    }}
                    vertical
                    className='slider'
                  />
                  </div>
                </Form.Item>
              </Col>
              <Col xxl={2} xl={2} lg={2} md={6} sm={8} xs={12}>
                    
                <Form.Item label="Wind Speed 9am (km/h)" name="windSpeed9am" rules={[{ required: true }]}>
                <div className="sliderUnit">
                <Slider
                    min={0}
                    max={100}
                    onChange={(value) => form.setFieldsValue({ windSpeed9am: value })}
                    marks={{
                      0: '0',
                      10: '10',
                      20: '20',
                      30: '30',
                      40: '40',
                      50: '50',
                      60: '60',
                      70: '70',
                      80: '80',
                      90: '90',
                      100: '100'
                    }}
                    vertical
                    className='slider'
                  />
                  </div>
                </Form.Item>
              </Col>
      
            </Row>
            <Row className="row" 
                 justify="start"
                 align="middle"
            >
              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>

    <Form.Item label="Wind Speed 3pm (km/h)" name="windSpeed3pm" rules={[{ required: true }]}>
    <div className="sliderUnit">
      <Slider
        min={0}
        max={100}
        onChange={(value) => form.setFieldsValue({ windSpeed3pm: value })}
        marks={{
          0: '0',
          10: '10',
          20: '20',
          30: '30',
          40: '40',
          50: '50',
          60: '60',
          70: '70',
          80: '80',
          90: '90',
          100: '100'
        }}
        vertical
        className='slider'
      
      />
      </div>
    </Form.Item>
              </Col>
      
              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Humidity 9am" name="humidity9am" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={0}
          max={100}
          onChange={(value) => form.setFieldsValue({ humidity9am: value })}
          marks={{
            0: '0%',
            10: '10%',
            20: '20%',
            30: '30%',
            40: '40%',
            50: '50%',
            60: '60%',
            70: '70%',
            80: '80%',
            90: '90%',
            100: '100%'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>

              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Humidity 3pm" name="humidity3pm" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={0}
          max={100}
          onChange={(value) => form.setFieldsValue({ humidity3pm: value })}
          marks={{
            0: '0%',
            10: '10%',
            20: '20%',
            30: '30%',
            40: '40%',
            50: '50%',
            60: '60%',
            70: '70%',
            80: '80%',
            90: '90%',
            100: '100%'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Pressure 9am (hPa)" name="pressure9am" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={990}
          max={1040}
          onChange={(value) => form.setFieldsValue({ pressure9am: value })}
          marks={{            
            990: '990',
            1000: '1000',
            1010: '1010',
            1020: '1020',
            1030: '1030',
            1040: '1040'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Pressure 3pm (hPa)" name="pressure3pm" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={990}
          max={1040}
          onChange={(value) => form.setFieldsValue({ pressure3pm: value })}
          marks={{            
            990: '990',
            1000: '1000',
            1010: '1010',
            1020: '1020',
            1030: '1030',
            1040: '1040'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>

              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Cloud 9am (oktas)" name="cloud9am" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={0}
          max={8}
          onChange={(value) => form.setFieldsValue({ cloud9am: value })}
          marks={{
            0: '0',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>

              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Cloud 3pm (oktas)" name="cloud3pm" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={0}
          max={8}
          onChange={(value) => form.setFieldsValue({ cloud3pm: value })}
          marks={{
            0: '0',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Temp 9am (°C)" name="temp9am" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={-10}
          max={50}
          onChange={(value) => form.setFieldsValue({ temp9am: value })}
          marks={{
            "-10": '-10',
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            50: '50'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={6} sm={12} xs={24}>
      <Form.Item label="Temp 3pm (°C)" name="temp3pm" rules={[{ required: true }]}>
      <div className="sliderUnit">
      <Slider
          min={-10}
          max={50}
          onChange={(value) => form.setFieldsValue({ temp3pm: value })}
          marks={{
            "-10": '-10',
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            50: '50'
          }}
          vertical
          className='slider'
        />
        </div>
      </Form.Item>
              </Col>
            </Row>
            </div>

          </Col>
            </div>
            <div className="right_col">
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={{textAlign: 'center'}}>
              <Row justify="center" align="top">
                
              <Form.Item>
                <Button type="primary" shape="round" className='button' htmlType="submit">Predict</Button>
              </Form.Item>
            </Row>

            {prediction !== null && 
              <Row justify="center" align="top" style={{marginTop: '20px'}}>
                <Card title="Tomorrow's Weather" className="custom-card-result" >
                  <p>{prediction ? "It's going to rain tomorrow." : "Tomorrow should be a sunny day !"}</p>
                </Card>
              </Row>
            }
              </Col>
            </div>
      </Row>      
    </Form>
    </Card>
    </div>
</Content>
<Footer style={{ textAlign: 'center' }}>Weather Prediction ©2023 Created by Pierre Daguier</Footer>
</div>
</Layout>

  </div>
    </div>

  );
}

export default WeatherForm;
