import React from 'react'
import "./chatlist.css";
const PrivateChat = ({ chats }) => {
    const user = localStorage.getItem("user");


    const renderFile = (file, index) => {
      const fileType = file.type.split("/")[0]; // Determine the file type
    
      if (fileType === "image") {
        return (
          <div key={index} className="chat-file-wrapper">
            <img
              src={file.data}
              alt={file.name}
              className="chat-file-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <a
              href={file.data}
              download={file.name}
              className="chat-file-download"
            >
              Download
            </a>
          </div>
        );
      } else if (fileType === "video") {
        return (
          <div key={index} className="chat-file-wrapper">
            <video controls className="chat-file-video" style={{ maxWidth: "200px" }}>
              <source src={file.data} type={file.type} />
            </video>
            <a
              href={file.data}
              download={file.name}
              className="chat-file-download"
            >
              Download
            </a>
          </div>
        );
      } else {
        return (
          <a key={index} href={file.data} download={file.name} className="chat-file-link">
            {file.name}
          </a>
        );
      }
    };
    
  
    return (
      <div className="chats_list">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={chat.user === user ? "chatsender" : "chatreceiver"}
          >
            <p>
              <strong>{chat.user}</strong>: {chat.message}
            </p>
            {chat.files && chat.files.map((file, idx) => renderFile(file, idx))}
          </div>
        ))}
      </div>
    );
}

export default PrivateChat