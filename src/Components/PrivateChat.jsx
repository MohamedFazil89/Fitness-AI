import React, { useState, useEffect } from 'react';
import "./styles/PrivateChat.css";
import DummyUsers from "./DummyUsers";
import image from "../assets/Chat.png";
import axios from "axios";

export default function PrivateChat() {
  const [typemessage, typesetMessage] = useState('');
  const [follow, setFollow] = useState(false);
  const [chatData, setChatData] = useState([
    {
      id: 0,
      users: [ { user1: "", user2: ""}],
      messages: [
        { role: "", message: ""},
      ]
    }
  ]);
  

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/CurrentUserInfo");
        setChatData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchChatData();
  }, []);

  const MessageSend = (e) => {
    e.preventDefault();
    console.log(typemessage);
    if(!typemessage){
      console.log(" ");
      
    }else{
      
      typesetMessage('');

    }
  }

  const toggleFollow = () => {
    setFollow(!follow);

   
  };

 
  


  return (
    <section className='PrivateChat-container'>
      <div className="header">
        <img src={image} alt="profile" className='profile-picture' />
        <p className="Name">{"Name" || "Loading..."}</p>
        <p className={ follow ? 'follow' : 'nofollow' } onClick={toggleFollow}>{follow ? 'following' : 'follow'}</p>
      </div>

      <div className="chatbox">
        {DummyUsers.map((users, index) => (
          <div className={`${users.role === 'receiver' ? 'receiver' : 'sender'}`}>
            {/* Sender messages */}
            <img src={image} alt="" />
            <p key={index}>{users.LastMessage}</p>

          </div>

        ))}

      </div>
      <form className="messagebox">
        <input
          type="text"
          placeholder='message'
          value={typemessage}
          onChange={(e) => typesetMessage(e.target.value)}
          className='message-input'

        />
        <section className='icons'>
          <span>📎</span>
          <span>📷</span>
          <span>
            <button className='send' onClick={MessageSend}>send</button>
          </span>
        </section>
      </form>
    </section>
  )
}
