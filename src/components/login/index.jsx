import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import './style.css'
const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    sessionStorage.setItem("token",response.accessToken)
    window.location.href="/game"
  };
  const handleFailure = (response) => {
    console.log(response)
  }
  useEffect(()=>{
    sessionStorage.removeItem('token')
  },[])
  return (
    <div style={{flexDirection:"column", background:"linear-gradient(to top, rgb(183, 88, 88,1), rgb(48, 55, 229,0.9))"}} className='centerContent'>
      <div style={{margin:"1rem"}}>
        <img className='logo' src='/assets/logo.png'/>
        <div style={{color:"#FEE3FD", fontWeight:"600"}}>Tic <span style={{color:"#FFF3FD"}}>Tac </span><span style={{color:"#FFF3FD"}}>Toe</span></div>
      </div>
      <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
    </div>
  );
};

export default GoogleLoginButton;
