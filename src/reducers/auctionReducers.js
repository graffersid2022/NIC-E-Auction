import {
    Auction,STOPAUCTION,
    AUCTION_FAIL,AUCTION_REQUEST,AUCTION_SUCCESS,
    EXTEND_FAIL,EXTEND_REQUEST,EXTEND_SUCCESS

} from '../constants/auctionConstant'


export const userAuctionReducers = (state = {}, action) => {
    switch (action.type) {
        case Auction:
            // console.log('userAuctionReducer',action)
            return {...state,auctiondata:action.payload[0],loading:true}
        case STOPAUCTION:
            return {...state,stop_auction:action.payload,stop:true}
        default:
            return state;
    }
};

export const auctionReducer = (state = { auction_loading: true }, action) => {
    switch (action.type) {
        case AUCTION_REQUEST:
            return { auction_loading: true };
        case AUCTION_SUCCESS:
            return { auction_loading: false,auctiondata:action.payload[0]};
        case AUCTION_FAIL:
            return { auction_loading: false, error: action.payload };
        default:
            return state;
    }
};

export const extendTimeReducer = (state = { extand_loading: true }, action) => {
    switch (action.type) {
        case EXTEND_REQUEST:
            return { extand_loading: true };
        case EXTEND_SUCCESS:
            return { extand_loading: false,};
        case EXTEND_FAIL:
            return { extand_loading: false, error: action.payload };
        default:    
            return state;
    }
};