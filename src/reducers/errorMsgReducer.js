import { HIDE_ERROR, SHOW_ERROR } from "../constants/errorMsgconstant";

export const errorMsgReducer = (state={},action)=>{
    switch(action.type){
        case HIDE_ERROR:
            return {...state, showError:false,}
        
        case SHOW_ERROR:
            return {showError:true ,errorMsg:action.msg}

        default:
            return state;
    }

}