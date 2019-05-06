import * as actionTypes from './actionTypes';
import axios from 'axios'

let urlAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDPi6jEYdUwT-7qUTqPaqhL9HNfedHxwjo';

const headers = {
    'Content-Type': 'application/json'
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true
    };
};

export const authSucces = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return  {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
      dispatch(authStart());
      let authData = {
          email: email,
          password: password,
          returnSecureToken: true
      }
      if (!isSignUp) {
          urlAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDPi6jEYdUwT-7qUTqPaqhL9HNfedHxwjo'
      } else {
          urlAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDPi6jEYdUwT-7qUTqPaqhL9HNfedHxwjo';
      }
      console.log('item in authss')
      axios.post(urlAuth, authData, {headers: headers})    
        .then((item)=>{
            console.log('item in authss', item)
            dispatch(authSucces(item.data.idToken, item.data.localId))
        })
        .catch(error=>{
            console.log('error', error);
            dispatch(authFail(error))
        });
    };
};