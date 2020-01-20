import { UPDATE_USER } from '../actions/userAction';
const initialUser = {
    user : {
        name : '用户'
    }
}
export default function( state = initialUser , action ) {
    switch( action.type ) {
        case UPDATE_USER :
            return{
                ...state,
                user : action.user
            }
        default :
            return state;
    }
}