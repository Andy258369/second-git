import { Card } from 'antd'
import React, { Component } from 'react'
import axios from '../../axios'
import './detail.less'

export default class Detail extends Component {
    state = {}
    params={
        orderId:'',
    }
    componentDidMount() {
        this.params.orderId = this.props.match.params.orderId;
        if (this.params.orderId) {
            this.getDetailInfo(this.params)
        }
    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url:"/order/detail",
            data: {
                params: orderId,
                isShowLoading: true
            }
        })
            .then(res => {
                    this.setState({
                        orderInfo: res
                    })
                    this.renderMap(res);
            })
    }
    renderMap = (result) => {
        this.map = new window.BMapGL.Map("orderDetailMap");
        this.map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
        this.addMapControl();
        this.drawBikeRoute(result.position_list);
        this.drawServiceArea(result.area)
    }
    addMapControl = () => {
        let map = this.map;
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
        map.addControl(cityCtrl);
    }
    drawBikeRoute = (positionList) => {
        let first = positionList[0];
        let last=positionList[positionList.length-1];
        let startPoint='';
        let endPoint='';
        startPoint = new window.BMapGL.Point(first.lon, first.lat);
        endPoint = new window.BMapGL.Point(last.lon, last.lat);
        // 创建点坐标 
        this.map.centerAndZoom(startPoint, 11);
        // 创建标注   
        let startmyIcon = new window.BMapGL.Icon("/assets/start_point.png", new window.BMapGL.Size(36, 42), {
            anchor: new window.BMapGL.Size(36, 42), 
        });
        let endmyIcon = new window.BMapGL.Icon("/assets/end_point.png", new window.BMapGL.Size(36, 42), {
            anchor: new window.BMapGL.Size(36, 42), 
        });
        let startmarker = new window.BMapGL.Marker(startPoint, { icon: startmyIcon });
        this.map.addOverlay(startmarker);
        let endmarker = new window.BMapGL.Marker(endPoint, { icon: endmyIcon });
        this.map.addOverlay(endmarker);
        //连接路线图
        let trackPoint=[];
        for(let i=0;i<positionList.length;i++){
            let point=positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }
        // 创建标注对象并添加到地图  
        let polygon = new window.BMapGL.Polyline(trackPoint, { strokeColor: "#1869AD", strokeWeight: 3, strokeOpacity: 1 });
        this.map.addOverlay(polygon);
        

    }
    drawServiceArea=(positionList)=>{
        //连接路线图
        let trackPoint=[];
        for(let i=0;i<positionList.length;i++){
            let point=positionList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }
        let polygon = new window.BMapGL.Polygon(trackPoint, { strokeColor: "#CE00000", strokeWeight: 4, strokeOpacity: 1 ,fillColor:'#ff8605',fillOpacity:0.4});
        this.map.addOverlay(polygon);
    }
    render() {
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '服务器' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行车轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程里程</div>
                                <div className="detail-form-content">{info.distance / 1000}公里</div>
                            </li>

                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
