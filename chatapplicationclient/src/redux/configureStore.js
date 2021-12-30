import { createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
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
        }),composeWithDevTools(
        applyMiddleware(thunk, logger)
    ));
    return store;
}