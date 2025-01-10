// // src/components/Login.js

// import React, { useState } from 'react';
// import { Button, TextField, Box, Typography, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const { login } = useAuth(); // Destructure login from the context
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(formData.email, formData.password);
//       navigate('/'); // Redirect to homepage on successful login
//     } catch (error) {
//       console.log('Login failed:', error);
//     }
//   };

//   return (
//     <Box
//       sx={(theme) => ({
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: theme.palette.background.default, // Use the theme's background color
//       })}
//     >
//       <Paper
//         sx={{
//           padding: 4,
//           width: '100%',
//           maxWidth: 400,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h5" align="center" gutterBottom>
//           Login
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ marginBottom: 2 }}
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Login
//           </Button>
//         </form>

//         <Box mt={2} textAlign="center">
//           <Typography variant="body2" color="textSecondary">
//             Don't have an account?{' '}
//             <Button color="primary" onClick={() => navigate('/register')}>
//               Register
//             </Button>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;


// src/components/Login.js
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();  // Destructure login from the context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/'); // Redirect to homepage on successful login
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ padding: 4, width: '100%', maxWidth: 400, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/register')}>Register</Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
