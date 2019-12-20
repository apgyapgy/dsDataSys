import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
// import { logicalExpression } from '@babel/types';
// import Index from '.';

const { SubMenu } = Menu;

class Sider extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  renderMenuItem(item){//渲染侧边栏元素
    return (
      <Menu.Item key={item.name} >
        <Link to={item.path}>
          {item.icon?<Icon type={item.icon} />:''}
          <span>{item.title?item.title:''}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderMenu(routes){//渲染侧边栏
    let linksArr = [];
    for(var k in routes){
      if(routes[k].children&&routes[k].children.length){
        if(routes[k].children.length===1){
          linksArr.push(
            this.renderMenuItem(routes[k].children[0])
          );
        }else{
          linksArr.push(
            <SubMenu
                key={routes[k].name}
                title={
                  <span>
                    {routes[k].icon?<Icon type={routes[k].icon} />:''}
                    <span>{routes[k].title}</span>
                  </span>
                }
              >
                {this.renderMenu(routes[k].children)}
            </SubMenu>
          )
        }
      }else if(!routes[k].hidden){
        linksArr.push(
          this.renderMenuItem(routes[k])
        )
      }
    }
    return linksArr;
  }
  renderMenuIcon(){
    let routes = this.props.routes;
    let filtered =  routes.map((item)=>{
      let icon = null;
      if(item.icon){
        icon = <Icon key={item.name} type={item.icon} />
      }else if(item.children&&item.children.length===1){
        let child = item.children[0];
        icon = <Icon key={item.name} type={child.icon?child.icon:'menu'} />
      }else{
        icon = <Icon key={item.name} type="menu" />
      }
      return (
        <Menu.Item key={item.name}>
          {icon}
        </Menu.Item>
      )
    });
    return filtered;
  }
  render() {
    let selectedKeys = '',
        openKeys = [];
    let keys = this.props.breadcrumbs.map((item)=>item.name);
    selectedKeys = keys[keys.length-1];
    openKeys = keys.slice(0,keys.length-1);
    return (
      <div className="sidebar_container">
          <Menu defaultSelectedKeys={[selectedKeys]} mode="inline" theme="dark" 
            inlineCollapsed={this.props.collapsed}
            defaultOpenKeys = {openKeys}
          >
            {this.renderMenu(this.props.routes)}
          </Menu>
      </div>
    );
  }
}

export default Sider;