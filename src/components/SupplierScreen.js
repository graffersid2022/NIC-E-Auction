import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SupplierAuction from './supplier/SupplierAuction';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
export default function SupplierScreen() {
    let {userInfo} = useSelector((state) => state.userSignin);

    useEffect(()=>{
    },[userInfo])

  return (
    <div>
        {
            userInfo ?
            (userInfo.role==="supplier"?<SupplierAuction/>:<ErrorPage/>)
           : <LoginPage/>
        }
    </div>
  )
}
