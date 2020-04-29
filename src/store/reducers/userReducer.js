import { UPDATE_USER } from '../actions/userAction';
const initialUser = {
    userInfo: {},
    token: '',
    roles: [],
}
export default function( state = initialUser , action ) {
    switch( action.type ) {
        case UPDATE_USER :
            return{
                ...state,
                userInfo : action.userInfo
            }
        case 'UPDATE_TOKEN': 
            return {
                ...state,
                token: action.token
            }
        default :
            return state;
    }
}