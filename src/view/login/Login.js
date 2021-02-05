import React, { Component } from 'react'
import Particles from 'react-particles-js';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
 import './login.css'
export default class Login extends Component {
    render() {
        return (
            <div>
                <div style={{background:"url('/tupian.jpg')",width:"100%",height:"100%",backgroundSize:"100% 100%"}}>
                <Particles height={document.documentElement.clientHeight - 5 + 'px'}
                 params={{
                    "particles": {
                        "number": {
                            "value": 160,
                            "density": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 10,
                            "random": true
                        },
                        "move": {
                            "direction": "bottom",
                            "out_mode": "out"
                        },
                        "line_linked": {
                            "enable": false
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "remove"
                            }
                        },
                        "modes": {
                            "remove": {
                                "particles_nb": 10
                            }
                        }
                    }
                }} />
          


            <div className="login">
            <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                        </Form>

            </div>
            </div>
            </div>
        )
    }
    onFinish=(data)=>{
        // console.log("1111",data)
        axios.get(`http://localhost:7000/users?username=${data.username}&password=${data.password}&roleState=true`).then(res=>{
            // console.log(res.data)
            if(res.data.length>0){
                localStorage.setItem("token",JSON.stringify(res.data[0]))
                // console.log(this.props)
                this.props.history.push("/home")
            }else{
                message.error("用户名或者密码有错误")
            }
        })
    }
}
