import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Chats } from './Chats';
import {Contacts} from './Contacts';
import {ErrorMess} from './ErrorMess';
import {Auth} from './Auth';
import {File} from './File';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            chats: Chats,
            contacts: Contacts,
            errorMess:ErrorMess,
            auth: Auth,
            file:File
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}