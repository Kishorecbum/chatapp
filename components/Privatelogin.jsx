import React, { useState } from 'react';
import "./privatechatcontainer.css"
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
const Privatelogin = ({setuser}) => {
    const [username, setusername] = useState("");
    const [meetingCode, setMeetingCode] = useState(""); // Meeting code for private chat
    const navigate = useNavigate();
    const handlePrivateChatLogin = () => {
        if (!username || !meetingCode) return; // Make sure both fields are filled
       
      localStorage.setItem('user', username);
      localStorage.setItem('meetingCode', meetingCode);
      // You can also store avatars here if necessary
      const socket = socketIOClient("http://localhost:3002");
      socket.emit("join", { username, meetingCode });
      setuser(username);
      // Navigate to the private chat
      // Assuming you already have a private chat route set up:
      navigate(`/private-chat/${meetingCode}`); // Navigate to chat page
    }
  
    return (
      <div className="private-chat-login">
        <h1>Login</h1>
        <input 
          type="text" 
          placeholder="Enter your name" 
          onChange={(e) => setusername(e.target.value)} 
        />
        <input
        type='number'      
        placeholder="Enter the meeting code"
        value={meetingCode}
        onChange={(e) => setMeetingCode(e.target.value)}
      />
        <button onClick={handlePrivateChatLogin}>Login</button>
      </div>
    );
  
}

export default Privatelogin