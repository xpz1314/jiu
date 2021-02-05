import React, { Component } from 'react'
import {Empty} from 'antd'
export default class NoPermission extends Component {
    render() {
        return (
            <div>
                <Empty description={false}>
                    <div>暂无权限</div>
                </Empty>
            </div>
        )
    }
}
