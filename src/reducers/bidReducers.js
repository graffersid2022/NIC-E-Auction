import {BIDDATA,BIDHISTORY,SUPPLEIRWISEBID,
    RANK_FAIL, RANK_REQUEST, RANK_SUCCESS,
    PLACE_BID_FAIL,PLACE_BID_REQUEST,PLACE_BID__SUCCESS,
    BID_HISTORY_FAIL,BID_HISTORY_REQUEST,BID_HISTORY_SUCCESS,
    SUPPLIER_HISTORY_FAIL,SUPPLIER_HISTORY_REQUEST,SUPPLIER_HISTORY_SUCCESS,

} from '../constants/bidConstant'


export const bidReducers = (state = {}, action) => {
    switch (action.type) {
        case BIDDATA:
            return {...state,bid_Data:action.payload}
        case BIDHISTORY:
            console.log("BIDHISTORY")
            return {...state,bid_history:action.payload}
        case SUPPLEIRWISEBID:
            return {...state,supplier_wise_bid:action.payload}
        default:
            return state;
    }
};

export const rankReducer = (state = { rank_loading: true }, action) => {
    switch (action.type) {
        case RANK_REQUEST:
            return { rank_loading: true };
        case RANK_SUCCESS:
            return { rank_loading: false, bid_Data: action.payload };
        case RANK_FAIL:
            return { rank_loading: false, error: action.payload };
        default:
            return state;
    }
};

export const placebidReducer = (state = { place_bid_loading: true }, action) => {
    switch (action.type) {
        case PLACE_BID_REQUEST:
            return { place_bid_loading: true };
        case PLACE_BID__SUCCESS:
            return { place_bid_loading: false};
        case PLACE_BID_FAIL:
            return { place_bid_loading: false, error: action.payload };
        default:
            return state;
    }
};


export const historybidReducer = (state = { bid_history_loading: true }, action) => {
    switch (action.type) {
        case BID_HISTORY_REQUEST:
            return { bid_history_loading: true };
        case BID_HISTORY_SUCCESS:
            return { bid_history_loading: false,bid_history:action.payload};
        case BID_HISTORY_FAIL:
            return { bid_history_loading: false, error: action.payload };
        default:
            return state;
    }
};


export const supplierHistoryReducer = (state = { bid_history_loading: true }, action) => {
    switch (action.type) {
        case SUPPLIER_HISTORY_REQUEST:
            return { supplier_history_loading: true };
        case SUPPLIER_HISTORY_SUCCESS:
            return { supplier_history_loading: false,supplier_wise_bid:action.payload};
        case SUPPLIER_HISTORY_FAIL:
            return { supplier_history_loading: false, error: action.payload };
        default:
            return state;
    }
};