import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  placeBid } from '../../actions/bidValueAction'
import { useParams } from 'react-router-dom';
import RESOURCE from '../../config/resource';

export default function ReduceBidModal({setReduceModal,reduceAmount}) {
    let { bid_Data ,rank_loading} = useSelector((state) => state.rank);
    let auction = useSelector((state) => state.auction);
    let [minBid,setMinBid] = useState(false)
    const [show,setShow] = useState(false)
    const dispatch = useDispatch();
    let params = useParams()
    bid_Data=bid_Data?bid_Data:[]
    let { auctiondata } = auction

    useEffect(()=>{
        let  bidValue =bid_Data[0]?.bid_value - reduceAmount
        if(reduceAmount>Number(auctiondata?.max_bid_decrement) && Number(auctiondata?.max_bid_decrement))
        {
            setMinBid(true)
        }
        if (Number(auctiondata?.min_bid_decrement) <= reduceAmount) {
            setShow(true)
        }
    },[])
    const placeBidvalue = () => {
        // e.preventDefault()
        let payload = {
            bidValue: bid_Data[0]?.bid_value - reduceAmount
        }
        
        if (Number(auctiondata?.min_bid_decrement) <=  reduceAmount && payload.bidValue>0 && (reduceAmount<=Number(auctiondata?.max_bid_decrement) || !Number(auctiondata?.max_bid_decrement))) {
            setReduceModal(false)
            dispatch(placeBid(payload, params.id))
            // setreduceBid(0)
           
        }
        setReduceModal(false)

       
    }
  return (
    <div class="halt-slide-up">
    <div class="popup-section ">
        <div class="halt-section">
            <div class="close" ></div>
            <div class="halt-tittle">
                <div></div>
                {/* <div class="halt-label">Halt</div> */}
            </div>
            {
                minBid?
                <div class="message">Maximum decrement amount is {(auctiondata?.max_bid_decrement).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AED   </div>:
                show? <div class="message"> {RESOURCE.VALID_AMOUNT} <span style={{color:"#0093E1"}}> {(reduceAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AED</span>  ?
               
                 </div>:
                // <div class="message"> please Enter Equal or Greater Amount from {auctiondata?.min_bid_decrement} </div>
                <div class="message">Your Bid reduce amount<span style={{color:"#0093E1"}}> {(reduceAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AED</span> is less than minimum Bid Reduce Amount of <span style={{color:"#f2711c"}}> {(auctiondata?.min_bid_decrement).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AED</span> . Please check your inputs and try again.</div>
            }
           

        </div>


        <div class="halt-add-time-btn">
            
           
            <button class="add-time-label" onClick={()=>setReduceModal(false)} >Cancel</button>
            {
                show? <button class="ok add-time-label"  onClick={()=>placeBidvalue()} >Ok</button>:
                <button class="ok add-time-label"  onClick={()=>setReduceModal(false)} >Ok</button>
            }
            
        </div>
    </div>
</div>
  )
}
