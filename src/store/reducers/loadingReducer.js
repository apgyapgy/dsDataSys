import { UPDATE_LOADING } from '../actions/loadingAction';
export default function( state = false , action ) {
    switch( action.type ) {
        case UPDATE_LOADING :
            // console.log("UPDATE_LOADING:",state,action)
            return action.flag;
        default :
            return state;
    }
}