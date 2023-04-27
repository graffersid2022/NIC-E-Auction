import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { stopAuctions } from '../../actions/auctionActions';
import RESOURCE from '../../config/resource';
export default function HaltAuction({ setHalt }) {
    const params = useParams();
    const dispatch = useDispatch();
    const halt = () => {
        dispatch(stopAuctions(params.id));
        setHalt(false);
    };
    return (
        <div class="halt-slide-up">
            <div class="popup-section ">
                <div class="halt-section">
                    <div class="close" onClick={() => setHalt(false)}>Close</div>
                    <div class="halt-tittle">
                        <div><img class="halt-img" src={`${RESOURCE.REFERENCE_LINK}/halt.svg`} alt="" srcset="" /></div>
                        <div class="halt-label"> {RESOURCE.HALT} </div>
                    </div>
                    <div class="message"> {RESOURCE.STOP_AUCTION} </div>

                </div>


                <div class="halt-add-time-btn">
                    <button class="ok add-time-label" onClick={() => halt()}>Ok</button>
                </div>
            </div>
        </div>
    );
}
