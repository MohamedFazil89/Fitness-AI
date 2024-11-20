import React from 'react'
import "./styles/ChatList.css"
import Dummyusers from "./DummyUsers"

export default function ChatList() {
  return (
    <div className='ChatList-Container'>
      <h1>Messages</h1>
      <div className='ChatList-Header'>
        <input type="text" placeholder='Search' />
      <div className='ChatList-Body'>
        {Dummyusers.map((user, index) => (
          <div key={index} className='ChatList-Item'>
            <img src={user.profilepic} alt={user.Name} />
            <div className='text-details'>
              <h2>{user.Name}</h2>
              <p>{user.LastMessage}</p>
            </div>
            <button>Chat</button>
          </div>
        ))}

      </div>
      </div>

      
    </div>
  )
}
