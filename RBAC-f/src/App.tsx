import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Dashboard';
import UsersPage from './pages/Users';
import RolesPage from './pages/Roles';
import PermissionsPage from './pages/Permission';
// import NotFoundPage from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;