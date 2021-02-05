import React, { Component } from 'react'
import { Layout} from 'antd';
import { Avatar } from 'antd';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
const { Header} = Layout;


 class TopHeader extends Component {
    render() {
        // console.log(JSON.parse(localStorage.getItem("token")))
        const users = JSON.parse(localStorage.getItem("token"))
        const menu = (
            <Menu>
              <Menu.Item>
               {users.roleName}
              </Menu.Item>
              <Menu.Item style={{color:"orange"}} onClick={()=>{
                  localStorage.removeItem("token")
                  this.props.history.push("/login")
              }}>
               退出
              </Menu.Item>
            </Menu>
          );
        return (
            <Header className="site-layout-background" style={{ padding: 0 ,background:"-webkit-linear-gradient(left,orange,white,#fcc,lightblue,#df7,pink,skyblue)"}} >
                <h3 style={{lineHeight:"64px",textAlign:"center"}}>欢迎来到xx酒店
                <div style={{float:"right"}}> 
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar size={40}style={{ backgroundColor: '#87d068' ,marginRight:"18px"}} icon={<UserOutlined />}  />
                </Dropdown>
                    
                    </div>
                </h3>
               
            </Header>
        )
    }
}

export default withRouter (TopHeader)
