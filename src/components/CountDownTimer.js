import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentLocalTime } from '../utils';

const CountDownTimer = (targetDate ,currentDate) => {
  let {stop,auctiondata} = useSelector((state) => state.auction);

  let diff = (new Date(auctiondata.end_time).getTime()-new Date(auctiondata.current_time).getTime())
  const countDownDate = diff

  const refreshAll = useSelector((state) => state.refreshAll)

  const [countDown, setCountDown] = useState(diff);

  useEffect(() => {
    let interval
    if(!stop)
    {
      
      if(countDownDate >0)
          { 
            
            window.count=1000
            interval = setInterval(() => {
             
             setCountDown(countDownDate - window.count);
             window.count=window.count+1000
        }, 1000);}
    }
    console.log("interval",interval)
    return () => clearInterval(interval);
  }, [countDownDate,refreshAll]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { CountDownTimer };