import React, { Component } from 'react'
import { Layout, Menu, } from 'antd';
import menus from '../../util/menus'
import {withRouter} from "react-router"
import axios from 'axios'

const {Sider} =Layout;
const { SubMenu } = Menu;

 class SideMenu extends Component {

    state = {
        collapsed:false,
        rights:[]
    }
    current=null
    componentDidMount() {
        axios.get("http://localhost:7000/rights").then(res=>{
            // console.log(res.data)
            this.setState({
                rights:res.data
            })
        })

        this.current=JSON.parse(localStorage.getItem("token"))
    }
    onCollapse=()=>{
        this.setState({
            collapsed:!this.state.collapsed
        })
    }
    

    render() {
        console.log(this.props.location.pathname)
        const openKey = ["/"+this.props.location.pathname.split("/")[1]]
        const selectedkeys = [this.props.location.pathname]
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <div className="logo" style={{ textAlign: 'center', fontSize: "20px", color: "white" }}>酒店前台系统</div>
            <Menu theme="dark" defaultSelectedKeys={selectedkeys} defaultOpenKeys={openKey} mode="inline">
              
            {
              (this.state.rights.length!==0 ) &&  this.renderMenus(menus)
            }
            </Menu>
          </Sider>
        )
    }

    checkPermission=(title)=>{
        // console.log(title)

        let list = this.state.rights.filter(item=>item.title===title)
        // console.log(list)

        // console.log(list[0].grade.includes(this.current.roleType))
        if(list.length===0) return false
        return list[0].grade.includes(this.current.roleType)
    }

    renderMenus=(menus)=>{
        // console.log(menus)
        return menus.map(item=>{
            if(item.children){
                if(!this.checkPermission(item.title)){
                    return null
                }
              return  <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {this.renderMenus(item.children)}
              </SubMenu>
            }else{
                if(!this.checkPermission(item.title)){
                    return null
                }
                return <Menu.Item key={item.key} icon={item.icon} onClick={()=>{
                   this.props.history.push(item.key)
                }}>{item.title}</Menu.Item>
            }
        })
    }
}
export default withRouter(SideMenu)