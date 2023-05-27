import React, { useEffect, useState,useEffectOnce } from 'react'

function Chat({socket,username,room}) {
   
    const [currentMessage,SetCurrentMessage]=useState("")
    
    const [messageList,setMessageList]=useState([])
    const sendMessage=async(e)=>{
         e.preventDefault()
         if(currentMessage!==""){
            const messageData={
                
                room:room,
                author: username,
                message: currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()

            }
            await socket.emit('send_message',messageData)
            
            setMessageList((list)=>[...list,messageData]);
            
         }
         
    }
    useEffect(()=>{
        
        socket.on('recieve_message',(data)=>{
        
        setMessageList((list)=>[...list,data]);
        })
        
    },[socket])

    // useEffect(() => {
    //   const eventListener = (data) => {
    //       setMessageList((list) => [...list, data]);
    //   };
    //   socket.on("recieve_message", eventListener);
  
    //   return () => socket.off("recieve_msg", eventListener);
    // }, [socket]);
  return (
    <div>
      
      <div>Live Chat</div>
      <div>
        {
          messageList.map((element)=>{
            return<p key={Math.random()}>{element.message}</p>
             
          })
        }
      </div>
      <div><input type="text" plsceholder="Hii.." onChange={(event)=>{
        SetCurrentMessage(event.target.value)
      }}/>
          <button onClick={sendMessage}>
            &#9658;
          </button>
      </div>
      
    </div>
  )
}

export default Chat
