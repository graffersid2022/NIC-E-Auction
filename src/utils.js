import RESOURCE from "./config/resource";
import SERVER_DATA from "./config/mFile";
export const formatDateddMMMYYYY = (date)=>{
    const monthsName = RESOURCE.MONTH_LIST;
     date = new Date(date)
     let day = date.getDate()
     let month = monthsName[Number(date.getMonth())]
     let year = date.getFullYear()

     return `${day}-${month}-${year}`

   }

export   const convertTo12Hr = (date)=>{
    let str = 'am'
    date = new Date(date)
    let hours = date.getHours()
    let min = date.getMinutes()
    if (hours>12)
    {
        str='pm'
        hours-=12
    }
    if(hours<10)
    {hours="0"+hours}
    if(min<10)
    {min="0"+min}
    return hours+":"+min+" "+str

}

export const convertToLocalTime = (time) => {
    if(!time)
    {
      return ""
    }
    var isoDateTime = new Date(time);
    return formatDateddMMMYYYY(isoDateTime.toLocaleDateString()) + " " + isoDateTime.toLocaleTimeString();
}

export const calculateTimeDiff=(bidTime)=>{
    var isoDateTime = new Date(bidTime);
    bidTime = isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
    // console.log(bidTime)
    bidTime = new Date(bidTime)
    var now = new Date().getTime();
    var ms = (now - bidTime.getTime());
    var days = Math.round(ms / 86400000); // days
    var hrs = Math.round((ms % 86400000) / 3600000); // hours
    var mins = Math.round(((ms % 86400000) % 3600000) / 60000); // minutes
  
    if (days > 0) {
      return days + ' day ago'
    } else if (hrs > 0) {
      return hrs + ' hour ago'
    } else if (mins > 0) {
      return mins + ' min ago'
    } else {//from  ww w .j  a v a 2s .  c o  m
      return 'just now'
    }
}

export  const announcement=(val)=>{
    if(val.user_type==="buyer")
    {
        return RESOURCE[val.change_type].replace("{added_time}",val.added_time)
            
    }
    
    else{

      if(val.change_type==="bid_placed")
      {
        return `${val.user_name} reduce bid to ${(val.bid_value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AED `
      }
      if(val.change_type==="auto_extend")
      {
        return RESOURCE[val.change_type].replace("{added_time}",val.added_time)
      }
        return val.user_name+"  logged-in "+calculateTimeDiff(val.timestamp)
    }
        
   }

 export  const isMobile = function (a) {
    return /mobile|ip(hone|od|ad)|android|blackBerry|iemobile|kindle|netfront|silk-accelerated|(hpw|web)os|fennec|minimo|opera m(obi|ini)|blazer|dolfin|dolphin|skyfire|zune/.test(a);
    };
const isTablet = function (a) {
    return /ipad/.test(a) || /android/.test(a) && /(chrome\/[.0-9]* (?!mobile))/.test(a) || -1 < a.indexOf("mozilla/5.0") && -1 < a.indexOf("android ") && -1 < a.indexOf("applewebkit") && /(?!mobile)/.test(a) && !(-1 < a.indexOf("chrome"));
};
export const getDeviceType = () => {
    if (isMobile(navigator.userAgent.toLowerCase())) {
        var a = "phone";
        isTablet(navigator.userAgent.toLowerCase()) && (a = "tablet");
    } else
        a = "desktop";
    return a;
}

export const isMobileDevice = ()=>{
  // alert( window.innerWidth )
  if( window.innerWidth > 1024 )
  {
    return false
  }
  return true
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
  });
}

export const buyerRedirect = ()=>{
  // alert("redirect")
  let baseUrl = window.location.href;
  window.location.href = `${SERVER_DATA.REDIRECT_URL_BUYER}${fixedEncodeURIComponent(baseUrl)}`;
}

export const getCurrentLocalTime = (currentDate)=>{
  // alert("hello")
  let diff = (new Date().getTime()-new Date(currentDate).getTime())
  let timeDiff = 0
  if(diff>5000 || diff<-5000)
      {
        timeDiff= diff*-1
      }
      if(!window.timeDiff)
      {window.timeDiff=timeDiff}
      console.log(new Date().getTime()+window.timeDiff)
  return (new Date().getTime()+window.timeDiff)
}

export   const historyTitle=(val)=>{
  if(val.user_type === "supplier" && val.change_type==="bid_placed")
  {
      return `${val.user_name} placed bid`
  }

  if(val.user_type === "supplier" && val.change_type !== "auto_extend")
  {
      return "Supplier Logged-in"
  }
  return `Auction ${val.change_type}`
}