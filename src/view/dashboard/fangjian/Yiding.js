import React, { Component } from 'react'
import { Row, Col, Divider,Form,Input,Modal, Button } from 'antd';
import axios from 'axios'

export default class Yiding extends Component {


    state={
        list:[],
        twovisible:false,
        visible:false
    }
current=null
    form = React.createRef()
    upfrom = React.createRef()
    componentDidMount() {
        // console.log(this.form)
        axios.get("http://localhost:7000/fangjian").then(res=>{
            // console.log(res.data)
            this.setState({
                list:res.data
            })
            // console.log(this.state.list)
        })
        
    }
    

    handlestyle=(item)=>{
       
//  console.log(item)
   this.current=item
       if(item.default){
         setTimeout(() => {
            this.setState({
                visible:true
            })
 
            this.form.current.setFieldsValue({
                 title:item.title,
                username:item.username,
                shenfen:item.shenfen
            })
         }, 0);

        // console.log(this.form)
       }
    }


    handleUp=()=>{
        this.setState({
            visible:false
        })
    }

    handleQue=()=>{
        this.form.current.validateFields().then(res=>{
        let putlist={
            ...this.current,
            title:res.title,
            username:res.username,
            shenfen:res.shenfen
        }
        console.log(putlist)
        this.setState({
            list:this.state.list.map(item=>{
                if(item.id===putlist.id){
                    return putlist
                }
                return item
            }),
            visible:false
        })

        axios.put(`http://localhost:7000/fangjian/${putlist.id}`,putlist)
        })
    }

    okupfrom=()=>{
        this.upfrom.current.validateFields().then(res=>{
            let resdata={
                ...this.current,
                "title":res.title,
                "username":res.username,
                "shenfen":res.shenfen,
                "default":true
            }
            console.log(resdata)

            this.setState({
                list:this.state.list.map(item=>{
                    if(item.title===resdata.title){
                        return resdata
                    }
                    return item
                }),
                twovisible:false
            })

            axios.put(`http://localhost:7000/fangjian/${resdata.title}`,resdata)
        })
    }

    render() {

        const style = { background: '#0092ff', padding: '10px 0' ,textAlign:"center"};


        const style1= { background: '#808080', padding: '10px 0' ,textAlign:"center"};

        return (
            <div>
               
                   
                   
                    <Divider orientation="left">全部房间</Divider>
                    <Row gutter={[16, 24]}>

                        {
                            this.state.list.map((item,index)=> <Col className="gutter-row" span={2} key={index}>
                            <div style={item.default?style:style1} 
                            onClick={
                            ()=>{this.handlestyle(item)}
                            }>{item.title}</div>
                        </Col>)
                        }
                    </Row>
                        <Button type="primary" style={{marginTop:"100px"}} onClick={()=>{
                            this.setState({
                                twovisible:true
                            })
                        }}>办理入住</Button>
                    

                    <Modal
                    visible={this.state.visible}
                    title="房间信息"
                    okText="取消"
                    cancelText="确认"
                    onCancel={()=>{
                        this.handleQue()
                    }}
                    onOk={() => {
                        this.handleUp()
                        
                    }}
                    >
                    <Form
                        ref={this.form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item
                        name="title"
                        label="房间号"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                        name="username"
                        label="姓名"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                        name="shenfen"
                        label="身份证件"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                        <Input />
                        </Form.Item>
                    </Form>
                     </Modal>


                     <Modal
                    visible={this.state.twovisible}
                    title="添加房间"
                    okText="取消"
                    cancelText="确认"
                    onCancel={()=>{
                        this.okupfrom()
                    }}
                    onOk={() => {
                        this.setState({
                            twovisible:false
                        })
                        
                    }}
                    >
                    <Form
                        ref={this.upfrom}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item
                        name="title"
                        label="房间号"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                        name="username"
                        label="姓名"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                        name="shenfen"
                        label="身份证件"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                        <Input />
                        </Form.Item>
                    </Form>
                     </Modal>
            </div>
        )
    }
}
