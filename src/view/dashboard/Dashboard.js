import React, { Component } from 'react'
import TopHeader from './TopHeader'
import SideMenu from './SideMenu'
import {Route,Redirect,Switch} from 'react-router-dom'
import Home from './home/Home'
import Yonghu from './yonghu/Yonghu'
import Juese from './quanxian/Juese'
import Quanxian from './quanxian/Quanxian'
import Leixing from './fangjian/Leixing'
import Yiding from './fangjian/Yiding'
import NoPermission from './nopermission/NoPermission'
import './Dashboard.css'
import {Layout, Breadcrumb } from 'antd';
import axios from 'axios'
const { Content , Footer} = Layout;

const routes = [
    {
        title:"首页",
        path:"/home",
        component:Home
    },
    {
        title:"用户列表",
        path:"/Yonghu/yonghu",
        component:Yonghu
    },
    {
        title:"角色列表",
        path:"/Quanxian/juese",
        component:Juese
    },
    {
        title:"权限列表",
        path:"/Quanxian/quanxian",
        component:Quanxian
    },
    {
        title:"已订房间",
        path:"/Fangjian/yiding",
        component:Yiding
    },
    {
        title:"房间信息",
        path:"/Fangjian/leixing",
        component:Leixing
    },
   

]

export default class Dashboard extends Component {

state={
    rights:[]
}
current=null


componentDidMount() {
    axios.get("http://localhost:7000/rights").then(res=>{
            this.setState({
                rights:res.data
            })
    })


    this.current = JSON.parse(localStorage.getItem("token"))
}


checkPermission=(title)=>{
    let list = this.state.rights.filter(item=>item.title===title)

    return list[0].grade.includes(this.current.roleType)
}

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    
                    <TopHeader></TopHeader>
                    <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 600}}>
                    <Switch>
                       {
                           (this.state.rights.length!==0)&&routes.map(item=>this.checkPermission(item.title)&&<Route path={item.path} component={item.component} key={item.path}/>)
                       }

                        <Redirect from ="/" to="/home" exact/>
                        <Route path="*" component={NoPermission}/>
                    </Switch>
                    </div>
                    
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>@2021系统</Footer>
               </Layout>
            </Layout>
            
        )
    }
}
