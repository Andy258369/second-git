import React, { Component } from 'react'
import { Menu } from 'antd';
import './index.less'
import menuConfig from '../../config/menuConfig'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {menuAction} from '../../redux/actions'
const { SubMenu } = Menu;

class Nav extends Component {
    state={
        currentKey:''
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(menuConfig);
        let currentKey=window.location.hash.replace(/#|\?.*$/g,'');
        this.initMenu(menuConfig,currentKey);
        this.setState({
            menuTreeNode,
            currentKey
        })
    }
    initMenu=(data,key)=>{
        const {dispatch}=this.props;
        data.map(item=>{
            if(item.children){
                return this.initMenu(item.children,key);
            }else{
                if(item.key===key){
                    console.log(item.title);
                    dispatch(menuAction(item.title));
                    return item.title;
                }
                return false;
            }
        })
    }
    handleClick=({item,key})=>{
        if (key === this.state.currentKey) {
            return false;
        }
        const {dispatch}=this.props;
        dispatch(menuAction(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    renderMenu=(menuConfig)=>{
        return menuConfig.map(item=>{
            if(item.children){
                return <SubMenu key={item.key} title={item.title}>
                    {this.renderMenu(item.children)}
                </SubMenu>
            }
            return <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    goHome=(key)=>{
        if (key === this.state.currentKey) {
            return false;
        }
        const {dispatch}=this.props;
        dispatch(menuAction("首页"));
        this.setState({
            currentKey:key
        })
    }
    render() {
        return (
            <div>
                <NavLink to="/home" onClick={()=>this.goHome('/home')}>
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt="" />
                        <h1>Imooc MS</h1>
                    </div>
                </NavLink>
                <Menu
                onClick={this.handleClick}
                selectedKeys={this.state.currentKey}
                theme="dark"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
export default connect()(Nav)