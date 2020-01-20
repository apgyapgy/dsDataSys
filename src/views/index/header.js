import React , { Component } from 'react';
import { Avatar , Menu , Dropdown, Icon } from 'antd';
export default class Header extends Component {
    logOut() {
        console.log("logOut");
    }
    render() {
        const menu = (
            <Menu>
              <Menu.Item>
                <a rel="noopener noreferrer" href="/">
                  首页
                </a>
              </Menu.Item>
              <Menu.Item onClick={ () => this.logOut() }>
                  退出
              </Menu.Item>
            </Menu>
        );
        return(
            <div className="header_right">
                <Dropdown overlay={ menu }>
                    <div className="header_user">
                        <Avatar size="large" icon="user" />
                        <span className="username">user</span>
                        <Icon type="down" />
                    </div>
                </Dropdown>
            </div>
        )
    }
}