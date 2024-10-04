import React from 'react'
import "./styles/Tabs.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons'; 

export default function Messages() {
  return (
    <div className='tab-container'>
      <div className="Tracker-con">
      <div className='Trackers-section'>
      <p className='Trackers'>Tracker <FontAwesomeIcon  icon={faAngleDown}/></p>
      <span className='calander'><FontAwesomeIcon icon={faCalendar} /></span>
      <span className='Heart'><FontAwesomeIcon icon={faHeart} /></span>
      </div>
      <hr />
      </div>

      
    </div>
  )
}
