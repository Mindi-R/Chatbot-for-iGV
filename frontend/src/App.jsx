import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/sign-up.jsx';
import SignIn from './components/sign-in.jsx';
import Home from './pages/Home.jsx';
import HostProfile from './pages/HostProfile.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/host-profile" element={<HostProfile />} />
      </Routes>
    </Router>
  );
};

export default App;