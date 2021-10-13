import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isAuth, Component }) {
  return (
    <Route
      //   {...rest}
      render={(props) => {
        if (isAuth) {
          console.log("1111111111111111111111");
          console.log(isAuth);
          return <Component />;
        } else {
          console.log("2222222222222222");
          console.log(isAuth);
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
