import Axios from 'axios';
import {
    BIDDATA,
    BIDHISTORY,
    SUPPLEIRWISEBID,
    RANK_FAIL, RANK_REQUEST, RANK_SUCCESS,
    PLACE_BID_FAIL, PLACE_BID_REQUEST, PLACE_BID__SUCCESS,
    BID_HISTORY_FAIL, BID_HISTORY_REQUEST, BID_HISTORY_SUCCESS,
    SUPPLIER_HISTORY_FAIL, SUPPLIER_HISTORY_REQUEST, SUPPLIER_HISTORY_SUCCESS,

} from '../constants/bidConstant';
import { supplier401Handle } from './userActions';
import RESOURCE from '../config/resource';
import { setShowError } from './errorMsgAction';
import { SHOW_ERROR } from '../constants/errorMsgconstant';
export const getLatestRank = (id = "") => async (dispatch, getState) => {
    dispatch({ type: RANK_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            const bid = await Axios.get(RESOURCE.API_HOST + `/api/auction/${id}/bid`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: RANK_SUCCESS, payload: bid.data });
        }
    } catch (error) {
        if(error.response.status===401 && !window.refresh)
        {
            window.refresh=true
            getLatestRank(id)
        }
        dispatch({
            type: RANK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const placeBid = (payload, id = "") => async (dispatch, getState) => {
    dispatch({ type: PLACE_BID_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            const bid = await Axios.post(RESOURCE.API_HOST + `/api/auction/${id}/bid`, payload, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: PLACE_BID__SUCCESS });
            // dispatch(setShowError(RESOURCE.BID_FAILED_MSG))
            // window.location.reload()
        }
    }
    catch (error) {
        if(error.response.status===401)
        {
            dispatch(setShowError(RESOURCE.BID_FAILED_MSG))
            // dispatch(supplier401Handle());
        }
        
        dispatch({
            type: PLACE_BID_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
      
    }
};

export const getBidHistory = (id = "") => async (dispatch, getState) => {
    dispatch({ type: BID_HISTORY_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            const bid = await Axios.get(RESOURCE.API_HOST + `/api/auction/${id}/bidhistory`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: BID_HISTORY_SUCCESS, payload: bid.data });
        }
    }
    catch (error) {
        dispatch({
            type: BID_HISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });

    }
};


export const extendBid = (id = "", time = 5) => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            let payload = {
                extendTime: time
            };
            const bid = await Axios.patch(RESOURCE.API_HOST + `/api/auction/${id}/extendtime`, payload, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            window.location.reload();
        }
    }
    catch {

    }
};

export const getSupplierBidHistory = (id = "", supplier = "") => async (dispatch, getState
) => {
    dispatch({ type: SUPPLIER_HISTORY_REQUEST });

    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "" && supplier !== "") {
            const bid = await Axios.get(RESOURCE.API_HOST + `/api/auction/${id}/bidhistory/${supplier}`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: SUPPLIER_HISTORY_SUCCESS, payload: bid.data });
        }
    }
    catch (error) {
        dispatch({
            type: SUPPLIER_HISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });

    }
};