
import RESOURCE from "../config/resource";
import { HIDE_ERROR, SHOW_ERROR } from "../constants/errorMsgconstant";

export const  setHideError = ()=> (dispatch,getState)=>{
    
    dispatch({type:HIDE_ERROR})
}

export const setShowError =(msg="")=>(dispatch)=>{
    
    // alert("run")
    dispatch({type:SHOW_ERROR,msg:msg})

    setTimeout(()=>{
        dispatch({type:HIDE_ERROR})
    },3000)
}