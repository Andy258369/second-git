import React, { Component } from 'react'
import {Card,Spin,Icon,Alert} from 'antd'
const antIcon = <Icon type="smile" theme="outlined" spin/>;
export default class Loadings extends Component {
    render() {
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={antIcon} style={{marginLeft:10}}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    
                    <Alert
                        message="React"
                        description="欢迎来到React高级实战课程"
                        type="info"
                    />
                    <Spin tip="Loading...">
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
