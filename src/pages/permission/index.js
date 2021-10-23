import React, { Component } from 'react'
import { Card, Modal, Button, Form, Input, Select, message, Tree, Transfer } from 'antd'
import ETable from '../../components/ETable'
import Utils from '../../utils/utils'
import axios from '../../axios'
import menuConfig from '../../config/menuConfig'
const { Option } = Select;
const TreeNode = Tree.TreeNode;
export default class Permissionuser extends Component {
    state = {
        isVisible: false,
        isPermVisible: false
    }
    componentDidMount() {
        this.requestList()
    }
    params = {
        page: 1
    }
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: "/role/list",
            data: {
                // page: this.params.page
                params: this.params
            }
        }).then(res => {
            this.setState({
                list: res.item_list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    handleRole = () => {
        this.setState({
            isVisible: true
        })
    }
    handleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: "/order/finish_order",
            data: {
                params: data
            }
        }).then(res => {
            message.success('创建成功')
            this.setState({
                isVisible: false
            })
            this.requestList();
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    handlePermission = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示",
                content: '请选择一个用户'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            userInfo: item,
            menuInfo: item.menus
        })
    }
    handlePerEditSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: "/order/finish_order",
            data: {
                params: data
            }
        }).then(res => {
            message.success('修改成功')
            this.setState({
                isPermVisible: false
            })
            this.requestList();
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示",
                content: '请选择一个用户'
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id)
    }
    getRoleUserList = (id) => {
        axios.ajax({
            url: "/role/user_list",
            data: {
                params: id
            }
        }).then(res => {
            this.getAuthUserList(res)
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if (data.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }
    handleUserSubmit = () => {
        let data = {};
        data.user_id = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: "/order/finish_order",
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            message.success('修改成功')
            this.setState({
                isUserVisible: false
            })
            this.requestList();
        }).catch(e => {
            Modal.info({
                title: "提示",
                content: e.message
            })
        })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status === 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" style={{ marginRight: 10 }} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleUserAuth}>用户权限</Button>
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
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isVisible}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    onOk={this.handleSubmit}
                    width={600}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                    onOk={this.handlePerEditSubmit}
                    width={600}
                >
                    <PermEditForm detailInfo={this.state.userInfo}
                        wrappedComponentRef={(inst) => this.roleForm = inst}
                        menuInfo={this.state.menuInfo || []}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            });
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                    onOk={this.handleUserSubmit}
                    width={800}
                >
                    <RoleAuthForm detailInfo={this.state.detailInfo}
                        wrappedComponentRef={(inst) => this.userAuthForm = inst}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}
class RoleForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal"
            >
                <Form.Item label="角色名称" {...formItemLayout} >
                    {
                        getFieldDecorator('role_name', {
                            initialValue: ''
                        })(
                            <Input type="text" placeholder="请输入角色名称" />)}
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout} >
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>)}
                </Form.Item>
            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm);
class PermEditForm extends Component {
    state = {};
    // 设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    renderTreeNodes = (data, key = '') => {
        return data.map((item) => {
            let parentKey = key + item.key;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderTreeNodes(item.children, parentKey)}
                    </TreeNode>
                );
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderBtnTreedNode(item, parentKey)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };
    renderBtnTreedNode = (menu, parentKey = '') => {
        const btnTreeNode = []
        menu.btnList.forEach((item) => {
            console.log(parentKey + '-btn-' + item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey + '-btn-' + item.key} className="op-role-tree" />);
        })
        return btnTreeNode;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo } = this.props;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal" ref={this.permForm}>
                <Form.Item label="角色名称" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detailInfo.role_name} />
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 80 }}
                            placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>)}
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo || []}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm);
class RoleAuthForm extends Component {
    state = {};
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        this.props.patchUserInfo(targetKeys)
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo } = this.props;
        return (
            <Form layout="horizontal" ref={this.userForm}>
                <Form.Item label="角色名称" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detailInfo.role_name} />
                </Form.Item>
                <Form.Item label="角色名称" {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 200, height: 400 }}
                        titles={['待选用户', '已选用户']}
                        dataSource={this.props.mockData}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </Form.Item>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);