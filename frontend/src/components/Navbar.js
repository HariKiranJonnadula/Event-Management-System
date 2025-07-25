import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Eventify</Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        {!user && <>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </>}
        {user && <>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          {user.role === 'admin' && <Link to="/admin" className="navbar-link">Admin</Link>}
          <button onClick={handleLogout} className="navbar-link" style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.3em' }}>
            Logout
            <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '0.2em' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </span>
          </button>
        </>}
      </div>
    </nav>
  );
};

export default Navbar;
