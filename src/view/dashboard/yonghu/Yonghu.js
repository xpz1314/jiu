import React, { Component } from 'react'
import { Table ,Button,Switch,Modal,Form,Input,Select} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'

const { Option } = Select;

export default class Yonghu extends Component {

    state={
        dataSource:[],
        rolesList:[],
        visible:false,
        visibleUpdate:false
    }
    current = null
    AddForm = React.createRef()
    upAddForm = React.createRef()
  

     columns = [
        {
          title: '权限名称',
          dataIndex: 'roleName',
          render:(roleName)=>{
              return <b>{roleName}</b>
          }
        },
        {
          title: '权限名称',
          dataIndex: 'username',
        },
        {
          title: '用户状态',
          dataIndex: '',
          render:(item)=>{
            //   console.log(item)
              return <Switch checked={item.roleState} 
              disabled={item.default}onChange={()=>{
                    this.handleChange(item)
              }} />
          }
        },
        {
            title: '权限登记',
            dataIndex: 'roleType',
            render:(roleType)=>{
                return <p>{roleType}</p>
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
                    <Button type="primary" disabled={item.default} onClick={()=>{
                        this.handleUpdate(item)
                    }}
                    >renew</Button>
                </div>
            }
          },
          
      ];

      deleteMyRightItem = (id) =>{
            this.setState({
                dataSource:this.state.dataSource.filter(item=>item.id!==id)
            })

            axios.delete(`http://localhost:7000/users/${id}`)
      }
      


      componentDidMount() {
          axios.get("http://localhost:7000/users").then(res=>{
            // console.log(res.data)
            this.setState({
                dataSource:res.data
               
            })
            // console.log(this.state.dataSource)
          }
              
          )

          axios.get("http://localhost:7000/roles").then(res=>{
            //   console.log(res.data)

              this.setState({
                  rolesList:res.data
              })
          })


      }

      handleChange=(item)=>{
        console.log(item)
        item.roleState=!item.roleState

        this.setState({
            dataSource:this.state.dataSource.map(data=>{
                if(data.id===item.id){
                    return item
                }
                return data
            })
        })
        axios.put(`http://localhost:7000/users/${item.id}`,item)
      }
      
      addformOk=()=>{
          console.log(this.AddForm)
          this.AddForm.current.validateFields().then(res=>{
            //   console.log(res)
            let resdata={
                "username":res.username,
                "password":res.password,
                "roleName":res.role.split("-")[1],
                "roleState":true,
                "default":false,
                "roleType":Number(res.role.split("-")[0])
            }
            // console.log(resdata)

            axios.post("http://localhost:7000/users",resdata).then(res=>{
                console.log(res.data)
                console.log(this.state.dataSource)
                this.setState({
                    visible:false,
                    dataSource:[...this.state.dataSource,res.data]

                })
            }).catch(err=>{
                console.log(err)
            })
          })
      }

      handleUpdate=(item)=>{
          this.current=item
                setTimeout(()=>{
                    this.setState({
                        visibleUpdate:true
                    })

                    this.upAddForm.current.setFieldsValue({
                        username:item.username,
                        password:item.password,
                        role:item.roleType+"-"+item.roleName
                    })
                },0)
      }

      upAddFormOk=()=>{
          this.upAddForm.current.validateFields().then(data=>{
              let putlist ={
                  ...this.current,
                  username:data.username,
                  password:data.password,
                  roleName:data.role.split("-")[1],
                  roleType:Number(data.role.split("-")[0])
              }
              console.log(putlist)
              this.setState({
                  dataSource:this.state.dataSource.map(item=>{
                      if(item.id===putlist.id){
                          return putlist
                      }
                      return item
                  }),
                  visibleUpdate:false
              })
              axios.put(`http://localhost:7000/users/${putlist.id}`,putlist)
          })
      }
      
   
    render() {
        return (
            <div>
                <Button type="primary" style={{marginBottom:"10px"}} onClick={()=>{
                    this.setState({
                        visible:true
                    })
                }}>添加人员</Button>
            <Table dataSource={this.state.dataSource} columns={this.columns} rowKey={item=>item.id} pagination={{pageSize:6}} />

            <Modal
            visible={this.state.visible}
            title="添加用户信息"
            okText="确认"
            cancelText="取消"
            onCancel={()=>{
                this.setState({
                    visible:false
                })
            }}
            onOk={() => {
               this.addformOk()
            }}
            >
            <Form
                // form={form}
                ref={this.AddForm}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                <Input type="password" />
                </Form.Item>
                <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                <Select  >
                  {
                      this.state.rolesList.map(item=><Option value={item.roleType+"-"+item.roleName} key={item.id}>{item.roleName}</Option>)
                  }
                </Select>
                </Form.Item>
               
            </Form>
            </Modal>



            <Modal
            visible={this.state.visibleUpdate}
            title="更新用户信息"
            okText="确认"
            cancelText="取消"
            onCancel={()=>{
                this.setState({
                    visibleUpdate:false
                })
            }}
            onOk={() => {
            //    this.addformOk()
            this.upAddFormOk()
            }}
            >
            <Form
                // form={form}
                ref={this.upAddForm}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                <Input type="password" />
                </Form.Item>
                <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                <Select  >
                  {
                      this.state.rolesList.map(item=><Option value={item.roleType+"-"+item.roleName} key={item.id}>{item.roleName}</Option>)
                  }
                </Select>
                </Form.Item>
               
            </Form>
            </Modal>
            </div>

        )
    }
}
