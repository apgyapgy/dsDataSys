import {UPDATE_USER} from '../actions/userAction';
export default function(state = '',action){
    switch(action.type){
        case UPDATE_USER:
            return{
                ...state,
                user:action.user
            }
        default:
            return state;
    }
}