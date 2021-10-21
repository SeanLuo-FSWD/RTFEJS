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
import { EVENTS } from "../../fakeDb/events";
import createTasksByDateRange from "../../helpers/createTasksByDateRange";
import CustomUtil from "../../helpers/CustomUtil";

import UsersPg from "../pages/UsersPg/UsersPg";

function Router() {
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [doGet] = useGet();

  useEffect(() => {
    // doGet("auth/authenticate", (res) => {
    //   if (res) {
    //     setCurrentUser(res);
    //   } else {
    //     console.log("Router: user not authenticated");
    //   }
    // });

    /* Checking and create any missed PASSED tasks since last login */

    /* To be moved to login, once connected to the db */
    createTasksByDateRange();
    console.log("EVENTS_aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(EVENTS.length);
    FAKE_USERS.forEach((u) => {
      console.log("??????");
      u.assignedPoints = 0;
      EVENTS.forEach((e) => {
        console.log(e); //assignees: null
        // need to set the past assignees as well. Can we abstract this out? May not be able to match calendar or home view as they are future looking, this one is not view dependent, but date(today) dependent.
        console.log(
          "e.duration[0]_bbbbbbbbbbbbbbbbbb_new Date().toDateString()"
        );
        if (
          e.assignees[0].id === u.id &&
          new Date(e.duration[0]).getTime() <
            CustomUtil.formatTimelessDate(new Date().toDateString()).getTime()
        ) {
          u.assignedPoints += e.points;
        }
      });
    });

    setCurrentUser(FAKE_USERS[0]);
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

          <ProtectedRoute
            path="/users"
            Component={UsersPg}
            isAuth={currentUser}
          />

          <ProtectedRoute path="/" Component={HomePg} isAuth={currentUser} />
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
}

export default Router;
