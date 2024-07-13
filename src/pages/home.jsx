import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css'; // Import your CSS file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {PreviousMonth, totalAmnt , failCont} from './prev_month';
import {CurrentMonth, totalAmnt_2 , failCont_2} from './curr_month';
import moment from 'moment';
import Logo from './logo.png';

function Home() {
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();

  // const [lastMonthNachData, setLastMonthNachData] = useState(null);
  // const [currentMonthNachCount, setCurrentMonthNachCount] = useState(0);
  // const [totalNachAmount, setTotalNachAmount] = useState(0);

  useEffect(() => { 
    document.querySelector('.content').classList.add('loaded');
    
    // Fetch last month's NACH data (replace with your API call)
    // const fetchLastMonthNachData = async () => {
    //   const response = await fetch('/api/last-month-nach'); // Replace with your API endpoint
    //   const data = await response.json();
    //   setLastMonthNachData(data);
    // };

    // // Fetch current month's NACH count (replace with your API call)
    // const fetchCurrentMonthNachCount = async () => {
    //   const response = await fetch('/api/current-month-nach-count'); // Replace with your API endpoint
    //   const count = await response.json();
    //   setCurrentMonthNachCount(count);
    // };

    // fetchLastMonthNachData();
    // fetchCurrentMonthNachCount();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  PreviousMonth();
  CurrentMonth();


  return (
    <div className="home-container">
      <header className="header">
        {/* Add your company logo image here */}
        {/* <img src="./logo.png"  alt="company logo"/> */}
        <Link to="/" className="logo">
          <img src={Logo} alt="company logo" />
        </Link>
        <nav className="nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" onClick={() => handleTabClick('Home')}>
                Home
              </Link>
            </li>
            <li className={location.pathname === '/display' ? 'active' : ''}>
              <Link to="./display" onClick={() => handleTabClick('Display')}>
                ALL NACH 
              </Link>
            </li>
            {/* <li className={location.pathname === '/past-nach' ? 'active' : ''}>
              <Link to="/past-nach" onClick={() => handleTabClick('Past Nach')}>
                Today's Nach
              </Link>
            </li> */}
            <li className={location.pathname === '/todays_nach' ? 'active' : ''}>
              <Link to="/todays_nach" onClick={() => handleTabClick('Todays Nach')}>
                Present Nach
              </Link>
            </li>
{/*             <li className={location.pathname === '/all-nach' ? 'active' : ''}>
              <Link to="/nach_presentation" onClick={() => handleTabClick('All Nach')}>
                All Nach
              </Link>
            </li> */}
          </ul>
        </nav>
      </header>

      

<div className="nach-summary-wrapper">
        <div className="nach-summary-container">
          <h1>Last Month's NACH</h1>
          <Link to="/prev_month" className="nach-summary-cards"> {/* Link to prev_month.js */}
            <div className="nach-summary-card">
              <div className="nach-count">            
                {/* {lastMonthNachData ? (
                  <span>{lastMonthNachData}</span>
                ) : (
                  
                
    
                )} */}
                <div className="total-amount-fail-count"> 
                <div className="total-amount"> {/* Inner container for total amount */}
            <span>{totalAmnt.toFixed(2)}</span>
            <p>Total Amount</p>
          </div>
          
          <div className="total-fail"> {/* Inner container for total fail */}
            <span>{failCont}</span>
            <p>Total Fail</p>
          </div>
          </div>
        
                
              </div>
            </div>
          </Link>
        </div>

        <div className="nach-summary-container">
          <h1>Current Month's NACH </h1>
          <Link to="/curr_month" className="nach-summary-cards"> {/* Link to curr_month.js */}
            <div className="nach-summary-card">
              <div className="nach-count">
                
                {/* Display current month's NACH count */}
                {/* <span>{currentMonthNachCount}</span> */}
                {/* <span>{totalAmnt_2}</span>
                <p>Total Amount</p>
                <br />
                <span>{failCont_2}</span>
                <p>Total Fail</p> */}
                 <div className="total-amount-fail-count"> {/* New class for container */}
          <div className="total-amount"> {/* Inner container for total amount */}
            <span>{totalAmnt_2.toFixed(2)}</span>
            <p>Total Amount</p>
          </div>
          <br />
          <br />
          <div className="total-fail"> {/* Inner container for total fail */}
            <span>{failCont_2}</span>
            <p>Total Fail</p>
          </div>
        </div>
              </div>
            </div>
          </Link>
        </div>
      </div>



      {/* Rest of your home page content goes here */}
      <div className="content">
        {/* Display content based on the active tab */}
        {activeTab === 'Home' && (
          <div>
            {/* Home page content */}
          </div>
        )}
        {/* ... similar logic for other tabs */}
      </div>
    </div>
  );
}
// import { formGroupClasses } from '@mui/material';

export default Home;


