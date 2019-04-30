import { createStore, applyMiddleware , compose} from "redux";
import thunk from "redux-thunk";

import { combineReducers } from 'redux';

import authReducers from './reducers/authReducers';
import errorReducers from './reducers/errorReducers';

const initialState = {};

const middleware = [thunk];

const rootReducers = 
  combineReducers({
    auth: authReducers,
    errors: errorReducers
})

const store = createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);
export default store;