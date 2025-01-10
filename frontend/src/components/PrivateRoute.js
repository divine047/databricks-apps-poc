// // src/components/PrivateRoute.js

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={user ? <Element /> : <Redirect to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;


// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
