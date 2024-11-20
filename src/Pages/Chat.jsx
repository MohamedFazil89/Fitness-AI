import React from 'react'
import Nav from '../Components/Nav'
// import DummyUsers from '../Components/DummyUsers'
import "./styles/Chat.css"
import ChatList from '../Components/ChatList'

export default function Chat() {
  return (
    <div className='Chat-container'>
      <ChatList />

     
      <Nav initPage="Messages" />

      
    </div>
  )
}
