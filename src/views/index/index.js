import React , { Component } from 'react';
import BreadcrumbCus from './breadcrumb';
import './index.scss';
import CustomSider from './navBar';
import CustomContent from './content';
import CustomHeader from './header';
import { Icon } from 'antd';
import { filterRoutes } from '@/router/index';
// import Item from 'antd/lib/list/Item';
export default class Index extends Component{
    constructor( props ){
        super( props );
        this.state = {
            breadcrumbs : [],
            pathname : '',
            menuKey : '',
            collapsed : localStorage.collapsed !== undefined ? JSON.parse( localStorage.collapsed ) : false
        }
    }
    toggleCollapse(){
        console.log("toggleCollapse:")
        localStorage.collapsed = !this.state.collapsed;
        this.setState({
            collapsed : !this.state.collapsed
        });
    }
    componentDidMount(){
        this.checkPathName( this.props );
    }
    componentDidUpdate(){
        this.checkPathName( this.props );
    }
    checkPathName( props ){
        if(props && props.location && props.location.pathname !== this.state.pathname ){
            let breadcrumbs = this.getBreadCrumb( props.location.pathname );
            this.setState({
                breadcrumbs : breadcrumbs,
                pathname : props.location.pathname,
                menuKey : breadcrumbs.length ? breadcrumbs[ breadcrumbs.length - 1 ].name : ''
            });
            if( breadcrumbs.length && breadcrumbs[ breadcrumbs.length - 1 ].title ){
                document.title = breadcrumbs[ breadcrumbs.length - 1 ].title;
            }
        }
    }
    getBreadCrumb( path ){
        let routes = filterRoutes;
        let breadcrumbs = [];
        for( var parIdx in routes ){
            let parent = routes[ parIdx ];
            if( parent.path === path ){
                breadcrumbs.push({
                    path : parent.path,
                    title : parent.title,
                    name : parent.name
                });
                break;
            }
            for( var childIdx in parent.children ){
                let child = parent.children[ childIdx ];
                if( child.path === path ){
                    breadcrumbs.push({
                        path : parent.path,
                        title : parent.title,
                        name : parent.name
                    });
                    breadcrumbs.push({
                        path : child.path,
                        title : child.title,
                        name : child.name
                    });
                    return breadcrumbs;
                }
            }
        }
        return breadcrumbs;
    }
    render(){
        return(
            <div className={ `app_wrapper ${ this.state.collapsed ? 'close_slider' : 'open_slider' }`}>
                {
                    this.state.breadcrumbs.length
                    ?
                    <CustomSider collapsed={ this.state.collapsed } routes={ filterRoutes } 
                    breadcrumbs={ this.state.breadcrumbs }/>
                    :''
                }
                <div className="main_container">
                    <div className="main_header">
                        <Icon className="main_hamburger" type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
                         onClick={ () => this.toggleCollapse() } />
                        <BreadcrumbCus breadcrumbs={ this.state.breadcrumbs } />
                        <CustomHeader />
                    </div>
                    <CustomContent></CustomContent>
                </div>
            </div>
        )
    }
}