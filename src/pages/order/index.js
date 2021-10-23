import { Card, Button, message } from 'antd'
import React, { Component } from 'react'
import axios from '../../axios'
import { Modal, Form } from 'antd'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'
export default class Order extends Component {
    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }
    componentDidMount() {
        this.requestList()
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '杭州' }, { id: '4', name: '深圳' }]
        },
        {
            type: 'SELECT',
            label: '订单状态',
            placeholder: '全部',
            field: 'status',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }, {
            type: '时间查询',
            label: '订单时间',
        },
    ]
    requestList = () => {
        axios.requestList(this,"/order/list",this.params);
        // let _this = this;
        // axios.ajax({
        //     url: "/order/list",
        //     data: {
        //         params: this.params,
        //         isShowLoading: true
        //     }
        // }).then(res => {
        //     this.setState({
        //         selectedRowKeys: [],
        //         selectedItem: null,
        //         list: res.item_list,
        //         pagination: Utils.pagination(res, (current) => {
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // }).catch(e => {
        //     Modal.info({
        //         title: "提示",
        //         content: e.message
        //     })
        // })
    }
    handleConfirm = () => {
        let item = this.state.selectedItem;
        console.log(item);
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url: "/order/ebike_info",
            data: {
                page: item.id
            }
        }).then(res => {
            this.setState({
                orderInfo: res,
                orderConfirmVisble: true
            })
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: "/order/finish_order",
            params: {
                orderId: item.id

            }
        }).then(res => {
            message.success('订单结束成功')
            this.setState({
                orderConfirmVisble: false
            })
            this.requestList()
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    onRowClick = (record, index) => {
        let selecteKey = [index];
        this.setState({
            selectedRowKeys: selecteKey,
            selectedItem: record
        })
    }
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        console.log(item);
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单进行结束'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.order_sn}`, '_blank')
    }
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
        console.log(params);
    }
    formList=[
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'杭州'},{id:'4',name:'深圳'}]
        },
        {
            type:'SELECT',
            label:'订单状态',
            placeholder:'全部',
            field:'status',
            initialValue:'1',
            width:80,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
        },{
            type:'时间查询',
            label:'订单时间',
            field:'date',
            field1:'date1',
        },
    ]
    render() {
        const columns = [
            // {
            //     title: 'id',
            //     dataIndex: 'key',
            // },
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                key: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee',
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay',
            }
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        // const { selectedRowKeys } = this.state
        // const rowSelection = {
        //     type: 'radio',
        //     selectedRowKeys
        // }
        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail} style={{ marginRight: 10 }}>订单详情</Button>
                    <Button type="primary" onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    selectedIds={this.state.selectedIds}
                    selectedItem={this.state.selectedItem}
                    selectedRowKeys={this.state.selectedRowKeys}
                    // rowSelection="checkbox"
                    />
                    {/* <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index+1)
                                }
                            }
                        }}
                    /> */}
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <Form.Item label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </Form.Item>
                        <Form.Item label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </Form.Item>
                        <Form.Item label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </Form.Item>
                        <Form.Item label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
// class FilterForm extends Component {
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <div>
//                 <Form layout="inline">
//                     <Form.Item label="城市">
//                         {getFieldDecorator('city', {
//                             initialValue: '2'
//                         })(
//                             <Select
//                                 placeholder="全部"

//                             >
//                                 <Option value="2">北京市</Option>
//                                 <Option value="3">天津市</Option>
//                                 <Option value="4">深圳市</Option>
//                                 <Option value="5">杭州市</Option>
//                             </Select>)}
//                     </Form.Item>
//                     <Form.Item label="订单时间">
//                         {getFieldDecorator('start_time', {
//                         })(
//                             <DatePicker 
//                                 showTime={{ format: 'HH:mm' }}
//                                 format="YYYY-MM-DD HH:mm"
//                             />)
//                         }
//                     </Form.Item>
//                     <Form.Item>
//                         {getFieldDecorator('end_time', {

//                         })
//                             (<DatePicker
//                                 showTime={{ format: 'HH:mm' }}
//                                 format="YYYY-MM-DD HH:mm"
//                             />)
//                         }
//                     </Form.Item>
//                     <Form.Item label="订单状态" name="status">
//                         {getFieldDecorator('status', {
//                             initialValue: '1'
//                         })(
//                             <Select
//                                 style={{ width: 100 }}
//                                 placeholder="全部"
//                             >
//                                 <Option value="1">进行中</Option>
//                                 <Option value="2">结束行程</Option>
//                             </Select>)
//                         }
//                     </Form.Item>
//                     <Form.Item label="">
//                         <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
//                         <Button>重置</Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         )
//     }
// }
// FilterForm = Form.create({})(FilterForm);