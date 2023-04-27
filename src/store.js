import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    userSigninReducer,historyReducer,extensionReducer
} from './reducers/userReducers';
import {userAuctionReducers,auctionReducer,extendTimeReducer} from './reducers/auctionReducers'
import {bidReducers,rankReducer,placebidReducer,historybidReducer,supplierHistoryReducer} from './reducers/bidReducers'
import { refreshReducers } from './reducers/refreshReducers';
import { modalReducer } from './reducers/modalReducer';
import { errorMsgReducer } from './reducers/errorMsgReducer';
import { hideCountdownReducer } from './reducers/hideCountdownReducer';
const initialState = {
    userSignin: {
        userInfo: sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):null,
        buyer:{},
        login_history:[],
        extention:[]
    },
    
    auction:{
        auctiondata:null,
        loading:false,
        stop:false,stop_auction:{},

    },
    bid:{
        bid_Data:[],
        bid_history:{},
        supplier_wise_bid:{}
    },
    rank:{},
    refreshAll:false,
    placebid:{},
    all_bid_history:{},
    supplier_history:{},
    auctions:{
        auctiondata:null
    },
    userLogin:{
        login_history:[],
    },
    userExtention:{
        extention:[]
    },
    extandTime:{},
    modal:{show:false,msg:"",readOnly:false},
    errorModal:{ showError:false,errorMsg:"" },
    hideCountdown:false
};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    auction:userAuctionReducers,
    bid:bidReducers,
    refreshAll:refreshReducers,
    rank:rankReducer,
    placebid:placebidReducer,
    all_bid_history:historybidReducer,
    supplier_history:supplierHistoryReducer,
    auctions:auctionReducer,
    userLogin:historyReducer,
    userExtention:extensionReducer,
    extandTime:extendTimeReducer,
    modal:modalReducer,
    errorModal:errorMsgReducer,
    hideCountdown:hideCountdownReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;