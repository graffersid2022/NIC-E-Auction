import Axios from 'axios';
import {
    Auction, STOPAUCTION,
    AUCTION_FAIL, AUCTION_REQUEST, AUCTION_SUCCESS,
    EXTEND_FAIL, EXTEND_REQUEST, EXTEND_SUCCESS
} from '../constants/auctionConstant';
import { useDispatch, useSelector } from 'react-redux';
import { supplier401Handle } from './userActions';
import RESOURCE from '../config/resource';
import { set_Show_Modal } from './modalAction';
export const getAuction = (id = "",buyer=false) => async (dispatch, getState) => {
    dispatch({ type: AUCTION_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {

        if (id !== "") {
            const { data, status } = await Axios.get(RESOURCE.API_HOST + "/api/auction/" + id, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });

            if(data.length===0 && !buyer)
            {
                // dispatch(supplier401Handle());
                dispatch(set_Show_Modal())
            }
            dispatch({ type: Auction, payload: data });
            dispatch({ type: AUCTION_SUCCESS, payload: data });

        }

    }
    catch (error) {
       
        dispatch({
            type: AUCTION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        if(error.response.status===401)
        {
           
            dispatch(set_Show_Modal("invalid auction",true))
        }
        else{
           
        }
       
       
    }
};

export const stopAuctions = (id = "") => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        if (id !== "") {
            const { data } = await Axios.get(RESOURCE.API_HOST + `/api/auction/${id}/stop`, {
                headers: { Authorization: `Bearer ${userInfo?.token}` },
            });
            dispatch({ type: STOPAUCTION, payload: data });
            window.location.reload()
        }
    }
    catch {

    }
};

export const extendBid = (id = "", time = 5) => async (dispatch, getState) => {
    dispatch({ type: EXTEND_REQUEST });
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
            dispatch({ type: EXTEND_SUCCESS });
            window.location.reload();
        }
    }
    catch (error) {
        dispatch({
            type: EXTEND_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

