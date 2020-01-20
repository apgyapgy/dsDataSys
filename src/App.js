import React , { Component } from 'react';
import './App.scss';

import Login from '@/views/login/index';
import Index from '@/views/index/index';
import '@/store/index';

import { Switch , BrowserRouter as Router , Route } from 'react-router-dom';
export default class App extends Component {
  renderRoutes( routes ) {
    let routeArr = [];
    for( var key in routes ) {
      let item = routes[ key ];
      routeArr.push( <Route path={ item.path } component={ item.component } key={ item.name }></Route>)
      // if(item.children&&item.children.length){
        // routeArr = [...routeArr,...this.renderRoutes(item.children)];
      // }
    }
    return routeArr;
  }
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/login" component={Login} key="aa"></Route>
            <Route path="/" component={Index} key="bb"></Route>
          </Switch>
        </Router>
    );
  }
}
