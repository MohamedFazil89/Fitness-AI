import React, { useState } from 'react'
import DashboardIcon from "../assets/dashboard.png"
import HomeIcon from "../assets/Home.png"
import SearchIcon from "../assets/search.png";
import ChatIcon from "../assets/Chat.png";
import SettingIcon from "../assets/settings.png";
import LogoutIcon from "../assets/Logout.png";
import Logo from "../assets/FLOGO.png"
import ProfilePic from "../assets/profilepic.png"
import Messages from '../Pages/Chat';
import "./styles/Nav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function Nav({ props }) {
    const [isToggled, setIsToggled] = useState(false);
    const [currentPage, setCurrentPage] = useState("Dashboard");  
    const username = useSelector((state) => state.user.username)

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const getIconClass = (page) => {
        return currentPage === page ? "Icons active" : "Icons";
    };
    const icons = {
        Dashboard: DashboardIcon,
        Home: HomeIcon,
        Search: SearchIcon, 
        Messages: ChatIcon,
        Settings: SettingIcon,
        Logout: LogoutIcon,
    };

    return (
        <div className='OverAll-container'>
            <div className="Profile-View">
                <section className='page-info'>
                    <img src={Logo} alt="Home" className='Logo' />
                    <h1>{currentPage}</h1>
                    <img src={icons[currentPage]} alt='icons' className='Icons top' />
                    <span className='question'><FontAwesomeIcon icon={faQuestion} size='1x' /></span>
                </section>
                <section className="profile-info">
                    <label className="toggle-switch">
                        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
                        <span className="slider"></span>
                    </label>
                    <span className='bell'><FontAwesomeIcon icon={faBell} size='1x' /></span>
                    <span className='profile-pic'><img src={ProfilePic} alt='profile' /></span>
                </section>
            </div>

            <section className='body-con'>
            <div className='Nav-container'>
                <img src={DashboardIcon} alt='Dashboard Icon' className={getIconClass("Dashboard")} onClick={() => changePage("Dashboard")} />
                <img src={HomeIcon} alt='Home Icon' className={getIconClass("Home")} onClick={() => changePage("Home")} />
                <img src={SearchIcon} alt='Search Icon' className={getIconClass("Search")} onClick={() => changePage("Search")} />
                <img src={ChatIcon} alt='Chat Icon' className={getIconClass("Messages")} onClick={() => changePage("Messages")} />
                <img src={SettingIcon} alt='Settings Icon' className={getIconClass("Settings")} onClick={() => changePage("Settings")} />
                <img src={LogoutIcon} alt='Logout Icon' className={getIconClass("Logout")} onClick={() => changePage("Logout")} />
            </div>
            {<Messages />}
            
            </section>
        </div>
    )
}
