import { Button, Card,message } from 'antd'
import React, { Component } from 'react'

export default class Message extends Component {
    info = (type) => {
        message[type]('恭喜你，React课程晋级成功');
    };
    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.info('info')}}>
                    info
                </Button>
                <Button type="primary" onClick={()=>{this.info('success')}}>
                    success
                </Button>
                <Button type="primary" onClick={()=>{this.info('warning')}}>
                    warning
                </Button>
                <Button type="primary" onClick={()=>{this.info('error')}}>
                    error
                </Button>
                <Button type="primary" onClick={()=>{this.info('loading')}}>
                    loading
                </Button>
                </Card>
            </div>
        )
    }
}
