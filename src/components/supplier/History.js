import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateddMMMYYYY, calculateTimeDiff, announcement } from '../../utils';
import { useParams } from 'react-router-dom';
import { getBidHistory } from '../../actions/bidValueAction';
import { getExtensionHistory, getLoginHistory } from '../../actions/userActions';
import LoadingBox from '../LoadingBox';
import RESOURCE from '../../config/resource';
import { getAuction } from '../../actions/auctionActions';

export default function History({ }) {
    let { extention, extention_history_loading } = useSelector((state) => state.userExtention);
    let { login_history, login_history_loading } = useSelector((state) => state.userLogin);
    // let { bid_Data ,rank_loading} = useSelector((state) => state.rank);
    let { bid_history, bid_history_loading } = useSelector((state) => state.all_bid_history);
    const refreshAll = useSelector((state) => state.refreshAll);
    const [tab, setTab] = useState(1);
    const [overAllHistory, setOverAllHistory] = useState([]);
    let params = useParams();
    const dispatch = useDispatch();

    // if(bid_history)//remove 0 AED reduce records
    // {bid_history = bid_history.filter(val=>((val.user_last_bid_value - val.bid_value)>0))}

    useEffect(() => {
        dispatch(getLoginHistory(params.id));
        dispatch(getBidHistory(params.id));
        dispatch(getExtensionHistory(params.id));
        dispatch(getAuction(params.id));//to update countdown time
    }, [ refreshAll,dispatch]);

    useEffect(()=>{
        let allHistory = [];
        if (extention?.length > 0 || login_history.length > 0) { allHistory = [...extention, ...login_history]; }

        allHistory = allHistory.sort(function (a, b) { return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); }).reverse();
        // console.log('allHistory', allHistory);
        setOverAllHistory(allHistory);

    },[extention?.length, login_history.length])//it will update the component when it will get data from api


    return (
        <>
            {
                bid_history_loading ? <LoadingBox /> :
                    <div className="history white-panel">
                        <div className="history-all">
                            <div className="img"><span> <img className="down-arrow" src={`${RESOURCE.REFERENCE_LINK}/history.png`} alt="" /></span> <span
                                className="rec-history">History</span></div>
                            <div><span className={tab === 1 ? "myhistory tabClick" : "myhistory"} onClick={() => setTab(1)}>My History</span> <span className={tab === 2 ? "tabClick overall" : "overall"} style={{ cursor: "pointer" }} onClick={() => setTab(2)}>Overall</span></div>
                        </div>
                        {
                            tab === 1 ?
                                <div className='vertical-scroll-bar-supplier-rank'>
                                    {
                                        bid_history ?
                                            bid_history.map((val, i) => (
                                                <div className="rank-bidvalue-time">
                                                    <div className="item-container"></div>
                                                    <div className="item-container"><span className="label">{RESOURCE.RANK}</span></div>
                                                    <div className="item-container"><span className="label">{RESOURCE.BID_VALUE}</span></div>
                                                    <div className="item-container"></div>
                                                    <div className="item-container"></div>
                                                    <div className="item-container"><span className="label">{RESOURCE.TIME}</span></div>
                                                    <div className="item-container">
                                                        {
                                                            bid_history[i + 1] ?
                                                                bid_history[i].rank < bid_history[i + 1].rank ?
                                                                    <img className="down-arrow-2"  src={`${RESOURCE.REFERENCE_LINK}/Up-Arrow.svg`} alt="" />

                                                                    : bid_history[i].rank > bid_history[i + 1].rank ?
                                                                        <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/down-arrow.svg`} alt="" />
                                                                        : null : null
                                                        }

                                                        {/* <img className="down-arrow-1" src="../../Down-Arrow.png" alt="" /> */}
                                                    </div>
                                                    <div className="item-container"><span className="rank-number"> {val.rank} </span></div>
                                                    <div className="item-container"><span className="rank-number">{val.bid_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>
                                                    <div className="item-container">
                                                        {

                                                            (bid_history[i].user_last_bid_value - bid_history[i].bid_value) < 0 ?
                                                                <img className="down-arrow-2"  src={`${RESOURCE.REFERENCE_LINK}/Up-Arrow.svg`} alt="" />
                                                                : (bid_history[i].user_last_bid_value - bid_history[i].bid_value) > 0 ?
                                                                    <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/down-arrow.svg`} alt="" />
                                                                    : null

                                                        }
                                                    </div>

                                                    <div className="item-container"> <span
                                                        className="aed">{(val.user_last_bid_value - val.bid_value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {RESOURCE.AED}</span></div>
                                                    <div className="item-container"><span className="time-tracker-aed">{calculateTimeDiff(val.timestamp)}</span></div>
                                                </div>
                                            )) : null
                                    }


                                </div> :
                                <div class="vertical-scroll-bar-supplier-overall" style={{
                                    "overflow-x": "hidden",
                                    "overflow-y": "auto"
                                }}>
                                    {
                                        extention_history_loading || login_history_loading ?
                                            <LoadingBox /> :


                                            overAllHistory.map(val => (
                                                <div class="history-list-item">
                                                    <div class="history-timestamp">Date : {formatDateddMMMYYYY(val.timestamp.split('T')[0])}</div>
                                                    <div class="history">
                                                        <div><img src={`${RESOURCE.REFERENCE_LINK}/Notice-box.png`} alt="" srcset="" /></div>
                                                        <div class="Announcement-detail">
                                                            <div class="announcement-tittle">{val.user_type === "supplier" ? "Supplier Logged-in" : `Auction ${val.change_type}`}</div>
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
                    </div>
            }
        </>


    );
}
