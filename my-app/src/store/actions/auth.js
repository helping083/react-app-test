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

export const IsAuthSignUp = () => {
    return {
        type: actionTypes.AUTH_SIGN_CHANGE
    }
}

export const  setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

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

export const checkAuthTimeout = (expirationTime) => {
    console.log('expiration time')
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    
    return (dispatch, getState) => {
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
      axios.post(urlAuth, authData, {headers: headers})    
        .then((item)=>{
            const expirationDate  = new Date(new Date().getTime() + item.data.expiresIn * 1000)
            localStorage.setItem('token', item.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', item.data.localId)
            dispatch(authSucces(item.data.idToken, item.data.localId));
            dispatch(checkAuthTimeout(item.data.expiresIn));
        })
        .catch(error=>{
            console.log('state after dispatch', getState())
            console.log('error', error);
            dispatch(authFail(error.response.data.error))
        });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
         if(!token) {
             dispatch(logout());
         } else {
             const expirationDate = new Date(localStorage.getItem('expirationDate'));
             if(expirationDate <= new Date()) {
                dispatch(logout());
             } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSucces(token, userId));
                dispatch( checkAuthTimeout( ( expirationDate.getTime()- new Date().getTime() )/1000 ) );
             }
         }
    }
}