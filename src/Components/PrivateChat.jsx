import React, { useState } from 'react'
import "./styles/PrivateChat.css"
import DummyUsers from "./DummyUsers"
import image from "../assets/Chat.png"

export default function PrivateChat() {
  const [typemessage, typesetMessage] = useState('');
  const [isfollow, setIsFollow] = useState(false);


  const MessageSend = (e) => {
    e.preventDefault();
    console.log(typemessage);
  }

  return (
    <section className='PrivateChat-container'>
      <div className="header">
        <img src={image} alt="profile" className='profile-picture' />
        <p className='Name'>Name</p>
        <p className={ isfollow ? 'follow' : 'nofollow' } onClick={() => setIsFollow(!isfollow)}>{isfollow ? 'following' : 'follow'}</p>
      </div>

      <div className="chatbox">
        {DummyUsers.map((users) => (
          <div className={`${users.role === 'receiver' ? 'receiver' : 'sender'}`}>
            {/* Sender messages */}
            <img src={image} alt="" />
            <p key={users.id}>{users.LastMessage}</p>

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
