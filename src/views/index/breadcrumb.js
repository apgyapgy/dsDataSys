import React,{Component} from 'react';
import { Breadcrumb } from 'antd';
import {filterRoutes} from '@/router/index';
export default class BreadcrumbCus extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    getBreadcrumb(){
        let matched = filterRoutes.filter(item=>item.meta&&item.meta.title);
        console.log("matched:",matched);
    }
    render(){
        this.getBreadcrumb();
        return(
            <Breadcrumb separator="/" routes={filterRoutes}> 
            </Breadcrumb>
        )
    }
}