import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import _ from 'lodash';

const Groupchatlogin = ({setuser}) => {
    const [username, setusername] = useState("");

    const navigate = useNavigate(); // Initialize the navigate function
  
    const handleuser = () => {
      if (!username) return;
      localStorage.setItem('user', username);
      setuser(username);
      localStorage.setItem('avatar',
        `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
  
      // Navigate to the chat container after setting the user
      navigate('/chat');
    }
  return (
    <div className='logincontainer'>
        <h1>Login</h1>
    
      
      <input type="text" placeholder='Enter your name' onChange={(e) => setusername(e.target.value)} />
      
      <button onClick={handleuser}>Group Chat</button>
    
   
  </div>
  )
}

export default Groupchatlogin