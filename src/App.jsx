import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import LoginPage from './Component/LoginPage/LoginPage';
import Homepage from './Component/Homepage/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/homepage' element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
