import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {filterRoutes} from '@/router/index';
import {Link} from 'react-router-dom';
// import { logicalExpression } from '@babel/types';
// import Index from '.';

const { SubMenu } = Menu;

class Sider extends Component {
  constructor(props){
    super(props);
    this.state = {
      constRouters:filterRoutes
    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  renderMenuItem(item){//渲染侧边栏元素
    return (
      <Menu.Item key={item.name}>
        <Link to={item.path}>
          {item.meta&&item.meta.icon?<Icon type={item.meta.icon} />:''}
          <span>{item.meta&&item.meta.title?item.meta.title:''}</span>
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
                    {routes[k].meta&&routes[k].meta.icon?<Icon type={routes[k].meta.icon} />:''}
                    <span>{routes[k].meta.title}</span>
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
    let routes = this.state.constRouters;
    let filtered =  routes.map((item)=>{
      let icon = null;
      if(item.meta&&item.meta.icon){
        icon = <Icon key={item.name} type={item.meta.icon} />
      }else if(item.children&&item.children.length===1){
        let child = item.children[0];
        icon = <Icon key={item.name} type={child.meta&&child.meta.icon?child.meta.icon:'menu'} />
      }else{
        icon = <Icon key={item.name} type="menu" />
      }
      return (
        <Menu.Item key={item.name}>
          {icon}
        </Menu.Item>
      )
    });
    console.log("constRoutes:", filtered)
    return filtered;
  }
  render() {
    return (
      <div className="sidebar_container">
          <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" >
            {this.props.collapsed?this.renderMenuIcon():this.renderMenu(this.state.constRouters)}
          </Menu>
      </div>
    );
  }
}

export default Sider;