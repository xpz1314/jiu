import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

const menus = [
    {
      title:"首页",
      icon:<PieChartOutlined />,
      key:"/home" //路径
    },
    {
      title:"用户管理",
      icon:<UserOutlined />,
      children:[
        {
          title:"用户列表",
          icon:<UserOutlined />,
          key:"/Yonghu/yonghu" //路径
        }
      ],
      key:"/Yonghu" //路径
    },
    {
      title:"权限管理",
      icon:<TeamOutlined />,
      children:[
        {
          title:"角色列表",
          icon:<TeamOutlined />,
          key:"/Quanxian/juese" //路径
        },
        {
          title:"权限列表",
          icon:<TeamOutlined />,
          key:"/Quanxian/quanxian" //路径
        }
      ],
      key:"/Quanxian" //路径
    },
    {
      title:"房间管理",
      icon:<DesktopOutlined />,
      children:[
        {
          title:"已订房间",
          icon:<DesktopOutlined />,
          key:"/Fangjian/yiding" //路径
        },
        {
          title:"房间信息",
          icon:<DesktopOutlined />,
          key:"/Fangjian/leixing" //路径
        }
      ],
      key:"/Fangjian" //路径
    }
  ]

  export default menus