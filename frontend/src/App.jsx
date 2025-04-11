import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/sign-up.jsx';
import SignIn from './components/sign-in.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} /> 
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;