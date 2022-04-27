import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div>
      <Routes>
        {/* Un-Protected Routes */}
        {!userInfo && <Route path="/sign-in" element={<SignIn />} exact />}

        {/* Protected Routes */}
        {userInfo && <Route path="/" element={<Home />} exact auth={true} />}

        {/* Fail safe */}
        <Route
          path="*"
          element={<Navigate to={userInfo ? "/" : "/sign-in"} />}
          exact
          auth={true}
        />
      </Routes>
    </div>
  );
};

export default App;
