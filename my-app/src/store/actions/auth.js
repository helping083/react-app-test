import * as actionTypes from './actionTypes';

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
      dispatch(authStart())      
    };
};