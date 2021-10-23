import { Card, Button, Modal } from 'antd'
import React, { Component } from 'react'
import './ui.less'
export default class Modals extends Component {
    state = {
        ModalText: 'Content of the modal',
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false,
        confirmLoading: false,
    };

    showModal = (type) => {
        this.setState({
            [type]:true
        })
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                showModal1: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            showModal1: false,
        });
    };
    handleType=(type)=>{
        Modal[type]({
            title: 'This is an error message',
            content: 'some messages...some messages...',
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('Cancel');
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.showModal('showModal1')}}>
                        Open Modal with async logic
                    </Button>
                    <Button type="primary" onClick={()=>{this.showModal('showModal2')}}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>{this.showModal('showModal3')}}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>{this.showModal('showModal4')}}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleType('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleType('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleType('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleType('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleType('warning')}>Warning</Button>
                </Card>
                <Modal
                        title="Title"
                        visible={this.state.showModal1}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <p>{this.state.ModalText}</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2} 
                    okText="确定"
                    cancelText="取消"
                    onOk={()=>{this.setState({showModal2:false})}}  
                    onCancel={()=>{this.setState({showModal2:false})}}
                >
                    imooc
                </Modal>
                <Modal
                    style={{top:20}}
                    title="React"
                    visible={this.state.showModal3} 
                    onOk={()=>{this.setState({showModal3:false})}}  
                    onCancel={()=>{this.setState({showModal3:false})}}
                >
                    imooc
                </Modal>
                <Modal
                    title="React"
                    // wrapClassName="vertical-center-modal"
                    centered
                    visible={this.state.showModal4} 
                    onOk={()=>{this.setState({showModal4:false})}}  
                    onCancel={()=>{this.setState({showModal4:false})}}
                >
                    imooc
                </Modal>
            </div>
        )
    }
}
