import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
const allReducers = {
    products : productsReducer,
    shoppingCart : cartReducer,
    user : userReducer,
    loading : loadingReducer
};
const rootReducer = combineReducers( allReducers );
export default rootReducer;