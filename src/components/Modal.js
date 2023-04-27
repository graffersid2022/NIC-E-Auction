import React from 'react';
import '../style/loadingBox.css';
import RESOURCE from '../config/resource';
import { useDispatch, useSelector } from 'react-redux';
import { set_Hide_Modal } from '../actions/modalAction';
export default function Modal({ text, showButton,closeModals=()=>{} }) {
  const {msg,readOnly} = useSelector((state)=>state.modal)
  const dispatch = useDispatch()
  const handleclose = ()=>{
    dispatch(set_Hide_Modal(msg,readOnly))
  }
  return (
    <div class="halt-slide-up">
      <div class="popup-section ">
        <div class="halt-section">
          <div class="close" ></div>
          <div class="halt-tittle">
            <div></div>
            {/* <div class="halt-label">Halt</div> */}
          </div>
          <div class="message">{showButton ?msg==="invalid auction"?"you dont have acces to this auction": RESOURCE[msg] : <img class="loader-img " src={`${RESOURCE.REFERENCE_LINK}/loginloading.gif`} alt="" srcset="" />}</div>

        </div>


        <div class="halt-add-time-btn">
          {showButton ? <button class="ok add-time-label" onClick={()=>handleclose()} >Ok</button> : null}
          {/* <button class="add-time-label" >Cancel</button> */}
        </div>
      </div>
    </div>
  );
}
