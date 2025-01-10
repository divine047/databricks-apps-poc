// // src/components/Profile.js

// import React from 'react';
// import { Card, CardContent, CardHeader, Avatar, Typography, Divider, Box, Grid } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// // Importing the background image from the src folder
// import backgroundImage from '../images/images.jpeg'; // Adjust the path if necessary

// const Profile = () => {
//   // Sample user data
//   const user = {
//     name: 'Santhosh Kumar R',
//     role: 'Sr. IT Application Engineer',
//     officeLocation: 'Bengaluru Office',
//     dateOfJoining: '1 year(s) and 2 month(s) ago',
//     email: 'santhosh.kumar@databricks.com',
//     managerName: 'Aman Gupta',
//     managerRole: 'Sr. Manager, IT Software Engineering',
//     avatarUrl: '',
//   };

//   const theme = useTheme();  // Access current theme

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3, marginTop: '64px' }}>
//       <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 10, borderRadius: 2, overflow: 'hidden', transition: 'transform 0.3s ease-in-out' }}>
//         {/* Card Header with Background Image and Profile Picture */}
//         <CardHeader
//           avatar={
//             <Avatar
//               alt={user.name}
//               src={user.avatarUrl}
//               sx={{ width: 100, height: 100, margin: '0 auto', border: '4px solid white' }}  // Avatar styling
//             />
//           }
//           sx={{
//             backgroundImage: `url(${backgroundImage})`,  // Use imported image for background
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             textAlign: 'center',
//             color: theme.palette.mode === 'dark' ? 'white' : 'black',  // Text color based on theme
//             padding: 2,  // Add padding to create space around the text
//             height: 200,  // Set a fixed height for the header
//             position: 'relative',  // Positioning for the overlay text
//           }}
//         />
        
//         <CardContent>
//           {/* Left side: Employee Info */}
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" color="text.primary" gutterBottom>
//                 Employee Information
//               </Typography>
//               <Divider sx={{ marginBottom: 2 }} />
//               <Box>
//                 {/* Name and Role inside Employee Information */}
//                 <Typography variant="h5" color="text.primary" gutterBottom>
//                   {user.name}
//                 </Typography>
//                 <Typography variant="body1" color="text.primary" gutterBottom>
//                   <strong>Role:</strong> {user.role}
//                 </Typography>

//                 {/* Other details inside Employee Information */}
//                 <Typography variant="body1" color="text.primary">
//                   <strong>Office Location:</strong> {user.officeLocation}
//                 </Typography>
//                 <Typography variant="body1" color="text.primary">
//                   <strong>Date of Joining:</strong> {user.dateOfJoining}
//                 </Typography>
//                 <Typography variant="body1" color="text.primary">
//                   <strong>Email:</strong> {user.email}
//                 </Typography>
//               </Box>
//             </Grid>

//             {/* Right side: Manager Info */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" color="text.primary" gutterBottom>
//                 Manager Information
//               </Typography>
//               <Divider sx={{ marginBottom: 2 }} />
//               <Box>
//                 <Typography variant="body1" color="text.primary">
//                   <strong>Manager:</strong> {user.managerName}
//                 </Typography>
//                 <Typography variant="body1" color="text.primary">
//                   <strong>Role:</strong> {user.managerRole}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Profile;

// src/components/Profile.js
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Divider, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();  // Get user from AuthContext and check if it's loading
  const theme = useTheme();

  // If user data is still loading, show a loading message
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>User not logged in!</Typography>; // Handle when no user is logged in
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3, marginTop: '64px' }}>
      <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 10, borderRadius: 2, overflow: 'hidden' }}>
        <CardHeader
          avatar={<Avatar alt={user.name} sx={{ width: 100, height: 100 }} />}
          title={user.name}
          subheader={user.role}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Employee Information</Typography>
              <Divider />
              <Box>
                <Typography variant="body1"><strong>Office:</strong> {user.officeLocation}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body1"><strong>Joining Date:</strong> {user.dateOfJoining}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Manager Information</Typography>
              <Divider />
              <Box>
                <Typography variant="body1"><strong>Manager:</strong> {user.managerName}</Typography>
                <Typography variant="body1"><strong>Manager Role:</strong> {user.managerRole}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;

