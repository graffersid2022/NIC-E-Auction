import React, { useEffect, useState } from 'react';
//import "../style/SupplierDashboard.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAuction } from '../../actions/auctionActions';
import { placeBid } from '../../actions/bidValueAction';
import { useParams } from 'react-router-dom';
import Modal from '../Modal';
import '../../sass/supplier.scss';
import '../../sass/mobileviewSupplier.scss';
import Timecount from '../Timecount';
import AuctionInfo from '../AuctionInfo';
import History from './History';
import Rank from './Rank';
import MobileViewHistory from './MobileViewHistory';
import { convertToLocalTime, getCurrentLocalTime } from '../../utils';
import Header from '../Header';
import ReduceBid from './ReduceBid';
import ReduceBidModal from './ReduceBidModal';
import { isMobileDevice } from '../../utils';
import RESOURCE from '../../config/resource';
import { set_Show_Modal } from '../../actions/modalAction';
import { supplier401Handle } from '../../actions/userActions';
import ErrorMsgModal from '../ErrorMsgModal';

const SupplierAuction = () => {


    let { userInfo } = useSelector((state) => state.userSignin);
    let { bid_history } = useSelector((state) => state.all_bid_history);
    let { show } = useSelector((state) => state.modal);
    let { showError } = useSelector((state) => state.errorModal);
    const refreshAll = useSelector((state) => state.refreshAll);

    let auction = useSelector((state) => state.auction);
    let { auctiondata } = auction;
    // const []
    const dispatch = useDispatch();
    const [mobileHistory, setMobileHistory] = useState(false);
    const [auctionEvent, setAuctionEvent] = useState(3);
    const [reduceModal, setReduceModal] = useState(false);
    const [reduceAmount, setReduceAmount] = useState(0);
    let params = useParams();
    const hideCountdown = useSelector((state) => state.hideCountdown);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        let mobile= isMobileDevice()
        console.log("mobile",mobile)
        if (mobile) {

            setIsMobile(true);
        } else {
            setMobileHistory(false);
            setIsMobile(false);
        }
    };
    useEffect(() => {
        // alert("use effect 1")
        if(userInfo?.role)
        {
            checkUserRole()
        }
        window.addEventListener("resize", handleResize)
        dispatch(getAuction(params.id));
        if (auctiondata) { expiredTime(); }
    }, [auction.loading, auctiondata?.auction_status,hideCountdown]);




    const expiredTime = () => {
        if (auctiondata) {
            let start = new Date(auctiondata.start_time)
            let end = new Date(auctiondata.end_time)
            let now = new Date(auctiondata.current_time)
            // dispatch(set_Show_Modal("AUCTION_END",true))
            if (now > start && now < end) {
                setAuctionEvent(1);
            }

            else if (now < start) {
                setAuctionEvent(0);
                dispatch(set_Show_Modal("AUCTION_NOT_START",true))
            }//|| auctiondata.auction_status === "Stopped"

            else if (now > end ) {
                console.log(now,end)
                setAuctionEvent(2);
                dispatch(set_Show_Modal("AUCTION_END",true))
            }
        }
        else {
            // setAuctionEvent(3);
            dispatch(set_Show_Modal("LOADING"))
        }
    };

    useEffect(()=>{
        // alert("use effect 2")
    },[show,showError])

  
    const classByAuctionEvent = () => {
        if (  reduceModal || mobileHistory || show || showError) {
            return "container-popup";
        }
        else {
            return "container";
        }
    };
    const checkUserRole=()=>{
        if(userInfo.role!=="supplier")
        {
           dispatch( supplier401Handle())
        }
    }

    return (
        <> <Header buyer={false} />
            {mobileHistory ? <MobileViewHistory back={setMobileHistory} bid_history={bid_history} /> : null}
            
            <div className="supplier-main-container" style={isMobile ? { overflow: "hidden" } : {}}>

                <div className="header-container ">
                    <div className='header-section'>
                        <div className="username">Hello {userInfo ? userInfo.name : "Riaz Corporation Pvt. Ltd."}, </div>

                        <div className="updated-timestamp">

 {RESOURCE.LAST_UPDATE} {auctiondata ? convertToLocalTime(auctiondata.last_updated_time) : ""}</div>
                    </div>
                    <div> <span onClick={() => setMobileHistory(true)}><img className="logout-img history-img" alt="" srcset="" src={`${RESOURCE.REFERENCE_LINK}/history.png`} /></span></div>
                </div>
                {/* <span onClick={() => setMobileHistory(true)}><img className="logout-img history-img" src="../../History.png" alt="" srcset="" /></span> */}

                

                <div className={classByAuctionEvent()}>

                    <div className="supplier-section">


                        {auctionEvent===0?
                       <div className="">
                       {/* <span className="auction-end-time"></span> */}
                        </div>:
                        <>
                        
                        <AuctionInfo auctiondata={auctiondata} />

                        <Rank />
                          <ReduceBid auctionEvent={auctionEvent} setReduceModal={setReduceModal} setReduceAmount={setReduceAmount} />
                          <div className='empty .white-panel'></div>
                        {
                            auctionEvent === 1 ? <Timecount auctiondata={auctiondata} setExtend="" setHalt="" id={params.id} /> :
                                auctionEvent === 2 ?
                                    <div className="auction-time white-panel">
                                        <span className="auction-end-time auction-status"> {RESOURCE.AUCTION_END}</span>
                                    </div> :
                                    <div className="auction-time white-panel">
                                        <span className="auction-end-time auction-status"> {RESOURCE.AUCTION_NOT_START}</span>
                                    </div>
                        }
                        <History />
                      
                        </>
                       
                        }
                       
                        

                    </div>

                </div>
                {
                    show ?
                        <Modal text={RESOURCE.LOADING} showButton={true} /> : null
                }
                {
                    reduceModal ? <ReduceBidModal setReduceModal={setReduceModal} reduceAmount={reduceAmount} /> : null
                }
                {
                    showError? <ErrorMsgModal/>:null
                }

            </div>
        </>
    );
};

export default SupplierAuction;