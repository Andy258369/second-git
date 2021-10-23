import { Button, Card,notification } from 'antd'
import React, { Component } from 'react'

export default class Notices extends Component {
    openNotification = (type,direction) => {
        // if(direction){
        //     notification.config({
        //         placement:direction
        //     })
        // }
        notification[type]({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            // icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            placement:direction
        });
        
      };
    render() {
        return (
            <div>
                <Card title="通知" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.openNotification('open')}}>Open</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('success')}}>Success</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('info')}}>info</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('warning')}}>Warning</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('error')}}>Error</Button>
                </Card>
                <Card title="通知方向" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.openNotification('success','topLeft')}}>topLeft</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('info','topRight')}}>topRight</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('warning','bottomLeft')}}>bottomLeft</Button>
                    <Button type="primary" onClick={()=>{this.openNotification('error','bottomRight')}}>bottomRight</Button>
                </Card>
            </div>
        )
    }
}
