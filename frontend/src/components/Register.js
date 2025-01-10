// // src/components/Register.js

// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   // Registration state
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     managerName: '',
//     designation: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle registration logic here
//     // After registration, navigate to the login page
//     console.log(formData);
//     navigate('/login');  // Navigate to login page after successful registration
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
//           Register
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Full Name"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Manager's Name"
//                 name="managerName"
//                 value={formData.managerName}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Designation"
//                 name="designation"
//                 value={formData.designation}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </form>

//         <Box mt={2} textAlign="center">
//           <Typography variant="body2" color="textSecondary">
//             Already have an account?{' '}
//             <Button color="primary" onClick={() => navigate('/login')}>
//               Login
//             </Button>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Register;


// src/components/Register.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  // Registration state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    managerName: '',
    designation: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log(response);
      navigate('/login');  // Navigate to login page after successful registration
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default, // Use the theme's background color
      })}
    >
      <Paper
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Manager's Name"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{' '}
            <Button color="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
