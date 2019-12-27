import {UPDATE_LOADING} from '../actions/loadingAction';
export default function(state=false,action){
    switch(action.type){
        case UPDATE_LOADING:
            return state;
        default:
            return state;
    }
}