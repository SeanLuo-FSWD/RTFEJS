import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPg from "../pages/LoginPg/LoginPg";
import ErrorHandler from "./ErrorHandler";
import ErrorPg from "../pages/ErrorPg/ErrorPg";
import useGet from "../../server_api/useGet";
import ProtectedRoute from "./ProtectedRoute";
import HomePg from "../pages/HomePg/HomePg";
import { globalContext } from "../../store/context/globalContext";
import CalendarPg from "../pages/Calendar/CalendarPg";
import { FAKE_USERS } from "../../fakeDb/fakeUsers";

function Router() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();

  useEffect(() => {
    doGet("auth/authenticate", (res) => {
      if (res) {
        setCurrentUser(res);
      } else {
        console.log("Router: user not authenticated");
      }
    });

    // setCurrentUser(FAKE_USERS[1]);
  }, []);

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/error" component={ErrorPg} />
          <Route path="/login" component={LoginPg} />

          <ProtectedRoute
            path="/calendar"
            Component={CalendarPg}
            isAuth={currentUser}
            key="uniquevalue"
          />
          <ProtectedRoute path="/" Component={HomePg} isAuth={currentUser} />
          {/* <ProtectedRoute
            path="/"
            Component={CalendarPg}
            isAuth={currentUser}
          /> */}
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
}

export default Router;
