import NACHpresentation from '../src/pages/nach_presentation'

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import NachPresented from '../src/pages/nach_presented'; // Import NachPresented component
import Display from '../src/pages/display';
import {PreviousMonth } from '../src/pages/prev_month'
import {CurrentMonth} from '../src/pages/curr_month'
import TodaysNach from './pages/todays_nach';

// ... other imports

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  // ... other component logic

  return (
    
    <Router>
      {/* ... */}
      <Routes>
        <Route path="/" element={<Home activeTab={activeTab} />} />
        
        <Route path="/nach_presentation" element={<NACHpresentation />} />

        {/* <Route path="/nach_presented" element={<NachPresented />} /> */}
        <Route path="/display" element={<Display />} />

        {/* ... other routes */}
        <Route path="/prev_month" element={<PreviousMonth />} />
        <Route path="/curr_month" element={<CurrentMonth />} />
        <Route path="/todays_nach" element={<TodaysNach/>}/>



      </Routes>
    </Router>

  );
}

export default App;
