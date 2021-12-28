import * as ActionTypes from './ActionTypes';

export const Contacts=(state = {
        isLoading: true,
        errMess: null,
        contacts: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CONTACTS:
            return {...state, isLoading: false, errMess: null, contacts: action.payload};

        case ActionTypes.CONTACTS_LOADING:
            return {...state, isLoading: true, errMess: null, contacts: []};

        case ActionTypes.CONTACTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, contacts: []};

        default:
            return state;
    }
}