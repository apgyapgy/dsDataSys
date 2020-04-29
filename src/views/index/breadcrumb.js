import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
export default class BreadcrumbCus extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <Breadcrumb separator="/">
                {
                    this.props.breadcrumbs.map((item, idx) => {
                        return (
                            <Breadcrumb.Item key={idx}>
                                <a href={item.path}>{item.title}</a>
                            </Breadcrumb.Item> 
                        )
                    })
                }
            </Breadcrumb>
        )
    }
}