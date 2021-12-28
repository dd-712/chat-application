import * as ActionTypes from './ActionTypes';

export const File=(state = {
        fileName: '00',
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FILE:
            return {...state, fileName: action.payload};
        case ActionTypes.SET_DEFAULT:
            return {...state,fileName:'00'};
        default:
            return state;
    }
}