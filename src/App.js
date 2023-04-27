import { Routes, Route } from "react-router-dom";
import SupplierScreen from './components/SupplierScreen';
import BuyerAuction from './components/buyer/BuyerAuction';
import { useDispatch, useSelector } from 'react-redux';
import './sass/main.scss';
//https://devmfiles.nicuae.ae/smartportal/sign-in

import { refreshAll } from './actions/refreshAction';
import { setBuyerToken } from './config/seed';
import { setupSocketClient } from "./config/socketConnection";
function App() {
  const dispatch = useDispatch();
  if(window.location.href.indexOf("localhost")!==-1)
  {
    setBuyerToken()
  }
  
  setupSocketClient(() => {
    dispatch(refreshAll());
  });


  
       
  if(!sessionStorage.getItem("reload_time")){ //set firstime
      console.log("setting time", Date.now())
      sessionStorage.setItem("reload_time", Date.now())
  }
document.addEventListener("visibilitychange", () => {
 
  const minMinutesToPass = 1;
  let currentTime = Date.now();
 
  let lastReloadTime = Number(sessionStorage.getItem("reload_time"));
  let diff = Math.abs(Math.round(((currentTime - lastReloadTime)/1000)/60));
  console.log(diff);
  if(diff>=minMinutesToPass){
 
      sessionStorage.setItem("reload_time", currentTime)
      console.log("reloading",diff);
      window.location.reload();
  }
});

  return (
    <Routes>
      <Route path="/supplier/:id" element={<SupplierScreen />} />
      <Route path="/buyer/:id" element={<BuyerAuction />} />
    </Routes>

  );
}

export default App;
