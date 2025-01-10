// // src/components/Home.js

// import React, { useState } from 'react';
// import { Button, TextField, Typography, Box } from '@mui/material';
// import { useAuth } from '../context/AuthContext';  // Fixed the path to AuthContext
// import { useNavigate } from 'react-router-dom';  // To navigate between pages

// const Home = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [reflection, setReflection] = useState({
//     strengths: '',
//     growthAreas: '',
//     careerGoals: '',
//   });

//   const { user } = useAuth();  // Access the user from the context
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReflection({ ...reflection, [name]: value });
//   };

//   const handleSubmit = () => {
//     console.log(reflection);
//     setIsFormVisible(false);
//   };

//   return (
//     <Box sx={{ marginTop: '64px' }}>
//       <Typography variant="h4" gutterBottom>
//         Your Self-Reflection
//       </Typography>
//       <Typography variant="body1" paragraph>
//         Your self-reflection is a place to reflect on your performance here at Databricks during the review period.
//         It’s a chance for you to highlight things that have gone well and note things you might have done differently.
//         Your perspective will help guide your manager as they prepare their feedback. It will also help both of you
//         prepare for your performance conversation.
//       </Typography>

//       {/* Add user name display */}
//       {user && (
//         <Typography variant="h6" gutterBottom>
//           Welcome, {user.name}
//         </Typography>
//       )}

//       {!isFormVisible ? (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setIsFormVisible(true)}
//         >
//           Submit Self Reflection
//         </Button>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="What were your strengths and top achievements?"
//             name="strengths"
//             value={reflection.strengths}
//             onChange={handleInputChange}
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//           />
//           <TextField
//             label="What are your areas for growth?"
//             name="growthAreas"
//             value={reflection.growthAreas}
//             onChange={handleInputChange}
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//           />
//           <TextField
//             label="Career development insights or goals"
//             name="careerGoals"
//             value={reflection.careerGoals}
//             onChange={handleInputChange}
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//           />
//           <Box mt={2}>
//             <Button variant="contained" color="primary" type="submit">
//               Submit
//             </Button>
//           </Box>
//         </form>
//       )}
//     </Box>
//   );
// };

// export default Home;


// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';  // Fixed the path to AuthContext
import { useNavigate } from 'react-router-dom';  // To navigate between pages
import axios from 'axios';

const Home = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [reflection, setReflection] = useState({
    strengths: '',
    growthAreas: '',
    careerGoals: '',
  });
  const { user, logout } = useAuth();  // Access the user from the context
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in, else redirect to login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReflection({ ...reflection, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send reflection data to Flask backend (POST request)
      const response = await axios.post('/api/self-reflection', reflection, {
        withCredentials: true,  // to include session/cookies for authentication
      });

      if (response.status === 200) {
        alert('Self-Reflection submitted successfully');
        setIsFormVisible(false);  // Hide the form after submission
      }
    } catch (error) {
      console.log('Error submitting self-reflection:', error);
    }
  };

  return (
    <Box sx={{ marginTop: '64px', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Self-Reflection
      </Typography>
      <Typography variant="body1" paragraph>
        Your self-reflection is a place to reflect on your performance here at Databricks during the review period.
        It’s a chance for you to highlight things that have gone well and note things you might have done differently.
        Your perspective will help guide your manager as they prepare their feedback. It will also help both of you
        prepare for your performance conversation.
      </Typography>

      {/* Add user name display */}
      {user && (
        <Typography variant="h6" gutterBottom>
          Welcome, {user.name}
        </Typography>
      )}

      {!isFormVisible ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormVisible(true)}
        >
          Submit Self Reflection
        </Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <Paper sx={{ padding: 3, marginTop: 2 }}>
            <TextField
              label="What were your strengths and top achievements?"
              name="strengths"
              value={reflection.strengths}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="What are your areas for growth?"
              name="growthAreas"
              value={reflection.growthAreas}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="Career development insights or goals"
              name="careerGoals"
              value={reflection.careerGoals}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </Paper>
        </form>
      )}

      <Box mt={3}>
        <Button variant="outlined" color="secondary" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
