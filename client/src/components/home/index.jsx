import React, { useState } from 'react'
import Button from './components/Button'
function Home() {
  const [data, setData] = useState([{
      name:"2 Player",
      route:"/twoPlayer",
  },
//   {
//     name:"Play Online",
//     route:"/multiPlayer",
// },
// {
//   name:"Play Online (Super)",
//   route:"/multiPlayerSuper",
// },
// {
//   name:"Leader Board",
//   route:"/leaderBoard",
// }
])
  return (
    <div style={{background:"linear-gradient(to top, rgb(66 37 37), rgb(40 50 107 / 90%), rgb(196 196 196 / 20%))"}} className='centerContent'>
      {data?.map((data, key)=>{
        return (<div key={key} style={{width:"60%"}}>
          <Button data={data} />
        </div>)
      })}
    </div>
  )
}

export default Home