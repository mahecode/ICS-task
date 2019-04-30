import { combineReducers } from 'redux';

import authReducers from './reducers/authReducers';
import errorReducers from './reducers/errorReducers';

export default combineReducers({
    auth: authReducers,
    errors: errorReducers
})