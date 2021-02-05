import React, { Component } from 'react'
import { Table ,Tag,Button,Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'


export default class Juese extends Component {

    state={
        dataSource:[]
    }

     columns = [
        
        {
          title: '角色名称',
          dataIndex: 'roleName',
          render:(roleName)=>{
              return <b>{roleName}</b>
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

            axios.delete(`http://localhost:7000/roles/${id}`)
      }
      


      componentDidMount() {
         Promise.all([
             axios.get("http://localhost:7000/rights"),
             axios.get("http://localhost:7000/roles")
         ]).then(res=>{
             console.log(res[0].data)
             let rights = res[0].data
             let roles = res[1].data

             for(let i in roles){
                 let arr = rights.filter(item=>item.grade.includes(roles[i].roleType))

                 roles[i].list = arr
             }
             this.setState({
                 dataSource:roles
             })
            //  console.log(roles)
         })
      }
      
      
   
    render() {
        return (
            <div>
            <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} pagination={{pageSize:6}} 
            expandable={{
            expandedRowRender: item=><p>{item.list.map((data,index) =><Tag key={index} closable color="orange">{data.title}</Tag>)}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
    }}/>
    
            </div>
        )
    }
}
