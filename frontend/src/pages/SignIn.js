import React, { useState } from "react";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

const Sign = () => {
  const [page, setPage] = useState("sign-in");

  return (
    <div>
      {page == "sign-in" ? (
        <SignIn setPage={setPage} />
      ) : (
        <SignUp setPage={setPage} />
      )}
    </div>
  );
};

export default Sign;
