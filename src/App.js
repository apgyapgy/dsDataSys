import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import Login from '@/views/login/index';
import Index from '@/views/index/index';

import {BrowserRouter as Router,Route} from 'react-router-dom';
// import {routes} from './router/index';
export default class App extends Component {
  renderRoutes(routes){
    let routeArr = [];
    for(var key in routes){
      let item = routes[key];
      routeArr.push(<Route path={item.path} component={item.component} key={item.name}></Route>)
      // if(item.children&&item.children.length){
        // routeArr = [...routeArr,...this.renderRoutes(item.children)];
      // }
    }
    return routeArr;
  }
  render(){
    return (
      // {this.renderRoutes(routes)}
      <Router>
        <Route path="/login" component={Login} key="aa"></Route>
        <Route path="/" component={Index} key="bb"></Route>
      </Router>
    );
  }
}
