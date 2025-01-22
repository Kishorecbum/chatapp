import React, { useEffect, useState } from 'react'
import "./chatcontainer.css"
import Chatlist from './Chatlist'
import Inputtext from './Inputtext'
import Userlogin from './Userlogin'
import socketIOClient from 'socket.io-client'
import { useNavigate } from 'react-router-dom'


const Chatcontainer = ({user}) => {
  const navigate = useNavigate();

  const socketio=socketIOClient('http://localhost:3001')
  const[chats,setchats]=useState([])
  useEffect(() => {
    socketio.on("chat", (chats) => {
      setchats(chats);
    });
   
    
    socketio.on('message', (msg) => {
      setchats((prevChats) => [...prevChats, msg])
    })

    return () => {
      socketio.off('chat')
      socketio.off('message')
    }
  }, []);
 


  const sendtosocket = (chat) => {
    console.log("Chat being sent:", chat); // Debug log
    socketio.emit('chat', chat);
  };

const addmessage=async(chat)=>{
  const base64Files = await Promise.all(
    (chat.files || []).map((file) => fileToBase64(file))
  );
  const newchat={...chat,
    files:base64Files,
    user:localStorage.getItem('user'),
    avatar:localStorage.getItem('avatar')
  }

setchats([...chats,newchat])
sendtosocket([...chats,newchat])

}
const logout=()=>{
  localStorage.removeItem("user")
  localStorage.removeItem("avatar")
  navigate('/')

}

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Base64 Encoded File:", reader.result); // Debug log
      resolve({ data: reader.result, name: file.name, type: file.type });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};



  return (
    
    <div>
     {user ? (
        <div>
            <div className='chatheader'>
                <h4>USERNAME : <span className='username'>{user}</span> </h4>
                
                <button className='chatlogout' onClick={logout}>
                    <strong>Logout</strong>
                </button>
                </div>

                <Chatlist chats={chats}/> 
                <Inputtext addmessage={addmessage}/>
        </div>
     ):

      
      <Userlogin setuser={setuser}  />
        
    }
    </div>
  )
}

export default Chatcontainer



