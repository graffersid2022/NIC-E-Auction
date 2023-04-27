import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RESOURCE from '../../config/resource';

export default function ReduceBid({auctionEvent,setReduceModal,setReduceAmount}) {
    const [reduceBid, setreduceBid] = useState(0)
    let auction = useSelector((state) => state.auction);
    let {readOnly} = useSelector((state)=>state.modal)
    let { bid_Data ,rank_loading} = useSelector((state) => state.rank);
    let { place_bid_loading} = useSelector((state) => state.placebid);
    const refreshAll = useSelector((state) => state.refreshAll)
    bid_Data=bid_Data?bid_Data:[]
    let { auctiondata } = auction
    const dispatch = useDispatch();
    let params = useParams()
    // console.log(Number(auctiondata?.min_bid_decrement))

    useEffect(()=>{
        setreduceBid(0)
    },[place_bid_loading])
    const handleInput = (e) => {
        const re = /^[0-9\b]+$/

        let { value } = e.target
        if(value === '' || re.test(value))
        {
            setreduceBid(Number(value))
        }
    }
    const placeBidvalue = () => {
        setReduceAmount(reduceBid)
            setReduceModal(true)
    }
  return (
    
    
    <div className="amount-section white-panel">
       {
        
        auctionEvent === 1 ?
            <>
                <div className='main'>
                    <div className="amount-bid">
                        <div className="bid"> {RESOURCE.REDUCE_BID_AM0UNT} </div>
                        <div className='input'> <input type='text' disabled={readOnly} className="input-tittle" value={reduceBid} onChange={(e) => handleInput(e)} /></div>
                    </div>
                    <span className='arrow'> <img  src={`${RESOURCE.REFERENCE_LINK}/Right-Arrow.svg`} alt="" /></span>
                    <div className="input-amount">
                        <div className="Calculated"> {RESOURCE.CALCULATED_BID}</div>
                        <div><span className="input-number"> {(bid_Data[0]?.bid_value - reduceBid).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>


                    </div>
                    <div className='button'>

                       
                        <button className="btn" type="button" value="SUMBIT" disabled={readOnly} onClick={placeBidvalue}>Submit</button> 
                    </div>
                </div>
                <div className="error"><span> <img  src={`${RESOURCE.REFERENCE_LINK}/error.png`} alt="" /></span> <span className="decrement"> {RESOURCE.MIN_DECREAMENT} <strong> {(auctiondata?.min_bid_decrement).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {RESOURCE.AED}</strong> </span> </div>

              
            </> :
            auctionEvent === 2 ?
                <span className="auction-end-time"> {RESOURCE.AUCTION_END}</span>
                : <span className="auction-end-time"> {RESOURCE.AUCTION_NOT_START}</span>
        }
    </div>
  )
}
