import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLatestRank } from '../../actions/bidValueAction';
import { useParams } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import RESOURCE from '../../config/resource';

export default function Rank({}) {
    let { bid_Data,rank_loading } = useSelector((state) => state.rank);
    const refreshAll = useSelector((state) => state.refreshAll)

    bid_Data= bid_Data?bid_Data:[]
    let params = useParams()
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getLatestRank(params.id))
    },[bid_Data?.rank,refreshAll])
  return (
    <>
        {
            rank_loading?<LoadingBox/>:
            <div className="current-section white-panel">
        
              
                <div className="current-rank">
                    <div className="current">
                        <div className="rank-label">{RESOURCE.CURRENT_RANK}</div>
                        <div className="rank-number">{bid_Data[0]?.rank}</div>
                    </div>
                </div>


                <div className="current-bid">
                    <div className="current">
                        <div className="bid-label"> {RESOURCE.CURRENT_BID} </div>
                        <div className="bid-number">{bid_Data[0]?.bid_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                </div>
            </div>
        }
    </>
    
  )
}
