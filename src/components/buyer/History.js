import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from "react-router-dom"
import { getLoginHistory ,getExtensionHistory} from '../../actions/userActions';
import RESOURCE from '../../config/resource';
import { calculateTimeDiff,announcement,historyTitle} from '../../utils';
import LoadingBox from '../LoadingBox';
export default function History({ show, setShow,supplier }) {
    const [overAllHistory, setOverAllHistory] = useState([]);
    const refreshAll = useSelector((state) => state.refreshAll);

    let { extention, extention_history_loading } = useSelector((state) => state.userExtention);
    let { login_history, login_history_loading } = useSelector((state) => state.userLogin);

    let { supplier_wise_bid, supplier_history_loading } = useSelector((state) => state.supplier_history);
    supplier_wise_bid = supplier_wise_bid ? supplier_wise_bid : [];
    let allHistory = [...extention ? extention : [], ...login_history ? login_history : []];
    const params = useParams();
    const dispatch = useDispatch();
    const ref = useRef(null)
    useEffect(() => {
        dispatch(getLoginHistory(params.id));
        dispatch(getExtensionHistory(params.id));
        const handleClickOutside = (event) => {//it will close supplier wise history popup when user click outside of box
            if (ref.current && !ref.current.contains(event.target)) {
                // console.log("come",show)
                if (!show) {
                    setShow(false);
                    // alert('clicked outside of div')
                }
            }
          };
          document.addEventListener('click', handleClickOutside, true);
          return () => {
            document.removeEventListener('click', handleClickOutside, true);
          };
       
        
    }, [ refreshAll,dispatch]);

    useEffect(()=>{
        allHistory = allHistory.sort(function (a, b) { return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); }).reverse();
        // console.log('allHistory', allHistory);
        setOverAllHistory(allHistory);
    },[supplier_wise_bid[0], login_history.length, extention.length])

  
    return (
        <>
            {
                supplier_history_loading ? <LoadingBox /> :
                    show ?


                        <div ref={ref} class="vertical-scroll-bar-buyer-bid" id="supplier_history14">
                            {
                                supplier_wise_bid.length > 0 ?
                                    supplier_wise_bid.map((val, i) => (
                                        <div className="rank-bidvalue-time">
                                            <div className="item-container"></div>
                                            <div className="item-container"><span className="label">Rank</span></div>
                                            <div className="item-container"><span className="label">Bid Value</span></div>
                                            <div className="item-container"></div>
                                            <div className="item-container"></div>
                                            <div className="item-container"><span className="label">Time</span></div>
                                            <div className="item-container">

                                                {
                                                    supplier_wise_bid[i + 1] ?
                                                        supplier_wise_bid[i].rank < supplier_wise_bid[i + 1].rank ? <img className="down-arrow-2"  src={`${RESOURCE.REFERENCE_LINK}/Up-Arrow.svg`} alt="" />
                                                            : supplier_wise_bid[i].rank > supplier_wise_bid[i + 1].rank ?
                                                                <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/down-arrow.svg`} alt="" />
                                                                : null : null

                                                }
                                           </div>
                                            <div className="item-container"><span className="rank-number"> {val.rank}</span></div>
                                            <div className="item-container"><span className="rank-number">{val.bid_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>
                                            <div className="item-container">
                                                {
                                                    supplier_wise_bid[i + 1] ?
                                                        (supplier_wise_bid[i].user_last_bid_value - supplier_wise_bid[i].bid_value) < 0 ?
                                                            <img className="down-arrow-2"  src={`${RESOURCE.REFERENCE_LINK}/Up-Arrow.svg`} alt="" />
                                                            : (supplier_wise_bid[i].user_last_bid_value - supplier_wise_bid[i].bid_value) > 0 ?
                                                                <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/down-arrow.svg`} alt="" />
                                                                : null
                                                        : null
                                                }
                                            </div>
                                            <div className="item-container">
                                           
                                                <span
                                                    className="time-tracker-aed">{val.user_last_bid_value - val.bid_value} AED </span></div>
                                            <div className="item-container"><span className="time-tracker-aed">{calculateTimeDiff(val.timestamp)}</span></div>
                                        </div>
                                    )) : null
                            }

                        </div>



                        :
                        <div class="vertical-scroll-bar-buyer-history">
                            {
                                supplier_history_loading || login_history_loading ?
                                    <LoadingBox /> :


                                    overAllHistory.map(val => (
                                        <div class="history-list-item">
                                            <div class="history-timestamp">{calculateTimeDiff(val.timestamp)}</div>
                                            <div class="history">
                                                <div><img src={`${RESOURCE.REFERENCE_LINK}/Notice-box.png`}  alt="" srcset="" /></div>
                                                <div class="Announcement-detail">
                                                    <div class="announcement-tittle">
                                                       {historyTitle(val)}</div>
                                                    <div class="notice-body">
                                                        {
                                                            announcement(val)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                            }

                        </div>
            }
        </>


    );
}
