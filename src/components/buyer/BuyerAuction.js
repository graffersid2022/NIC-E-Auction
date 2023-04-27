import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuction } from '../../actions/auctionActions';
import { checktoken, getLoginHistory, getExtention, stopAuctions } from '../../actions/userActions';
import { useNavigate, useParams } from "react-router-dom";
import Timecount from '../Timecount';
import '../../sass/buyerAuction.scss';
import { getLatestRank, getSupplierBidHistory, placeBid } from '../../actions/bidValueAction';
import ExtendTime from './ExtendTime';
import HaltAuction from './HaltAuction';
import LoadingBox from '../LoadingBox';
import Modal from '../Modal';
import { convertToLocalTime, calculateTimeDiff, buyerRedirect, getCurrentLocalTime } from '../../utils';
import RESOURCE from '../../config/resource';
import Header from '../Header';
import BiderRank from './BidderRank';
import History from './History';
import AuctionInfo from '../AuctionInfo';
import MobileViewHistory from './MobileViewHistory';
import { isMobileDevice } from '../../utils';
import { set_Show_Modal } from '../../actions/modalAction';
import ErrorPage from '../ErrorPage';

export default function BuyerAuction() {
    const userSignin = useSelector((state) => state.userSignin);
    const refreshAll = useSelector((state) => state.refreshAll);
    const hideCountdown = useSelector((state) => state.hideCountdown);

    let { userInfo, extention, login_history, buyer } = useSelector((state) => state.userSignin);
    let auction = useSelector((state) => state.auction);
    let {auction_loading} = useSelector((state)=> state.auctions)
    let { bid_Data, rank_loading } = useSelector((state) => state.rank);
    const [auctionEvent, setAuctionEvent] = useState(3);
    let modal = useSelector((state) => state.modal);
    const [show, setShow] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [halt, setHalt] = useState(false);
    const [extend, setExtend] = useState(false);
    const [supplier, setSupplier] = useState("");
    const [tab, setTab] = useState(2);
    let auctiondata = auction?.auctiondata ? auction.auctiondata : {};
    const params = useParams();
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);
    const [closeModal,setClosemodal]=useState(false)
    const [mobileHistory, setMobileHistory] = useState(false);

   
    const handleResize = () => {// calculating web page screen size for mobile and desktop 
        let mobile = isMobileDevice();
        if (mobile) {

            setIsMobile(true);
        } else {
            setMobileHistory(false);
            setIsMobile(false);
        }
    };
    useEffect(() => {
        // alert("refreshComponent")

        handleResize();
        window.addEventListener("resize", handleResize);
        
        let data =localStorage.getItem("nic-vaults")? JSON.parse(localStorage.getItem("nic-vaults")):null;
        // console.log("data",data)
        if (data !==null  ) {
            if(!userSignin.buyer.userId){

            
                data = data.filter(v => (v.Name === "NIC_Portal"));
                if (data.length > 0) {
                    let payload = {
                        "nictoken": data[0].authentication
                    };
                    // alert(JSON.stringify(payload))
                    dispatch(checktoken(payload));
                }
            }
        }
        else{
           buyerRedirect()
        }
        if (buyer.userId &&  auctiondata?.auction_status !== "Stopped") {//when it will setup and check token then it will execute
            setAuctionEvent(2);
            dispatch(getAuction(params.id, buyer=true));
            if(auctiondata && Object.keys(auctiondata).length>0)
            {expiredTime();}

        }
        if(auctiondata?.auction_status === "Stopped")
        {
            setAuctionEvent(2);
            dispatch(set_Show_Modal("AUCTION_END",false))
        }
       
    }, [  auctiondata?.auction_status, buyer.userId, refreshAll,hideCountdown]);

    const expiredTime = () => {
        console.log("auctiondata",auctiondata)
        if (auctiondata?.start_time) {
            console.log("if expired ")
            let start = new Date(auctiondata.start_time)
            let end = new Date(auctiondata.end_time)
            let now = new Date(auctiondata.current_time)
            console.log(now>end)
            if (now > start && now < end) {// runing
                setAuctionEvent(1);
            }
            else if (now < start) {//not started
                if(!window.auctionStartEvent)
            {    dispatch(set_Show_Modal("AUCTION_NOT_START",false))}
                setAuctionEvent(0);
            }
            else if (now > end ) {//end
                if(!window.auctionEndEvent)
               { dispatch(set_Show_Modal("AUCTION_END",false))}
                setAuctionEvent(2);
                // setClosemodal(true)
            }

        }
        else {
            // setAuctionEvent(3);
            // dispatch(set_Show_Modal("LOADING"))

        }
    };

    const historysupplier = (val) => {//it will call an api for supplier bid history when user click on any supplier name in bidder rand card
        dispatch(getSupplierBidHistory(params.id, val.user_objectid));
        // setTimeout(() => {
        //     setShow(true);
        // }, 100);
        setShow(true);
        setSupplier(val.full_name);
        if (isMobile) {
            setMobileHistory(true);
            setTab(1);
        }
    };

    const classByAuctionEvent = () => { // it is for background blur when it will open any popup
        if ((extend || halt  || mobileHistory || modal.show)) {
            return "container-popup";
        }
        else {
            return "container";
        }
    };

    const closeModals =()=>{
        console.log("closeModals")
        setClosemodal(true)
    }

    
    useEffect(()=>{// it will re-render component when auction popup close
      
    },[modal.show])

   
    return (
        <>
        {
            userInfo?
        
        (userInfo.role==="buyer"?
        <>
        <Header buyer={true} />
            {mobileHistory ? <MobileViewHistory back={setMobileHistory} tab={tab} supplier={supplier} setSupplier={setSupplier} /> : null}
            <div className="buyer-main-container">
                <div className={classByAuctionEvent()}>

                    <div className="header-container">
                        <div className='header-section'>
                            <div className="username">Hello {userInfo ? userInfo.name : ""},</div>
                            <div className="updated-timestamp">{RESOURCE.LAST_UPDATE} {auctiondata ? convertToLocalTime(auctiondata.last_updated_time) : ""}</div>
                        </div>
                        <div> <span onClick={() => { setMobileHistory(true); setTab(2); }}><img className="logout-img history-img" src={`${RESOURCE.REFERENCE_LINK}/history.png`} alt="" srcset="" /></span></div>
                    </div>
                </div>

                <div className={classByAuctionEvent()}>


                    <div className="buyer-section">

                        <AuctionInfo auctiondata={auctiondata} />
                      
                        <BiderRank historysupplier={historysupplier} supplier={supplier} show={show} />
                        {
                             
                             auction_loading?
                                <LoadingBox/>:
                               
                            auctionEvent === 1 ? <Timecount setHalt={setHalt} setExtend={setExtend} auctiondata={auctiondata} id={params.id} /> :
                                auctionEvent === 2 ?
                                    <div className="auction-time white-panel">
                                        <span className="auction-end-time auction-status"> {RESOURCE.AUCTION_END}</span>
                                    </div> :
                                    <div className="auction-time white-panel">
                                        <span className="auction-end-time auction-status"> {RESOURCE.AUCTION_NOT_START}</span>
                                    </div>
                        }
                        <div class="history white-panel" >
                            <div className="history-all" >

                                {
                                    !show ?
                                        <>
                                            <div className="img">
                                                <div style={{ display: "flex" }}> <span> <img className="down-arrow" src={`${RESOURCE.REFERENCE_LINK}/history.png`} alt="" /></span>
                                                    <span className="rec-history">History</span></div>
                                            </div>
                                            <div>
                                                <div> <span className={show ? "myhistory" : "myhistory tabClick"} >History</span></div>
                                            </div>
                                        </> :
                                        <>
                                            <div className="img">

                                                <div>  <span onClick={() => setShow(false)}> <img className='back-btn' src={`${RESOURCE.REFERENCE_LINK}/back_button.svg`} alt="" /></span></div>
                                            </div>
                                            <div><span class="supplier-name">{supplier}</span></div>
                                            <div>
                                                <div> <span className={show ? "tabClick overall" : "overall"} >Bid</span></div>
                                            </div>
                                        </>
                                }
                            </div>

                            <History show={show} setShow={setShow}  supplier={supplier}/>

                        </div>
                    </div>
                </div>


                {halt ? <HaltAuction setHalt={setHalt} />
                    : null
                }

                {
                    extend ?
                        <ExtendTime setExtend={setExtend} extend={extend} />
                        : null
                }

                {
                    modal.show ?
                        <Modal text={RESOURCE.LOADING} showButton={true} /> : null
                }

            </div>
            
        </>:<ErrorPage/>)
        : <LoadingBox/>
        }
        </>
    );
}
