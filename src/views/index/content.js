import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {filterRoutes} from '@/router/index';
export default class Content extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    renderRoutes(routes){
        let routeArr = [];
        for(var key in routes){
            let item = routes[key];
            if(item.children&&item.children.length){
                routeArr = [...routeArr,...this.renderRoutes(item.children)]
            }else{
                if(!item.hidden){
                    routeArr.push(
                        <Route key={item.name} exact path={item.path} 
                            component={item.component}
                        >
                        </Route>
                    );
                }
            }
        }
        return routeArr;
    }
    render(){
        return(
            <Switch>
                {this.renderRoutes(filterRoutes)}
            </Switch>
        )
    }
}