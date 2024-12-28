import React, { useState, useEffect } from 'react';
import './styles/ChatList.css';
import axios from 'axios';
import ProfilePic from '../assets/google.png';

export default function ChatList() {
  const [SearchTerm, setSearchTerm] = useState('');
  const [UserName, setUserName] = useState([]);

  // Filter usernames based on the search term
  const filterUsers = UserName.filter((user) =>
    user.toLowerCase().includes(SearchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ChatList');
        console.log(response.data.usernames);
        setUserName(response.data.usernames); // Set usernames array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ChatList-Container">
      <p>Messages</p>
      <div className="ChatList-Header">
        <input
          type="text"
          placeholder="Search"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="ChatList-Body">
        {filterUsers.map((user, index) => (
          <div key={index} className="ChatList-Item">
            <img src={ProfilePic} alt={user} />
            <div className="text-details">
              <h2>{user}</h2>
              <p>Last Message</p>
            </div>
            <button>Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
}
