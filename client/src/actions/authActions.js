import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import {
    SET_CURRENT_USER,
    USER_LOADING,
    GET_ERRORS
} from './types';



//Register user

export const registerUser = (userData, history) => dispatch => {
    axios.post('/users/register', userData)
        .then( res =>{
            history.push('/login')
        })
        .catch( err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//login user with token

export const loginUser = userData => dispatch => {
    axios.post('users/login', userData)
        .then( res => {
            // save to localstorage
            console.log(res)
            const { token } = res.data;
            // console.log(token);
            localStorage.setItem('jwtToken', token);

            //set token to Auth header
            setAuthToken(token);

            //decode token to get user data
            const decoded = jwt_decode(token);

            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch( err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
              })
        })
}

//set logged in user

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// User loading
export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
};


// Log user out
export const logoutUser = () => dispatch => {

    // Remove token from local storage

    localStorage.removeItem("jwtToken");

    // Remove auth header for future requests

    setAuthToken(false);

    // Set current user to empty object {} which will set isAuthenticated to false

    dispatch(setCurrentUser({}));
  };
