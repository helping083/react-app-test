import * as actionTypes from './actionTypes';
import axios from 'axios'

const urlAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDPi6jEYdUwT-7qUTqPaqhL9HNfedHxwjo';

const headers = {
    'Content-Type': 'application/json'
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucces = (auThdata) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: auThdata
    };
};

export const authFail = (error) => {
    return  {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
      dispatch(authStart());
      let authData = {
          email: email,
          password: password,
          returnSecureToken: true
      }
      console.log('sss', authData)
      axios.post(urlAuth, authData,{headers: headers})    
        .then((item)=>{ 
            console.log('response', item);
            dispatch(authSucces(item.data))
        })
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error))
        });
    };
};