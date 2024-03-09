import React from 'react'
import './style.css'
function index({data}) {
  const handleClick = () => {
    window.location.href = data.route
  }
  return (
    <div onClick={handleClick} className='button button4' style={{padding:"1rem", backgroundColor:"rgba(255,255,255,.5)", cursor:"pointer", borderRadius:".3rem", margin:".5rem"}}>
      <div style={{textAlign:"center", fontWeight:800, color:"rgba(14, 17, 75, 1)", textTransform:"uppercase"}}>{data?.name}</div>
    </div>
  )
}

export default index