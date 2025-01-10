// // src/App.js

import React, { useState } from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Typography, Box, CssBaseline, Menu, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7, ArrowDropDown } from '@mui/icons-material';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import context for auth state
import Home from './components/Home';
import Profile from './components/Profile';
import PastAssessments from './components/PastAssessments';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);  // For managing the dropdown
  const { user, logout } = useAuth(); // Use the auth context to get user state
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#007bff',
      },
    },
  });

  // Function to open the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout action
  const handleLogout = () => {
    logout(); // Log out user
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ marginBottom: 3, zIndex: 1300 }}> {/* Fixed header */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PERF (POC)
          </Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Username Dropdown Button with Arrow Icon */}
          {user ? (
            <Button
              color="inherit"
              onClick={handleMenuClick}
              endIcon={<ArrowDropDown />}
            >
              {user.name}
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}

          {/* Dropdown Menu */}
          {user && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex' }}>
        {/* Fixed Width Navbar */}
        {user && (
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
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <NavLink
                to="/"
                className="navbar-link"
                style={({ isActive }) => ({
                  padding: '10px',
                  textDecoration: 'none',
                  color: isActive ? '#007bff' : 'inherit',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
              >
                Home
              </NavLink>
              <NavLink
                to="/profile"
                className="navbar-link"
                style={({ isActive }) => ({
                  padding: '10px',
                  textDecoration: 'none',
                  color: isActive ? '#007bff' : 'inherit',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
              >
                Profile
              </NavLink>
              <NavLink
                to="/past-assessments"
                className="navbar-link"
                style={({ isActive }) => ({
                  padding: '10px',
                  textDecoration: 'none',
                  color: isActive ? '#007bff' : 'inherit',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
              >
                Past Assessments
              </NavLink>
            </nav>
          </Box>
        )}

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, marginLeft: user ? '250px' : '0', padding: 3, marginTop: 3 }}>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/profile" element={user ? <Profile /> : <Login />} />
            <Route path="/past-assessments" element={user ? <PastAssessments /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;