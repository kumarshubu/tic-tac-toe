import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:8000');  
function LeaderBoard() {
    const [usersData, setUsersData] = useState([])
 
    useEffect(() => {
        let userData = sessionStorage.getItem('userData')
        if(!userData){
            window.location.href = "/"
        } else {
            userData = JSON.parse(userData)
        }
        socket.emit("join", { name:userData.name, room:"lobby", email:userData.email, password:"password" }, (error) => {
          if (error) {
            alert(error);
          }
        });
        return () => {
            socket.disconnect();
        };
      }, []);

      useEffect(() => {
        socket.on("message", (message) => {
          console.log(message)
        });
        socket.on("gotChallenged", (message) => {
          
        });
        socket.on("roomData",(response)=>{
            let userData = sessionStorage.getItem('userData')
            let data = response.users
            if(userData){
              userData = JSON.parse(userData)
              data = data?.filter(t=>t.email!=userData?.email)
            }
            console.log(data)
            setUsersData(data)
        })
      }, []); 

      const handleChallenge = (opponent) => {
        socket.emit("challengePlayer",opponent);
        // window.location.href="/online"
      }

  return (
    <>
        {usersData?.map(t=>(
        <div onClick={()=>handleChallenge(t)} style={{border:"1px solid #000", margin:"1rem", padding:"1rem "}}>
            {t.email}
        </div>
        ))}
    </>
  )
}

export default LeaderBoard