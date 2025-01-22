
// import React, { useState } from 'react';
// import "./style.css";
// import _ from 'lodash';

// const Userlogin = ({ setuser, setPrivateChat }) => {
//   const [username, setusername] = useState("");
//   const [privateUser, setPrivateUser] = useState(""); // For private chat selection

//   const handleuser = () => {
//     if (!username) return;
//     localStorage.setItem('user', username);
//     setuser(username);
//     localStorage.setItem('avatar',
//       `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
//   };

//   const handlePrivateChat = () => {
//     if (!privateUser || !username) return;
//     localStorage.setItem('privateuser', privateUser);
//     setPrivateChat(privateUser);
//     localStorage.setItem('avatar',
//       `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
//   };

//   return (
//     <div className='logincontainer'>
//       <div className='public'>
//         <h1>Public Chat</h1>
//         <input type="text" placeholder='Enter your name' onChange={(e) => setusername(e.target.value)} />
//         <button onClick={handleuser}>Group Chat</button>
      
//       </div>
//       <div className='private'>
//       <h1>Private Chat</h1>
//         <input type="text" placeholder='Enter a username for 1vs1 chat' onChange={(e) => setPrivateUser(e.target.value)} />
//         <button onClick={handlePrivateChat}>Private Chat</button>

//       </div>
//     </div>
//   );
// };

// export default Userlogin;
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./style.css";
import _ from 'lodash';

const Userlogin = () => {


  const navigate = useNavigate(); // Initialize the navigate function

  const Group1 = () => {
 
    navigate('/Grouplogin');
  }
  
  const private1=()=>{
   
navigate('/Privatelogin')
  }


  return (
    <div className='chatoption'>
      <div className='public'>
      
        <button onClick={Group1}>Group Chat</button>
      </div>
      <div className='private'>
       
        <button onClick={private1}>Private Chat</button>
      </div>
    </div>
  );
};

export default Userlogin;


