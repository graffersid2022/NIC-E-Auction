import Axios from 'axios';
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
    EXTENSION_HISTORY_FAIL, EXTENSION_HISTORY_REQUEST, EXTENSION_HISTORY_SUCCESS
} from '../constants/userConstants';

import SERVER_DATA from '../config/mFile';
import RESOURCE from '../config/resource';
import { buyerRedirect } from '../utils';
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

export const signin = (username, password, auctionCode) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password, auctionCode } });
    try {
        const { data } = await Axios.post(RESOURCE.API_HOST + '/api/user/supplier/login', { username, password, auctionCode });
        console.log("login", data);
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signout = (id = "", buyer = false) => async (dispatch) => {
    dispatch({ type: USER_SIGNOUT_REQUEST, payload: {} });
    try {
        const { data } = await Axios.get(RESOURCE.API_HOST + '/api/user/logout', {});
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userInfo');
        localStorage.removeItem('nic-vaults')//nic-authcred
        localStorage.removeItem('nic-authcred')
        dispatch({ type: USER_SIGNOUT_SUCCESS, payload: data });
        dispatch({type:BUYER_INFO,payload:{}})
      
        if (buyer) {
            buyerRedirect()
        }
        else {
            window.location.href = "/eauction/supplier/" + id;
        }

    } catch (error) {
        dispatch({
            type: USER_SIGNOUT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
    //document.location.href = '/signin';
};

export const checktoken = (payload) => async (dispatch) => {
    try {
        // let Navigate = useNavigate()
        const { data, status } = await Axios.post(RESOURCE.API_HOST + "/api/user/buyer/login", payload);
        // alert(status)
        console.log("login", data);
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({ type: BUYER_INFO, payload: data });

        // if(data.token)
        // {
        //     const {data} = await Axios.get("/api/auction/FWH1ZBP")
        //      dispatch({type:Auction,payload:data})
        // }    

        // Navigate("/Buyer/:id")
    }
    catch (error) {
        buyerRedirect()
    }
};

export const getLoginHistory = (id = "") => async (dispatch, getState) => {
    dispatch({ type: LOGINHISTORY_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            const loginData = await Axios.get(RESOURCE.API_HOST + `/api/auction/${id}/loginhistory`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: LOGINHISTORY_SUCCESS, payload: loginData.data });
        }

    }
    catch (error) {
        dispatch({
            type: LOGINHISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getExtensionHistory = (id = "") => async (dispatch, getState) => {
    dispatch({ type: EXTENSION_HISTORY_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            const extentionData = await Axios.get(RESOURCE.API_HOST + `/api/auction/${id}/extensionhistory`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: EXTENSION_HISTORY_SUCCESS, payload: extentionData.data });
        }
    }
    catch (error) {
        dispatch({
            type: EXTENSION_HISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const supplier401Handle = () => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNOUT_SUCCESS, payload: {} });
    }
    catch {

    }
}




