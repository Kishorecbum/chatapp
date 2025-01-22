
// import './App.css'

// import Chatcontainer from './components/Chatcontainer'
// import Header from './components/Header'





// function App() {
    

//   return (
//     <>
//     <Header/>
//     <div className='app'>
//       <Chatcontainer />
      
//     </div>
    
      
//     </>
//   )
// }

// export default App
import React, { useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import Header from './components/Header';
import Chatcontainer from './components/Chatcontainer';
import Userlogin from './components/Userlogin';


import Privatelogin from './components/Privatelogin';
import Groupchatlogin from './components/Groupchatlogin';
import PrivateChatContainer from './components/Privatechatcontainer';


function App() {
  const[user,setuser]=useState(localStorage.getItem('user'))
  return (
    <Router> {/* Wrap everything in Router */}
      <Header />
      <div className='app'>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Userlogin />} /> {/* Show Userlogin at root */}
          <Route path="/chat" element={<Chatcontainer user={user}/>} /> {/* Show Chatcontainer when /chat is accessed */}
          <Route path="/private-chat/:meetingCode" element={<PrivateChatContainer user={user}/>}/>
          <Route path="/Privatelogin" element={<Privatelogin setuser={setuser} />} /> {/* Private Chat Route */}
          <Route path="/Grouplogin" element={<Groupchatlogin setuser={setuser}/>}/>
      
        </Routes>
      </div>
    </Router>
    
    
  );
}

export default App;
