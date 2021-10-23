import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { globalContext } from "../../store/context/globalContext";
import CommunityPg from "../pages/CommunityPg/CommunityPg";

function ProtectedRoute({ isAuth, Component }) {
  const { currentUser } = useContext(globalContext);

  return (
    <Route
      // {...rest}
      render={(props) => {
        if (isAuth) {
          if (currentUser.roomKey) {
            return <Component />;
          } else {
            return <CommunityPg />;
          }
        } else {
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
