import React, { useState } from 'react'
import "./styles/PrivateChat.css"
import DummyUsers from "./DummyUsers"
import image from "../assets/Chat.png"

export default function PrivateChat() {
  const [typemessage, typesetMessage] = useState('');

  return (
    <section className='PrivateChat-container'>
      <div className="header">
        <p>image</p>
        <p>name</p>
        <p className='follow'>following status</p>
      </div>

      <div className="chatbox">
      {DummyUsers.map(( users ) =>(
        <div className={`${ users.role === 'receiver' ? 'receiver' : 'sender'}`}>
        {/* Sender messages */}
        <img src={image} alt="" />
          <p key={users.id}>[{users.LastMessage}]</p>

      </div>

      ))}
       
      </div>
      <div className="messagebox">
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
          <button>send</button>
        </span>
        </section>
      </div>
    </section>
  )
}
