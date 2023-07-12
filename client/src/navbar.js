import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from "react-router-dom";
const { Header } = Layout;

function Navbar() {
  return (
    <Header style={{ position: 'relative', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" className="navbar" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
            <Link to="/">Weather Prediction</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/documentation">Documentation</Link>
          </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;