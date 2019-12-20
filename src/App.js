import React,{Component} from 'react';
import './App.css';

import Login from '@/views/login/index';
import Index from '@/views/index/index';

import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@/store/store';
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
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} key="aa"></Route>
            <Route path="/" component={Index} key="bb"></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
