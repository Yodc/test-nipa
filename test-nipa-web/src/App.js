import React from 'react';
import { useState } from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Button, Layout, Menu, Modal, Form, Input, Spin, notification, Space, Image, Select } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PushpinOutlined,
  WalletOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
  CrownOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Link,
} from "react-router-dom";
import './App.less'
import PageHome from './pages/home';


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu

class MySider extends React.Component {
  
  state = {
    collapsed: true,
    auth: null,
    visibleModelCreate: false,
    visibleModelSignUp: false,
    visibleModelForget: false,
    loadingPage: false
  };
  dropdownRoomByStatus = []

  toggle = () => {
    this.setState({
      ...this.state,
      collapsed: !this.state.collapsed,
    });
  };

  

  render() {
    return (
      <>
        <Router basename={process.env.REACT_APP_BASENAME}>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}>
              
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
              >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <NavLink to="/home">หน้าหลัก</NavLink>
                </Menu.Item>

              </Menu>

              <div style={{ textAlign: "center", paddingTop: "20px" }}>
                <a onClick={async () => {
                 

                }}
                >
                  <LogoutOutlined /> Log out
                </a>
              </div>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#001529'}}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger IconT',
                  onClick: this.toggle,
                })}
                {
                  JSON.parse(localStorage.getItem('auth')) == null ?
                    // <span style={{ float: 'right', paddingRight: 10 }}>
                    <Space style={{ float: 'right', paddingRight: 20, display: 'block ruby' }} wrap>
                      <Button
                        icon={<UserAddOutlined />}
                        style={{ marginLeft: 5 }}
                        onClick={async() => {
                          if(this.formCreate){
                            this.formCreate.resetFields()
                          }
                          this.setState({
                            ...this.state,
                            visibleModelSignUp: true
                          })
                        }}
                      >
                        Sign Up
                      </Button>
                      <Button
                        type='primary'
                        icon={<LoginOutlined />}
                        style={{ marginLeft: 5 }}
                        onClick={() => {
                          if(this.formLogin){
                            this.formLogin.resetFields()
                          }
                          this.setState({
                            ...this.state,
                            visibleModelCreate: true
                          })
                        }}
                      >
                        Sign In
                      </Button>
                      {/* // </span> */}
                    </Space>
                    :
                    <div  style={{ float: 'right', paddingRight: 50, width: 200, textAlign: 'right' ,color: '#a6adb4'}}>
                      {JSON.parse(localStorage.getItem('auth')).user.user_full_name}
                    </div>
                }

              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 'auto',
                }}
              >
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <PageHome />
                    }
                  />
                  <Route
                    exact
                    path="/home"
                    element={
                      <PageHome />
                    }
                  />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </>
    );
  }
}

function App() {

  return (
    <>
      <MySider />
    </>
  );
}


export default App;
