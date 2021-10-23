import { Col, Row } from 'antd'
import React, { Component } from 'react'
import './index.less'
import Utils from '../../utils/utils'
import axios from 'axios';
import {connect} from 'react-redux'
class Header extends Component {
    state={
        
    }
    componentWillMount(){
        this.setState({
            userName:'Andy123'
        })
        setInterval(()=>{
            let sysTime=Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        })
        this.getWeather()
    }
    getWeather=()=>{
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=753c13e5aa5e497ba63c27449e113740")
        .then(res=>{
            
            this.setState({
                text:res.data.now.text,
                icon:res.data.now.icon
            })
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎,{this.state.userName}</span>
                        <a href="1">退出账号</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        {this.props.menuName}
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={`/icons/${this.state.icon}.svg`} alt=""/> 
                        </span>
                        <span className="weather-detail">
                            {this.state.text}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(Header);