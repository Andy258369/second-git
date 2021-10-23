import React, { Component } from 'react'
import { Card, Table, Modal, Button,message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
export default class Basic extends Component {
    state = {}
    params = {
        page: 1
    }
    componentWillMount() {
        this.setState({
            dataSource: [
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32,
                    sex: '1',
                    state: "1",
                    interest: "1",
                    birthday: '2000-01-01',
                    address: '西湖区湖底公园1号',
                    time: '09:00'
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42,
                    sex: '1',
                    state: "1",
                    interest: "1",
                    birthday: '2000-01-01',
                    address: '西湖区湖底公园1号',
                    time: '09:00'
                },
                {
                    key: '3',
                    name: 'tom',
                    age: 42,
                    sex: '1',
                    state: "1",
                    interest: "1",
                    birthday: '2000-01-01',
                    address: '西湖区湖底公园1号',
                    time: '09:00'
                },
                {
                    key: '4',
                    name: 'jarry',
                    age: 42,
                    sex: '1',
                    state: "1",
                    interest: "1",
                    birthday: '2000-01-01',
                    address: '西湖区湖底公园1号',
                    time: '09:00'
                },
            ]
        })
        this.request()
    }
    request = () => {
        axios.ajax({
            url: '/table/list',
            data: {
                params: this.params,
                isShowLoading: true
            }
        }).then(res => {
            this.setState({
                dataSource2: res.list,
                selecteRowKeys:[],
                selectedRows:null,
                pagination:Utils.pagination(res,(current)=>{
                    this.params.page=current;
                    this.request();
                })
            })
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: "信息",
            content: `用户名:${record.name},爱好:${record.interest}`
        })
        this.setState({
            selecteRowKeys: selectKey,
            selectedItem: record
        })
    }
    handleDelete=(()=>{
        // let {dataSource2}=this.state
        let rows=this.state.selectedRows;
        let ids=[];
        rows.map((item)=>{
          return ids.push(item.key)
        })
        Modal.confirm({
          title:'删除提示',
          content:`您确定要删除这些数据吗？${ids.join(',')}`,
          onOk:()=>{
            message.success('删除成功');
            console.log(ids);
            this.request();
          }
        })
        
      })
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'key',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex = 1 ? "男" : "女";
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '创业者',
                        '5': '百度'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '桌球'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                key: 'time',
            },
        ];

        const { selecteRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selecteRowKeys
        }
        const rowSelection1 = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selecteRowKeys:selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onChange: () => {
                                    this.onRowClick(record, index+1)
                                }
                            }
                        }}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-复选框" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection1,
                        }}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{margin:'10px 0'}}>
                    <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2} 
                    pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}
