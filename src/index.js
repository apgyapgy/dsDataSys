import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from '@/store/store';
import { Provider } from 'react-redux';
// import { Spin} from 'antd';

// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import todoApp from '@/store/reducers';
// let store = createStore(todoApp);

ReactDOM.render(
    <Provider store={ store }>
        {/* <Spin spinning={store.getState().loading} className="spin_custom" size="large"> */}
            <App />
        {/* </Spin> */}
    </Provider>, 
    document.getElementById( 'root' )
);
/*
    <Provider store={store}>
        <App />
    </Provider>
*/ 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// ReactDOM.render(<Game />, document.getElementById('root'));
// import Game from './game2048/game2048'