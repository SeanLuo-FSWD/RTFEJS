import React, { useContext, useState } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { server_url } from "../../../env.config";
import logo from "../../../img/logo.png"

function LoginPg() {
  const { currentUser } = useContext(globalContext);

  const googleLogin = () => {
    window.open(`${server_url}api/auth/google`, "_self");
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  //need to figure out user 
  return (
    <div>
      <div className="left">
        <img src={logo}/>
      </div>
      <div className="right">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="form">
         <h2 data-cy="LoginPg_title">Login page</h2>
          <div>Email<input type="text"/></div>
          <div>Password<input type="text"/></div>
          <button>Login</button>
          <button onClick={googleLogin}>Google Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPg;
