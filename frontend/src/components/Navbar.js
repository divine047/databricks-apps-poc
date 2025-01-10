// src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

const Navbar = () => {
  return (
    <Box
      sx={{
        width: '250px',
        backgroundColor: 'background.paper',
        padding: 2,
        boxShadow: 3,
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'fixed',
        top: 64,
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            padding: '10px',
            textDecoration: 'none',
            color: isActive ? '#007bff' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            padding: '10px',
            textDecoration: 'none',
            color: isActive ? '#007bff' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Profile
        </NavLink>
        <NavLink
          to="/past-assessments"
          style={({ isActive }) => ({
            padding: '10px',
            textDecoration: 'none',
            color: isActive ? '#007bff' : 'inherit',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Past Assessments
        </NavLink>
      </nav>
    </Box>
  );
};

export default Navbar;
