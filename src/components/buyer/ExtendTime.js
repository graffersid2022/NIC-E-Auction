import React, { useEffect, useState } from 'react';
import { extendBid } from '../../actions/auctionActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RESOURCE from '../../config/resource';
import LoadingBox from '../LoadingBox';

export default function ExtendTime({ setExtend, extend }) {
    let { extand_loading } = useSelector(state => state.extandTime);
    const params = useParams();
    const dispatch = useDispatch();
    const [time, setTime] = useState("");
    const [error,setError] = useState(false)

    const handleInput=(e)=>{
        const re = /^[0-9\b]+$/ // filter out Only numbers without decimal
        let { value } = e.target
       
        if( re.test(value))
        {
           
            if(value>0)
             { 
             setTime(Number(value))
             setError(false)
            }
         
          
        }
        else{
            setTime(0)
            setError(true)
            }
        
    }
    const addTime = () => {
        if (Number(time) > 0 ) 
        { dispatch(extendBid(params.id, Math.ceil(time))); }

    };

    return (
        <div class="extend-slide-up">
            <div class="popup-section ">
                {
                    extand_loading ? <LoadingBox /> :
                        <>
                            <div class="extend-time-section">
                                <div class="close" onClick={() => setExtend(false)}>Close</div>
                                <div class="timing-tittle">
                                    <div><img class="extend-img" src={`${RESOURCE.REFERENCE_LINK}/extend-time.png`} alt="" srcset="" /></div>
                                    <div class="extend-time-label">{RESOURCE.EXTEND_TIME}</div>
                                </div>
                                <div class="slot">{RESOURCE.ENTER_EXTENSION}</div>
                            </div>

                            <div class="end-time">
                                <div > <input type="text"  placeholder="Time in minutes"  onChange={(e) => handleInput(e)}   />  </div>
                              
                            </div>
                            <div class="extend-time-section ">
                                <div className='timing-tittle'>
                                    {error > 0?<div class="extend-time-label" style={{ color: 'red',fontSize:"12px" }}> Please enter valid Numeric value</div>:null } 
                                </div>
                              
                            </div>
                            <div class="extend-add-time-btn">

                                <button class={time===0?"add-time-label-disable":"add-time-label"} disabled={time===0?true:false} onClick={() => addTime()}> {RESOURCE.ADD_TIME} </button>


                            </div>
                        </>
                }

            </div>
        </div>
    );
}
