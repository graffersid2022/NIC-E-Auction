import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT_FAIL,
    USER_SIGNOUT_REQUEST,
    USER_SIGNOUT_SUCCESS,
    BUYER_INFO,
    LOGINHISTORY,
    EXTENTION,
    LOGINHISTORY_FAIL,
    LOGINHISTORY_REQUEST,
    LOGINHISTORY_SUCCESS,
    EXTENSION_HISTORY_FAIL,EXTENSION_HISTORY_REQUEST,EXTENSION_HISTORY_SUCCESS
} from '../constants/userConstants';


export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        
        case USER_SIGNIN_REQUEST:
            return {...state, loading: true };
        case USER_SIGNIN_SUCCESS:
            return { ...state,loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { ...state,loading: false, error: action.payload };
        case USER_SIGNOUT_REQUEST:
            return { ...state,loading: true };
        case USER_SIGNOUT_SUCCESS:
            return {};
        case USER_SIGNOUT_FAIL:
            return {...state, loading: false, error: action.payload };
        case BUYER_INFO:
            return {...state,buyer:action.payload,userInfo:action.payload}
        case LOGINHISTORY:
            return {...state,login_history:action.payload}
        case EXTENTION:
            return {...state,extention:action.payload}
        default:
            return state;
    }
};


export const historyReducer = (state = { login_history_loading: true }, action) => {
    switch (action.type) {
        case LOGINHISTORY_REQUEST:
            return { ...state,login_history_loading: true };
        case LOGINHISTORY_SUCCESS:
            return { login_history_loading: false,login_history:action.payload};
        case LOGINHISTORY_FAIL:
            return {...state, login_history_loading: false, error: action.payload };
        default:
            return state;
    }
};


export const extensionReducer = (state = { extention_history_loading: true }, action) => {
    switch (action.type) {
        case EXTENSION_HISTORY_REQUEST:
            return { ...state,extention_history_loading: true };
        case EXTENSION_HISTORY_SUCCESS:
            return { extention_history_loading: false,extention:action.payload};
        case EXTENSION_HISTORY_FAIL:
            return {...state, extention_history_loading: false, error: action.payload };
        default:
            return state;
    }
};