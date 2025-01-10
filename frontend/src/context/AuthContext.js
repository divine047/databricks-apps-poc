// // src/context/AuthContext.js

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Default state is null, indicating no user is logged in
//   const navigate = useNavigate();

//   // Login function - Update this to capture real login credentials (email, password)
//   const login = (email, password) => {
//     // Normally, here you would authenticate with an API and get the user data
//     // For now, let's assume the response returns the email and username
//     const userFromLogin = { name: email.split('@')[0] }; // Mocking user, you can set it from the actual response
//     setUser(userFromLogin); // Set the actual user object
//     navigate('/'); // Redirect to home after successful login
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null); // Clear the user data
//     navigate('/login'); // Redirect to login page
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios installed

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state now stores all profile data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });

      // Store user info in the context
      const userData = response.data.user;  // Assuming user data is returned from the backend
      setUser(userData);

      // Fetch additional user profile info from the backend
      await fetchUserProfile(userData.email);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const fetchUserProfile = async (email) => {
    try {
      const response = await axios.get(`/api/profile?email=${email}`);
      setUser((prevUser) => ({ ...prevUser, ...response.data.user })); // Merge profile data with user data
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // If user is already logged in, fetch their profile data
    if (user) {
      fetchUserProfile(user.email);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

