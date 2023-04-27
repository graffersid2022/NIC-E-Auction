import React, { useEffect } from 'react';
import { CountDownTimer } from './CountDownTimer';
import { useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import RESOURCE from '../config/resource';
import { refreshAll } from '../actions/refreshAction';
import { getAuction } from '../actions/auctionActions';
import { hideCountdown } from '../actions/hideCountdownAction';
import { set_Show_Modal } from '../actions/modalAction';
export default function Timecount({ auctiondata1, setExtend = "", setHalt = "" , id=""}) {
  // console.log("auctiondata",auctiondata)
  let {stop,auctiondata} = useSelector((state) => state.auction);
  
  let change_color = false;
  let { userInfo } = useSelector((state) => state.userSignin);
  let role = userInfo?.role ? userInfo.role : null;
  let [days, hours, minutes, seconds] = CountDownTimer(auctiondata ? new Date(auctiondata.end_time) : new Date()  ,new Date(auctiondata.current_time) );
  const params = useParams();
  const dispatch = useDispatch()
  const refreshComponent = useSelector((state) => state.refreshAll);
  const hideCount = useSelector((state) => state.hideCountdown);

  useEffect(() => {
    // alert("refreshComponent")
    // dispatch(getAuction(id));
  }, [refreshComponent,hideCount]);
  if (seconds < 0) {
    [days, hours, minutes, seconds] = [0, 0, 0, 0];
    window.location.reload()
    // dispatch(set_Show_Modal("AUCTION_END",true))
    // dispatch(hideCountdown())
    // dispatch(refreshAll())
  }
  let auctionEndWarningTime= auctiondata?.auto_extend_mode_on_time?auctiondata?.auto_extend_mode_on_time:30
  if (hours === 0 && minutes < Number(auctionEndWarningTime)) {
    change_color = true;
  }
  const bidHalt = () => {
    setHalt(true);
  };
  const BidTimeExtend = () => {
    setExtend(true);
  };
  return (

    <div class="auction-time white-panel">
      <span class="auction-end-time"> Auction Ends in</span>
      <div class="auction-time-container">
        <div class="end-time">
          <div className={change_color ? "time time-color" : "time"}>
            <div class="num">{hours}</div>
            <div class="units ">{RESOURCE.HOURS}</div>
          </div>
          <div className={change_color ? "time time-color" : "time"}>
            <div class="num">{minutes}</div>
            <div class="units ">{RESOURCE.MIN}</div>
          </div>
          <div className={change_color ? "time time-color" : "time"}>
            <div class="num">{seconds}</div>
            <div class="units ">{RESOURCE.SEC}</div>
          </div>
        </div>


        <span class="halt-color"></span>
        {
          role === "buyer" && !auctiondata?.is_stopped?
            <div class="halt-end-time">
              {
                auctiondata.is_allow_stopauction ? <div class="halt" title="HALT" onClick={() => bidHalt()}><img src={`${RESOURCE.REFERENCE_LINK}/halt.svg`} alt="" /></div> :
                  null
              }

              {auctiondata.is_allow_extension ?
                <div class="extent-time" title="EXTEND TIME" onClick={() => BidTimeExtend()}><img src={`${RESOURCE.REFERENCE_LINK}/extend-time.svg`} alt="" srcset="" />
                </div> : null}
            </div> : null
        }

      </div>
    </div>
  );
}