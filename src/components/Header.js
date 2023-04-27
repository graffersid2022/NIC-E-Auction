import React, { useEffect, useState } from 'react';
import '../sass/header.scss';
import { useDispatch, } from 'react-redux';
import { signout } from '../actions/userActions';
import { useParams } from 'react-router-dom';
import RESOURCE from '../config/resource';

export default function Header({buyer}) {
  const dispatch = useDispatch();
  const [Time,setTime]= useState(()=>{
    let now = new Date()
    return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
  })
  let params = useParams();

  const signoutUser = () => {
    dispatch(signout(params.id,buyer));
  };
  return (
    <div class="navbar-container">
    
      <div class="navbar-section">
        <div class="logo"><img class="logo-img" src={`${RESOURCE.REFERENCE_LINK}/logo.png`} alt="" /></div>
        <div class="navbar-tittle"><div className='title-center'>{RESOURCE.WELCOME_E_AUCTION}</div><div className='title-center'><iframe src="https://free.timeanddate.com/clock/i8qa5rg4/n2/fs12/fcfff/tct/pct/tt0/tw1/tm1/ta1" frameborder="0" width="100%" height="16" allowtransparency="true"></iframe></div>
</div>
        <div class="logout" onClick={() => signoutUser()}> <img class="logout-img" src={`${RESOURCE.REFERENCE_LINK}/logout.svg`} alt="" /><span className='mobile-logout'>Logout</span> </div>
        
      </div>
    </div>
  );
}
