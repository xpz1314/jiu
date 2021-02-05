import React, { Component } from 'react'
import { Statistic, Row, Col, Button } from 'antd'
import { List, Typography, Divider } from 'antd'
import axios from 'axios'
export default class Leixing extends Component {

state={
    data:[]
}

    componentDidMount(){
        axios.get("http://localhost:7000/fangjian").then(res=>{
            // console.log(res.data)
            this.setState({
                data:res.data
            })
        })
    }
    render() {
        // const data = [
        //     'Racing car sprays burning fuel into crowd.',
        //     'Japanese princess to wed commoner.',
        //     'Australian walks 100km after outback crash.',
        //     'Man charged over missing wedding girl.',
        //     'Los Angeles battles huge wildfires.',
        //   ];


        return (
            <div>
                <Row gutter={16} style={{height:"100px",marginLeft:"100px"}}>
                    <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                    </Col>
                    <Col span={12}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    <Button style={{ marginTop: 16 }} type="primary">
                        Recharge
                    </Button>
                    </Col>
                   
                </Row>,


                <Divider orientation="left">住户信息</Divider>
                    <List
                    header={<div>登记</div>}
                    footer={<div></div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                        <Typography.Text mark style={{marginRight:"30px"}}>房间：{item.title}</Typography.Text> <Typography.Text style={{marginRight:"30px"}}>姓名：{item.username}</Typography.Text>身份证件： {item.shenfen}
                        </List.Item>
                        )}
                        pagination={{pageSize:5}}   />
            </div>
        )
    }
}
