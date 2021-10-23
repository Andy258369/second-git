import React, { Component } from 'react'
import {Card,Modal} from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from '../../axios'
export default class Map extends Component {
    state = {
        bikeInfo:{}
    }

    map = {}
    formList = [
        {
            type: '城市',
            field:"city",
            width:80
        },{
            type: '时间查询',
            field:"date",
            field1:"date1"
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 150,
            list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '3', name: '行程结束'}]
        }
    ]
    // 查询表单
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    };
    componentDidMount(){
        this.requestList()
    }
    requestList = () => {
        axios.ajax({
            url:"/map/bike_list",
            data: {
                params:this.params
            }
        }).then(res => {
            this.setState({
                total_count:res.total_count
            })
            this.renderMap(res);
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    renderMap = (res) => {
        let list = res.route_list;
        this.map = new window.BMapGL.Map("container");
        this.map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
        let gps1 = list[0].split(',');
        let gps2 = list[list.length - 1].split(',');
        let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
        let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);
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
        list.forEach((item)=>{
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            trackPoint.push(point);
        })
        // 行驶路线
        let polyLine = new window.BMapGL.Polyline(trackPoint, { strokeColor: "#ef4136", strokeWeight: 3, strokeOpacity: 1 });
        this.map.addOverlay(polyLine);
        // 服务区路线
        let serviceList = res.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new window.BMapGL.Point(item.lon, item.lat);
            servicePointist.push(point);
        })
        // 画线
        var polyServiceLine = new window.BMapGL.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);
        // 添加地图中的自行车
        let bikeList = res.bike_list;
        let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            var bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
         // 添加地图控件
         this.addMapControl();
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
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}
