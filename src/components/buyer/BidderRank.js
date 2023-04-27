import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from "react-router-dom"
import { getLatestRank } from '../../actions/bidValueAction';
import RESOURCE from '../../config/resource';
import { convertTo12Hr, convertToLocalTime } from '../../utils';
import LoadingBox from '../LoadingBox';

export default function BiderRank({historysupplier,supplier,show}) {
  let {bid_Data,rank_loading} = useSelector((state) => state.rank);
  const refreshAll = useSelector((state) => state.refreshAll)
  const [name,setName]= useState("")
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getLatestRank(params.id))

    },[refreshAll])

    const handleClick=(selectedSupplier)=>{
        setName(selectedSupplier.user_objectid)
        historysupplier(selectedSupplier)//  it will call an api of supplier bid history 
    }

    useEffect(()=>{

    },[show])//it will remove back ground color  if user close supplier wise hostory
  return (
    <>
     {
        rank_loading?<LoadingBox/>:
        <div class="bidder-section" id='bidder-section'>
        
        <div class="bidder-ranks">
            <div class="rank-tittle">{RESOURCE.BIDDER_RANK}</div>
            <div><span class="total-bidders">{RESOURCE.TOTAL_BIDDER}</span> <span
                class="total-bidders-number">{bid_Data?.length}</span></div>
        </div>

        <div class="vertical-scroll-bar-buyer-bidder-rank">

            {
                bid_Data && bid_Data.length > 0 ?
                    bid_Data.map(val => (
                        <div class="bidder-container " onClick={() => handleClick(val)}  style={name===val.user_objectid && show?{backgroundColor:"#e5e5ef"}:{cursor:"pointer"}} >
                            <div class="history-timestamp"></div>
                            <div class="bidder-item-label">
                                <div class="rank-id">
                                    <div class="rank-label">{RESOURCE.RANK}</div>
                                    <div class="rank-num"> {val.rank}</div>
                                </div>
                            </div>
                            <div class="bidder-item-list">
                                <div class="name-body"> {val.full_name}</div>
                                <div class="login-label"><img style={{height:"1em"}} src={`${RESOURCE.REFERENCE_LINK}/${val.login_time?"green-circle.png":"red-circle.png"}`}/> {val.login_time ? `Last login at ${convertTo12Hr(val.login_time)}` : "Not logged-in"} </div>
                            </div>
                            <div class="bidder-item-list">
                                <div class="aed">{RESOURCE.AED}</div>
                            </div>
                            <div class="bidder-item-list">
                                <div class="amount">{val.bid_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            </div>
                            <div class="history-timestamp">{convertToLocalTime(val.timestamp)}</div>
                        </div>
                    )) : null
            }

        </div>
    </div>
     }
    </>

    
  )
}
