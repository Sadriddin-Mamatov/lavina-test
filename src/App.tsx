import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import EditBookPage from "./pages/EditBookPage"
import Myself from "./pages/MyProfile";

const App = () => {
  return (
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myself" element={<Myself />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
          </Routes>
        </Container>
      </Router>
  );
};

export default App;
