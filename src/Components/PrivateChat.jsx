import React from 'react'
import "./styles/PrivateChat.css"
import DummyUsers from "./DummyUsers"

export default function PrivateChat() {
  return (
    <section className='PrivateChat-container'>
      <div className="header">
        <p>image</p>
        <p>name</p>
        <p className='follow'>following status</p>
      </div>

      <div className="chatbox">
        <div className="sender">
          {/* Sender messages */}
          {DummyUsers.map((users) => (
            <p key={users.id}>[{users.LastMessage}]</p>

          ))}

        </div>
        <div className="receiver">
          {/* Receiver messages */}
          {DummyUsers.map((users) => (
            <p key={users.id}>[{users.LastMessage}]</p>

          ))}        </div>
      </div>
      <div className="messagebox">
        <input type="text" />
        <span>link</span><span>camera</span><span>send</span>
      </div>
    </section>
  )
}
