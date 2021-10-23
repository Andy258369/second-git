import { Card,Button,Icon, Radio } from 'antd'
import React, { Component } from 'react'
import './ui.less'
export default class Buttons extends Component {
    state={
        loading:true,
        size:"default"
    }
    handle=(flag)=>{
        this.setState({
            loading:flag
        })
    }
    handleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render() {
        return (
            <div>
                <Card title="基础按钮" bordered className="card-wrap">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>Link disabled</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="folder-add" >创建</Button>
                    <Button icon="edit" >编辑</Button>
                    <Button icon="delete" >删除</Button>
                    <Button shape="circle" icon="search" />
                    <Button type="primary" icon="search">Search</Button>
                    <Button type="primary" icon="download" >下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading} onClick={()=>this.handle(true)}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading} />
                    <Button type="primary" loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading} />
                    <Button type="primary" onClick={()=>this.handle(false)}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />
                            Go back
                        </Button>
                        <Button type="primary">
                            Go forward
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group onChange={this.handleChange} defaultValue={this.state.size}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Primary</Button>
                    <Button size={this.state.size}>Default</Button>
                    <Button type="dashed" size={this.state.size}>Dashed</Button>
                    <Button type="danger" size={this.state.size}>Danger</Button>
                    <Button disabled size={this.state.size}>Link disabled</Button>
                </Card>
            </div>
        )
    }
}
