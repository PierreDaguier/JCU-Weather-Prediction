import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Card, Layout, Select, Typography, Menu } from 'antd';

import Introduction from './components/Introduction';
import ToolDescription from './components/ToolDescription';
import AboutDataset from './components/AboutDataset';
import AboutPredictionModel from './components/AboutPredictionModel';
import TechnicalDescription from './components/TechnicalDescription';

import './App.css'
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

function Documentation() {
  const [videoSrc, setVideoSrc] = useState("/default-background.mp4");
  const [current, setCurrent] = useState('introduction');
  // Utilisation de setVideoSrc dans un effet
  useEffect(() => {
    setVideoSrc("/default-background.mp4");
  }, []); // Les crochets vides indiquent que cet effet ne dépend d'aucune variable et ne sera exécuté qu'au montage du composant.

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Layout style={{background:'transparent'}}>
        <div className='body'>
               <video key={videoSrc} autoPlay loop muted className='video' src={videoSrc} type="video/mp4" />
           <style>
             @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Playfair+Display&display=swap');
           </style> 
           <style>
             @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
           </style> 
        <div style={{padding: 24}}> 
        <Card className='custom-content menu' style={{ marginTop: 64, paddingLeft:60 }}>
          <Sider width={1} className="site-layout-background">
            <Menu
                theme='dark'
              mode="inline"
              onClick={handleClick}
              selectedKeys={[current]}
              style={{ 
                position:'fixed',
                width: '24vh',
                marginLeft:'5px',
                marginTop:'30px', 
                borderRight: 0,
                borderRadius:10, 
                backgroundColor: 'rgba(13, 115, 186, 0.9)' , 
                color:'white',
                fontFamily: "Open Sans",
                fontSize: 16,
                
              }}
            >
              <Menu.Item style={{border: '1px solid white', fontFamily: 'Playfair Display', height: '50px', marginTop:'5px'}} key="introduction">Introduction</Menu.Item>
              <Menu.Item style={{border: '1px solid white', fontFamily: 'Playfair Display', height: '50px'}} key="tool">Tool Description</Menu.Item>
              <Menu.Item style={{border: '1px solid white',fontFamily: 'Playfair Display', height: '50px'}} key="dataset">About Dataset</Menu.Item>
              <Menu.Item style={{border: '1px solid white',fontFamily: 'Playfair Display', height: '50px'}} key="model">About Prediction Model</Menu.Item>
              <Menu.Item style={{border: '1px solid white',fontFamily: 'Playfair Display', height: '50px'}} key="technical">Technical Description</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ background: 'transparent', padding: '0 24px 24px' }}>
            
            <Content
            className="site-layout-background"
            style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            }}
            >
            {(() => {
            switch (current) {
                case 'introduction': return <Introduction />;
                case 'tool': return <ToolDescription />;
                case 'dataset': return <AboutDataset />;
                case 'model': return <AboutPredictionModel />;
                case 'technical': return <TechnicalDescription />;
                default: return null;
            }
            })()}
            </Content>
            
          </Layout>
        </Card>
        </div>
        </div>
      </Layout>
    </div>
  );
}

export default Documentation;
