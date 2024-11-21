import React, { useState } from 'react'
import "./styles/ChatList.css"
import Dummyusers from "./DummyUsers"


export default function ChatList() {
  const [SearchTerm, setSearchTerm] = useState('');

  const filterUsers = Dummyusers.filter(user => user.Name.toLowerCase().includes(SearchTerm.toLowerCase()));
  


  return (
    <div className='ChatList-Container'>
      <p>Messages</p>
      <div className='ChatList-Header'>
        <input
         type="text" 
         placeholder='Search'
         value={SearchTerm}
         onChange={e => setSearchTerm(e.target.value)}
         
          />
      <div className='ChatList-Body'>
        {filterUsers.map((user, index) => (
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
