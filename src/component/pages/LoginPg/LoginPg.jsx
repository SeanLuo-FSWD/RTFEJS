import React, { useContext, useState } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { server_api } from "../../../env.config";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";
import { EVENTS } from "../../../fakeDb/events";

function LoginPg() {
  const { currentUser } = useContext(globalContext);

  const googleLogin = () => {
    /* To be activated and modified once backend connects */
    // FAKE_USERS.forEach((u) => {
    //   u.assignedPoints = 0;
    //   EVENTS.forEach((e) => {
    //     if (e.assignees[0].id === u.id) {
    //       u.assignedPoints += e.points;
    //     }
    //   });
    // });

    window.open(`${server_api}auth/google`, "_self");
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <h2 data-cy="LoginPg_title">Login page</h2>

      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
}

export default LoginPg;
