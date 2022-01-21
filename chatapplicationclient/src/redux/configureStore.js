import { createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Auth} from './Auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth
        }),composeWithDevTools(
        applyMiddleware(thunk, logger)
    ));
    return store;
}