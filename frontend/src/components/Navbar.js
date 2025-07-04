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
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <Link to="/">Home</Link>{' | '}
      {!user && <><Link to="/login">Login</Link>{' | '}<Link to="/register">Register</Link></>}
      {user && <>
        <Link to="/dashboard">Dashboard</Link>{' | '}
        {user.role === 'admin' && <Link to="/admin">Admin</Link>}{user.role === 'admin' && ' | '}
        <button onClick={handleLogout} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'blue' }}>Logout</button>
      </>}
    </nav>
  );
};

export default Navbar;
