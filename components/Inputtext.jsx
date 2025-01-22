
import React, { useState } from "react";
import "./inputtext.css";

const Inputtext = ({ addmessage }) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]); // Store selected files
  };

  const handleSendMessage = () => {
    if (message.trim() || files.length) {
      addmessage({ message, files });
      setMessage(""); // Clear the input
      setFiles([]); // Clear the file input
    }
  };

  return (
    <div className="inputtextcontainer">
      <input
     
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <div className="choosefiles">
        <input type="file" multiple onChange={handleFileChange}  className="chooseinput"/>
        </div>
      
      <button onClick={handleSendMessage} >Send</button>
    </div>
  );
};

export default Inputtext;
