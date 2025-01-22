
import React, { useEffect, useState } from 'react'
import "./chatcontainer.css"

import socketIOClient from 'socket.io-client'
import { useParams,useNavigate } from 'react-router-dom'
import PrivateChat from './PrivateChat'
import PrivateInput from './PrivateInput'
import Privatelogin from './Privatelogin'


const PrivateChatContainer = ({user}) => {
  const navigate = useNavigate();
  const { meetingCode } = useParams();  // Get meeting code from URL params
  const socketio=socketIOClient('http://localhost:3002')
  const[chats,setchats]=useState([])
  // const username = localStorage.getItem("user");
  // const meetingcode = localStorage.getItem("meetingCode");
  useEffect(() => {
    if (!meetingCode) {
      console.error("Meeting code is not available");
      return;
    }

    socketio.emit('join', { username: user, meetingCode });

    socketio.on("chat", (chats) => {
      setchats(chats);
    });

    // socketio.on('message', (msg) => {
    //   setchats((prevChats) => [...prevChats, msg]);
    // });

    socketio.on('message', (msg) => {
      setchats((prevChats) => {
        // Avoid duplicate messages
        if (prevChats.some(chat => chat.message === msg.message && chat.user === msg.user)) {
          return prevChats;  // Don't add if the same message already exists
        }
        return [...prevChats, msg];
      });
    });

    return () => {
      socketio.off('chat');
      socketio.off('message');
    };
  }, [meetingCode, user]);
 

  const sendtosocket = (chat) => {
   
    socketio.emit("chat", { ...chat, meetingCode });
  };
  

const addmessage=async(chat)=>{
  const base64Files = await Promise.all(
    (chat.files || []).map((file) => fileToBase64(file))
  );
  const newchat={...chat,
    files:base64Files,
    user:localStorage.getItem('user'),
    avatar:localStorage.getItem('avatar'),
   
  }

  setchats([...chats, newchat]);
  sendtosocket(newchat); // Send to socket

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

                <PrivateChat chats={chats}/> 
                <PrivateInput addmessage={addmessage}/>
        </div>
     ):

      
      <Privatelogin setuser={setuser}  />
        
    }
    </div>
  )
}

export default PrivateChatContainer