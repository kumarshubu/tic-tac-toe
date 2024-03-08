import React, { useEffect } from 'react'
import Board from './components/board/BoardOptimised'
import Login from './components/login'
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Login />} />
        <Route path="/game" element={<Board />} />
      </Routes>
    </Router>
  )
}
