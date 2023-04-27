
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../style/SupplierLogin.css';
import { useParams } from 'react-router-dom';
import '../sass/login.scss';
import RESOURCE from '../config/resource';
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showpass,setShowpass] = useState(false)
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    let params = useParams();
    const userSignin = useSelector((state) => state.userSignin);
    console.log(userSignin);
    const { isLoggedIn, loading, error } = userSignin;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        if (username !== "" && password !== "") {
            let auctionCode = params.id;
            e.preventDefault();
            dispatch(signin(username, password, auctionCode));
        }
        else {
            e.preventDefault();
            setErrors({ username: username === "" ? true : false, password: password === "" ? true : false });
        }
    };
    return (
        <div class="login-page">

            <div class="login-background">
                <div>
                    <img class="img" src={`${RESOURCE.REFERENCE_LINK}/bg-img.png`} alt="" />
                </div>
            </div>

            <div class="login-container">
                <div class="login-container-wrapper">


                    <div class="tittle">{RESOURCE.E_AUCTION}</div>
                    <div class="logo"><img src={`${RESOURCE.REFERENCE_LINK}/logo.png`} alt="" /></div>


                    <form action="" onSubmit={submitHandler}>
                       
                        <div class="login-form">
                            <div class="login-label">{RESOURCE.SUPPLIER_LOGIN}</div>
                            <div class="login-message">{RESOURCE.ENTER_LOGIN_DETAILS}</div>
                        </div>


                        <div class="login">
                            <div>
                                <div class="input-container">
                                    <img class="icon" src={`${RESOURCE.REFERENCE_LINK}/username-icon.svg`} />
                                    <input class="input-field" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

                                </div>
                                {errors.username ? <span style={{ color: 'red' }}>{RESOURCE.USERNAME}</span> : null}
                                <div class="input-container">
                                    <img class="icon"  src={`${RESOURCE.REFERENCE_LINK}/password-lock-icon.svg`} />
                                    <input class="input-field" type={showpass?"text":"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <img className='pass-icon' onClick={()=>setShowpass(showpass?false:true)} src={`${RESOURCE.REFERENCE_LINK}/${showpass?"show.png":"hide.png"}`} />

                                </div>
                                {errors.password ? <span style={{ color: 'red' }}>{RESOURCE.PASSWORD}</span> : null}
                                {
                                    loading ? <LoadingBox /> : <button class="sign-in">{RESOURCE.SIGN_IN}</button>
                                }

                            </div>

                        </div>
                        {error && <MessageBox variant="danger">{"Invalid credentials. please try again"}</MessageBox>}
                    </form>
                </div>
            </div>
        </div>
    );
}
