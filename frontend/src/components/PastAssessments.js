// // src/components/PastAssessments.js

// import React, { useState } from 'react';
// import { Card, CardContent, Button, Typography, Divider, Box, Paper } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const PastAssessments = () => {
//   // State to handle showing the self-reflection
//   const [showSelfReflection, setShowSelfReflection] = useState(false);

//   // Sample data for the self-reflection
//   const selfReflectionData = {
//     cycle: "MY FY25",
//     submissionDate: "01 Aug 2024",
//     selfReflectionText: {
//       heading: "Your Self-Reflection",
//       description: `Your self-reflection is a place to reflect on your performance here at Databricks during the review period. It’s a chance for you to highlight things that have gone well and note things you might have done differently. Your perspective will help guide your manager as they prepare their feedback. It will also help both of you prepare for your performance conversation.`,
//       answers: [
//         {
//           question: "What were your strengths and top achievements during the review period?",
//           answer: "I successfully completed the XYZ project, exceeding expectations in terms of both quality and timeline."
//         },
//         {
//           question: "What are your areas for growth and improvement during the next review period?",
//           answer: "I need to work on better time management, and improve my public speaking and presentation skills."
//         },
//         {
//           question: "Use this field to share any career development insights, goals, or questions you’d like to discuss with your manager during your check-in.",
//           answer: "I would like to explore leadership opportunities and take on more responsibilities related to project management."
//         }
//       ]
//     }
//   };

//   const theme = useTheme();  // Access current theme

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3, marginTop: '64px' }}>
//       {/* Past Assessment Card */}
//       <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 10, borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" color="text.primary" gutterBottom>
//             My PERF
//           </Typography>

//           <Divider sx={{ marginBottom: 2 }} />

//           <Box>
//             <Typography variant="body1" color="text.primary">
//               <strong>Cycle:</strong> {selfReflectionData.cycle}
//             </Typography>
//             <Typography variant="body1" color="text.primary">
//               <strong>Self-Reflection:</strong> Submitted {selfReflectionData.submissionDate}
//             </Typography>

//             {/* Button to show self-reflection */}
//             <Button 
//               variant="contained" 
//               color="primary" 
//               onClick={() => setShowSelfReflection(!showSelfReflection)} 
//               sx={{ marginTop: 2 }}
//             >
//               {showSelfReflection ? 'Hide Self-Reflection' : 'View Self-Reflection'}
//             </Button>

//             {/* Show self-reflection details when button is clicked */}
//             {showSelfReflection && (
//               <Paper sx={{ marginTop: 3, padding: 3, backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#f9f9f9' }}>
//                 <Typography variant="h6" color="text.primary" gutterBottom>
//                   {selfReflectionData.selfReflectionText.heading}
//                 </Typography>

//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   {selfReflectionData.selfReflectionText.description}
//                 </Typography>

//                 {/* Display the answers to the 3 questions */}
//                 {selfReflectionData.selfReflectionText.answers.map((item, index) => (
//                   <Box key={index} sx={{ marginBottom: 2 }}>
//                     <Typography variant="body1" color="text.primary">
//                       <strong>{item.question}</strong>
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" paragraph>
//                       {item.answer}
//                     </Typography>
//                     <Divider sx={{ marginBottom: 2 }} />
//                   </Box>
//                 ))}
//               </Paper>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PastAssessments;


// src/components/PastAssessments.js

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Divider, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const PastAssessments = () => {
  const [pastAssessments, setPastAssessments] = useState([]);
  const [showSelfReflection, setShowSelfReflection] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('/api/assessments', { withCredentials: true });
        setPastAssessments(response.data);
      } catch (error) {
        console.log('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3, marginTop: '64px' }}>
      <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 10, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            My Past Assessments
          </Typography>

          <Divider sx={{ marginBottom: 2 }} />

          {/* Display past assessments */}
          {pastAssessments.length > 0 ? (
            pastAssessments.map((assessment) => (
              <Box key={assessment.id}>
                <Typography variant="body1" color="text.primary">
                  <strong>Cycle:</strong> {assessment.cycle}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <strong>Self-Reflection:</strong> Submitted {assessment.submissionDate}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowSelfReflection(!showSelfReflection)}
                  sx={{ marginTop: 2 }}
                >
                  {showSelfReflection ? 'Hide Self-Reflection' : 'View Self-Reflection'}
                </Button>

                {showSelfReflection && (
                  <Paper sx={{ marginTop: 3, padding: 3, backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#f9f9f9' }}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      {assessment.selfReflectionText.heading}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {assessment.selfReflectionText.description}
                    </Typography>
                    {assessment.selfReflectionText.answers.map((item, index) => (
                      <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="body1" color="text.primary">
                          <strong>{item.question}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {item.answer}
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                      </Box>
                    ))}
                  </Paper>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No assessments found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PastAssessments;
