import React, { Component } from 'react'
import { Table ,Tag,Button,Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'


export default class Quanxian extends Component {

    state={
        dataSource:[]
    }

     columns = [
        {
          title: '#',
          dataIndex: 'id',
          render:(id)=>{
              return <b>{id}</b>
          }
        },
        {
          title: '权限名称',
          dataIndex: 'title',
        },
        {
          title: '权限级别',
          dataIndex: 'grade',
          render:(grade)=>{
              const colorlist = ["#2db7f5","#87d068","#f50"]
              return grade.map((item,index)=><Tag key={index} color={colorlist[item-1]}></Tag>)
          }
        },
        {
            title: '权限操作',
            render:(item)=>{
                // console.log(item)
                return <div>
                    <Button danger onClick={()=>{
                         Modal.confirm({
                            title: 'Confirm',
                            icon: <ExclamationCircleOutlined />,
                            content: '你确定删除么...',
                            okText: '确认',
                            cancelText: '取消',
                            onOk:()=>{
                                this.deleteMyRightItem(item.id)
                            }
                          });
                    }}>delete</Button>
                    <Button type="primary" style={{marginLeft:"5px"}} onClick={()=>{
                        Modal.confirm({
                            title: 'Confirm',
                            icon: <ExclamationCircleOutlined />,
                            content: '你确定更新么...',
                            okText: '确认',
                            cancelText: '取消',
                            onOk:()=>{
                               
                            }
                          });
                    }}>renew</Button>
                </div>
            }
          },
          
      ];

      deleteMyRightItem = (id) =>{
            this.setState({
                dataSource:this.state.dataSource.filter(item=>item.id!==id)
            })

            axios.delete(`http://localhost:7000/rights/${id}`)
      }
      


      componentDidMount() {
          axios.get("http://localhost:7000/rights").then(res=>{
            // console.log(res.data)
            this.setState({
                dataSource:res.data
               
            })
            // console.log(this.state.dataSource)
          }
              
          )
      }
      
      
   
    render() {
        return (
            <div>
            <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} pagination={{pageSize:6}} />
            </div>
        )
    }
}
