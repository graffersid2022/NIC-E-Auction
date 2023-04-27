import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExtensionHistory, getLoginHistory } from '../../actions/userActions';
import { formatDateddMMMYYYY, calculateTimeDiff, announcement, historyTitle } from '../../utils';
import '../../sass/mobileviewSupplier.scss'
import RESOURCE from '../../config/resource';
export default function MobileViewHistory({ back,tab,supplier ,setSupplier}) {
    let { extention } = useSelector((state) => state.userExtention);
    let { login_history } = useSelector((state) => state.userLogin);
    let {  supplier_wise_bid,supplier_history_loading } = useSelector((state) => state.supplier_history);
    // const [tab, setTab] = useState(2)
    const [overAllHistory, setOverAllHistory] = useState([])
    const [fullview,setFullview]= useState(false)
    let params = useParams()
    const dispatch = useDispatch();
    let allHistory = []
    // supplier_wise_bid=supplier_wise_bid?.slice(0,5)
    if (extention?.length > 0 || login_history?.length>0 ) { allHistory = [...extention, ...login_history] }
    useEffect(() => {
        dispatch(getLoginHistory(params.id))
        dispatch(getExtensionHistory(params.id))

        allHistory = allHistory.sort(function (a, b) { return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime() }).reverse()
        // console.log('allHistory', allHistory)
        setOverAllHistory(allHistory)
    }, [extention?.length,supplier_wise_bid?.length,login_history?.length])

    
    return (
        <div className={fullview? "slide-up-expand":"slide-up-minimize"}>
            <div  className={fullview?"fullview popup-section":"popup-section"}>
                <div class="container">


                    <div class="header-history-section">
                        <div onClick={() =>{setSupplier("")
                             back(false)}}><img src={`${RESOURCE.REFERENCE_LINK}/back_button.svg`} alt="" /></div>
                        {/* <div class="back" onClick={() => back(false)}>BACK</div> */}
                    </div>


                    <div class="header-history-section">
                        {/* <div><img  src={`${RESOURCE.REFERENCE_LINK}/history.png`} alt="" /></div>
                         */}
                        {
                            supplier===""?<div class="pre-history">History</div>:  <div> {supplier} </div>  
                        }
                      
                    </div>
                  

                    <div>
                        {
                            fullview?<div onClick={()=>setFullview(false)}><img src={`${RESOURCE.REFERENCE_LINK}/mini.png`} alt="" /></div>:
                            <div onClick={()=>setFullview(true)}><img src={`${RESOURCE.REFERENCE_LINK}/expand-arrows.png`}  alt="" /></div>
                        }
                     
                    </div>

                </div>
                        

                <div class="bid-updates-section">
                    {/* <div  className={tab===1?"bid-tittle activeTab":"bid-tittle inactiveTab"} onClick={()=>setTab(1)}>My Bid</div> */}
                    {/* <div  className={tab===2?"updates activeTab":"updates inactiveTab"} onClick={()=>setTab(2)}>History</div> */}
                   
                </div>

            {
                tab===2?
                <div class="vertical-scroll-bar">
                
                    {
                        overAllHistory.length > 0 ?
                            overAllHistory.map(val => (
                                <div class="history-list-item">
                                    <div class="history-timestamp"> {calculateTimeDiff(val.timestamp)}</div>
                                    <div class="history">
                                        <div><img  src={`${RESOURCE.REFERENCE_LINK}/Notice-box.png`} alt="" srcset="" /></div>
                                        <div class="Announcement-detail">
                                            <div class="announcement-tittle">{historyTitle(val)}</div>
                                            <div class="notice-body">

                                                {
                                                    announcement(val)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : null
                    }

                  
                </div>
                :
                <div className='vertical-scroll-bar-supplier-rank'>
{
                            supplier_wise_bid?
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
                                                supplier_wise_bid[i].rank < supplier_wise_bid[i + 1].rank ?
                                                        <img className="down-arrow-2"  src={`${RESOURCE.REFERENCE_LINK}/Up-Arrow.svg`} alt="" />

                                                        : supplier_wise_bid[i].rank > supplier_wise_bid[i + 1].rank ?
                                                            <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/down-arrow.svg`} alt="" />
                                                            : null : null
                                            }

                                          
                                        </div>
                                        <div className="item-container"><span className="rank-number"> {val.rank} </span></div>
                                        <div className="item-container"><span className="rank-number">{val.bid_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>
                                        <div className="item-container">
                                        {
                                            supplier_wise_bid[i + 1] ?
                                                (supplier_wise_bid[i].user_last_bid_value - supplier_wise_bid[i].bid_value) < 0 ?
                                                    <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/Up-Arrow.svg`} alt="" />
                                                    : (supplier_wise_bid[i].user_last_bid_value - supplier_wise_bid[i].bid_value) >0 ?
                                                        <img className="down-arrow-2" src={`${RESOURCE.REFERENCE_LINK}/down-arrow.svg`} alt="" />
                                                        : null
                                                : null
                                        }
                                        </div>

                                        <div className="item-container"> <span
                                            className="aed">{(val.user_last_bid_value - val.bid_value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {RESOURCE.AED}</span></div>
                                        <div className="item-container"><span className="time-tracker-aed">{calculateTimeDiff(val.timestamp)}</span></div>
                                    </div>
                                )) : null
                        }


                </div>
                }




            </div>

        </div>
    )
}
