import { HIDE_MODAL,SHOW_MODAL } from "../constants/modalConstant"; 

export const modalReducer = (state={},action)=>{
    switch(action.type){
        case HIDE_MODAL:
            return {...state, show:false,msg:"",readOnly:false}
        
        case SHOW_MODAL:
            return {show:true ,msg:action.msg, readOnly:action.readOnly}

        default:
            return state;
    }

}