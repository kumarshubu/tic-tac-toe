import React, { useEffect } from 'react'
import TwoPlayerBoard from './components/board/BoardOptimised'
import Login from './components/login'
import Home from './components/home'
import {gapi} from 'gapi-script'
import {  BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css'
export default function App() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:process.env.REACT_APP_CLIENT_ID,
        scope:""
      })
    }
    gapi.load('client:auth2',start)
  },[])

  useEffect(() => {
    if(window.location.pathname!="/"){
      let token = sessionStorage.getItem('token')
      if(!token){
        window.location.href = "/"
      }
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/twoPlayer" element={<TwoPlayerBoard />} />
        {/* <Route path="/multiPlayer" element={<Board />} />
        <Route path="/multiPlayerSuper" element={<Board />} />
        <Route path="/leaderBoard" element={<Board />} /> */}
      </Routes>
    </Router>
  )
}
