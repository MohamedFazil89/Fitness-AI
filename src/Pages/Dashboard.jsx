import React from 'react'
import Nav from '../Components/Nav'
import "./styles/Dashboard.css"
import DashboardCom from "../Components/Dashboard"


export default function Dashboard() {
  return (
    <div className='Dashboard-container'>
      <Nav initPage={"Dashboard"}/>
      <div className="dashboard-container">
        <DashboardCom/>

      </div>

    </div>
  )
}
