import orderReducer from './reducers/order';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './reducers/burgerBuilder';
import authReducer from './reducers/auth';
import * as actionTypes from './actions/actionTypes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const customMiddleWare = store => next => action => {
    let {AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH} = actionTypes;
    next(action);
}

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, customMiddleWare)
));

export default store;