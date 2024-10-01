import React, { useState } from 'react'
import DashboardIcon from "../assets/dashboard.png"
import HomeIcon from "../assets/Home.png"
import SearchIcon from "../assets/search.png";
import ChatIcon from "../assets/Chat.png";
import SettingIcon from "../assets/settings.png";
import LogoutIcon from "../assets/Logout.png";
import Logo from "../assets/FLOGO.png"
import ProfilePic from "../assets/profilepic.png"
import "./styles/Nav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
    return (
        <div className='OverAll-container'>
            <div className="Profile-View">
                <section className='page-info'>
                    <img src={Logo} alt="Home" className='Logo' />
                    <h1>Dashboard</h1>
                    <img src={DashboardIcon} alt='icons' className='Icons' />
                    <span className='question'><FontAwesomeIcon icon={faQuestion} size='1x'/></span>

                </section>
                <section className="profile-info">
                    <label className="toggle-switch">
                        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
                        <span className="slider"></span>
                    </label>
                    <span className='bell'><FontAwesomeIcon icon={faBell} size='1x'/></span>
                    <span className='profile-pic'><img src={ProfilePic} alt='icons'  /></span>

                </section>


            </div>
            <div className='Nav-container'>
                <img src={DashboardIcon} alt='icons' className='Icons' />
                <img src={HomeIcon} alt='icons' className='Icons' />
                <img src={SearchIcon} alt='icons' className='Icons' />
                <img src={ChatIcon} alt='icons' className='Icons' />
                <img src={SettingIcon} alt='icons' className='Icons' />
                <img src={LogoutIcon} alt='icons' className='Icons' />
            </div>
        </div>
    )
}
