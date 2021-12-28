import * as ActionTypes from './ActionTypes';

export const ErrorMess=(state = {
        errMess:"0",
    }, action) => {
    switch(action.type) {
        case ActionTypes.ErrorMess:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
}