import React, { Component } from 'react'
import {Card,Table,Modal,Badge, message, Button} from 'antd'
import axios from '../../axios';
import Utils from '../../utils/utils'
export default class Higntable extends Component {
    state={}
    componentDidMount(){
        this.request()
    }
    params={
        page:1
    }
    request=()=>{
        axios.ajax({
            url:'/table/high/list',
            data: {
                params: this.params,
                isShowLoading: true
            }
        }).then(res => {
            this.setState({
                dataSource: res.list,
                pagination:Utils.pagination(res,(current)=>{
                    this.params.page=current;
                    this.request();
                })
            })
        })
      }
      handleChange=(pagination,filters,sorter)=>{
        this.setState({
          sortOrder:sorter.order
        })
      }
      handleDetele=(item)=>{
        // console.log(item);
        Modal.confirm({
          title:'确认',
          content:'确定要删除此条数据吗？',
          onOk:()=>{
            message.success('删除成功');
          }
        })
      }
    render() {
        const columns = [
            {
              title: 'id',
              dataIndex: 'key',
              width:80,
              key: 'key',
            },
              {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width:80,
              },
              {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width:80,
              },
              {
                  title: '性别',
                  dataIndex: 'sex',
                  key: 'sex',
                  width:80,
                  render(sex){
                    return sex=1?"男":"女";
                  }
              },
              {
                  title: '状态',
                  dataIndex: 'state',
                  key: 'state',
                  width:80,
                  render(state){
                    let config={
                      '1':'咸鱼一条',
                      '2':'风华浪子',
                      '3':'北大才子',
                      '4':'创业者',
                      '5':'百度'
                    }
                    return config[state];
                  }
              },
              {
                  title: '爱好',
                  dataIndex: 'interest',
                  key: 'interest',
                  width:80,
                  render(interest){
                    let config={
                      '1':'游泳',
                      '2':'打篮球',
                      '3':'踢足球',
                      '4':'跑步',
                      '5':'桌球'
                    }
                    return config[interest];
                  }
              },
              {
                  title: '生日',
                  dataIndex: 'birthday',
                  key: 'birthday',
                  width:80,
              },
              {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                  width:80,
              },
              {
                  title: '早起时间',
                  dataIndex: 'time',
                  key: 'time',
                  width:80,
              },
            ];
            const columns2 = [
                {
                  title: 'id',
                  dataIndex: 'key',
                  width:80,
                  key: 'key',
                  fixed:'left',
                },
                  {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    width:80,
                    fixed:'left',
                  },
                  {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                    width:80,
                  },
                  {
                      title: '性别',
                      dataIndex: 'sex',
                      key: 'sex',
                      width:80,
                      render(sex){
                        return sex=1?"男":"女";
                      }
                  },
                  {
                      title: '状态',
                      dataIndex: 'state',
                      key: 'state',
                      width:120,
                      
                      render(state){
                        let config={
                          '1':'咸鱼一条',
                          '2':'风华浪子',
                          '3':'北大才子',
                          '4':'创业者',
                          '5':'百度'
                        }
                        return config[state];
                      }
                  },
                  {
                      title: '爱好',
                      dataIndex: 'interest',
                      key: 'interest',
                      width:120,
                      render(interest){
                        let config={
                          '1':'游泳',
                          '2':'打篮球',
                          '3':'踢足球',
                          '4':'跑步',
                          '5':'桌球'
                        }
                        return config[interest];
                      }
                  },
                  {
                      title: '生日',
                      dataIndex: 'birthday',
                      key: 'birthday',
                      width:120,
                  },
                  {
                      title: '住址',
                      dataIndex: 'address',
                      key: 'address',
                      width:120,
                  },
                  {
                      title: '早起时间',
                      dataIndex: 'time',
                      key: 'time',
                      width:120,
                  },
                  
                ];
                const columns3 = [
                  {
                    title: 'id',
                    dataIndex: 'key',
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
                      sorter:(a,b)=>{
                        return a.age-b.age;
                      },
                      sortOrder:this.state.sortOrder
                    },
                    {
                        title: '性别',
                        dataIndex: 'sex',
                        key: 'sex',
                        render(sex){
                          return sex=1?"男":"女";
                        }
                    },
                    {
                        title: '状态',
                        dataIndex: 'state',
                        key: 'state',
                        render(state){
                          let config={
                            '1':'咸鱼一条',
                            '2':'风华浪子',
                            '3':'北大才子',
                            '4':'创业者',
                            '5':'百度'
                          }
                          return config[state];
                        }
                    },
                    {
                        title: '爱好',
                        dataIndex: 'interest',
                        key: 'interest',
                        render(interest){
                          let config={
                            '1':'游泳',
                            '2':'打篮球',
                            '3':'踢足球',
                            '4':'跑步',
                            '5':'桌球'
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
                  const columns4 = [
                    {
                      title: 'id',
                      dataIndex: 'key',
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
                          render(sex){
                            return sex=1?"男":"女";
                          }
                      },
                      {
                          title: '状态',
                          dataIndex: 'state',
                          key: 'state',
                          render(state){
                            let config={
                              '1':'咸鱼一条',
                              '2':'风华浪子',
                              '3':'北大才子',
                              '4':'创业者',
                              '5':'百度'
                            }
                            return config[state];
                          }
                      },
                      {
                          title: '爱好',
                          dataIndex: 'interest',
                          key: 'interest',
                          render(abc){
                            let config={
                              '1':<Badge status="success" text="成功"/>,
                              '2':<Badge status="error" text="报错"/>,
                              '3':<Badge status="default" text="正常"/>,
                              '4':<Badge status="processing" text="进行中"/>,
                              '5':<Badge status="warning" text="警告"/>
                            }
                            return config[abc];
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
                      {
                        title: '操作',
                        render:(text,item)=>{
                          return <Button onClick={()=>{this.handleDetele(item)}}>删除</Button>
                        }
                    },
                    ];
        return (
            <div>
                <Card title="头部固定">
                    <Table 
                    bordered 
                    dataSource={this.state.dataSource} 
                    columns={columns}
                    pagination={false}
                    scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定">
                    <Table 
                    bordered 
                    dataSource={this.state.dataSource} 
                    columns={columns2}
                    pagination={false}
                    scroll={{x:1400}}
                    />
                </Card>
                <Card title="表格排序">
                    <Table 
                    bordered 
                    dataSource={this.state.dataSource} 
                    columns={columns3}
                    pagination={false}
                    onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮">
                    <Table 
                    bordered 
                    dataSource={this.state.dataSource} 
                    columns={columns4}
                    pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
