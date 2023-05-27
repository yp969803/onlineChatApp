import io from 'socket.io-client'
import {useState} from 'react'
import Axios from "axios"
import Chat from './components/Chat'
const socket=io.connect("http://localhost:80")
function App() {
  const [data,setData]=useState("")
  const getData=async ()=>{
    const response=Axios.get("http://localhost:80/getData")
    setData(response.data)
  }
  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showChat,setShowChat]=useState(false)
  const joinRoom=()=>{
     if(username!==""&&room!==""){
      socket.emit('join_room', room);
      setShowChat(true);
     }
  }
  return (
    
    <div className="App">
      {data}
      {showChat?<Chat socket={socket} username={username} room={room}/>: <div>
     <h3>Join Chat</h3>
      <input type="text" placeholder="UserName" onChange={(event)=>{
        event.preventDefault()
        setUsername(event.target.value)
      }} />
      <input type="text" placeholder="RoomID" onChange={(event)=>{
        event.preventDefault()
        setRoom(event.target.value) }}/>
      <button onClick={joinRoom}>Join a room</button>
     </div>}
    
     
    </div>
  );
}

export default App
