import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import LoginPage from "./Pages/account-mangement/login";
import RegisterPage from "./Pages/account-mangement/register";

import "./App.css";

// function PrivateRoute({ children, ...rest }) {
//   const [user, loading] = useAuthState(auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         loading ? (
//           <div>Loading...</div>
//         ) : user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/signin",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <PrivateRoute path="/account/manage" element={<ManageProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
