import React,{Component} from 'react';
import BreadcrumbCus from './breadcrumb';
import './index.scss';
import Sider from './navBar';
import Content from './content';
import {Icon} from 'antd';
export default class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed:false
        }
    }
    toggleCollapse(){
        this.setState({
            collapsed:!this.state.collapsed
        });
    }
    render(){
        return(
            <div className={`app_wrapper ${this.state.collapsed?'close_slider':'open_slider'}`}>
                <Sider collapsed={this.state.collapsed} />
                <div className="main_container">
                    <div className="main_header">
                        <Icon className="main_hamburger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
                         onClick={()=>this.toggleCollapse()} />
                        <BreadcrumbCus />
                    </div>
                    <Content></Content>
                </div>
            </div>
        )
    }
}