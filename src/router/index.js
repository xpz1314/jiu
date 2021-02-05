import React, { Component } from 'react'
import {HashRouter,Redirect,Route,Switch} from 'react-router-dom'
import Login from '../view/login/Login'
import Dashboard from '../view/dashboard/Dashboard'

export default class Myrouetr extends Component {
    render() {
        return (
           <HashRouter>
               <Switch>
                   <Route path="/login" component={Login}/>
                   {/* 拦截 */}
                  <Route path="/" render={
                      ()=>localStorage.getItem("token")
                      ?
                      <Dashboard/>
                      :
                      <Redirect to = "/login"/>
                  }/>
               </Switch>
           </HashRouter>
        )
    }
}
