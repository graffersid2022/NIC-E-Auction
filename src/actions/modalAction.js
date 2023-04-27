import { HIDE_MODAL, SHOW_MODAL } from "../constants/modalConstant"
import RESOURCE from "../config/resource";

export const  set_Hide_Modal = (msg,readOnly)=> (dispatch,getState)=>{
    let redirectUrl = window.location.href.indexOf('buyer')!==-1?RESOURCE.BUYER_REDIRECT:RESOURCE.SUPPLIER_REDIRECT
    if((msg==="AUCTION_NOT_START" && readOnly)|| msg==="invalid auction" )
    {
        window.location.href = redirectUrl
    }
    if(msg==="AUCTION_NOT_START")
    {
        window.auctionStartEvent = true
    }
    else{
        window.auctionEndEvent = true
    }
   
    dispatch({type:HIDE_MODAL,})
}

export const set_Show_Modal =(msg="",readOnly=false)=>(dispatch)=>{
    dispatch({type:SHOW_MODAL,msg:msg,readOnly:readOnly})
}