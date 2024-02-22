import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/profile";
import SignUp from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";
import Forgot from "./components/forgot";
import CreateModel from "./components/create";
import IsLoggedIn from "./components/isLogged";

const PrivateRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn()) {
    return <Login />;
  }

  return children;
};

// Main function app to hold all the routing
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute isLoggedIn={IsLoggedIn}>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/logout"
            element={
              <PrivateRoute isLoggedIn={IsLoggedIn}>
                <Logout />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route
            path="/create"
            element={
              <PrivateRoute isLoggedIn={IsLoggedIn}>
                <CreateModel />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
