import {createStore} from 'redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
// store.dispatch(addToCart('Coffee 500gm', 1, 250));
// store.dispatch(addToCart('Flour 1kg', 2, 110));
// store.dispatch(addToCart('Juice 2L', 1, 250));
unsubscribe();
export default store;