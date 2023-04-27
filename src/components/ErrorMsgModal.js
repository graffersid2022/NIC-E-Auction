import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setHideError } from '../actions/errorMsgAction'
export default function ErrorMsgModal() {
    const {errorMsg} = useSelector((state)=>state.errorModal)
    const dispatch = useDispatch()
    const handleclose = ()=>{
      dispatch(setHideError())
    }
  return (
    <div class="halt-slide-up">
    <div class="popup-section ">
      <div class="halt-section">
        <div class="close" ></div>
        <div class="halt-tittle">
          <div></div>
        </div>
        <div class="message">{errorMsg}</div>
        <div class="halt-add-time-btn">
        <button class="ok add-time-label" onClick={()=>handleclose()} >Ok</button> 
        </div>
      </div>
    </div>
  </div>
  )
}
