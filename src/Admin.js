import React, { Component } from 'react'
import Nav from './components/nav'
import Header from './components/header'
import { Col, Row } from 'antd'
import Footer from './components/footer'
import './style/common.less'
export default class Admin extends Component {
    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={4} className="nav-left">
                        <Nav/>
                    </Col>
                    <Col span={20} className="main">
                        <Header/>
                        <Row className="content">
                            {this.props.children}
                        </Row>
                        <Footer/>
                    </Col>
                </Row>
            </div>
        )
    }
}
