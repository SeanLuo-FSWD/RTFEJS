import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { get } from "lodash";

const ErrorHandler = ({ children }) => {
  const location = useLocation();


  const err_msg = get(location.state, "errorMsg");

  console.log("ErrorHandler called - err_msg:");
  console.log(err_msg);

  let goback_path;
  let redirect_path;

  if (err_msg) {
    console.log("ErrorHandler found error :");
    console.log(err_msg);
  }

  switch (err_msg) {
    case "Forbidden resource":
      redirect_path = "/login";
      break;

    default:
      goback_path = window.location.pathname;
      redirect_path = "/error";
      break;
  }

  return err_msg ? (
    <Redirect
      push
      to={{
        pathname: redirect_path,
        state: { err_msg, goback_path },
      }}
    />
  ) : (
    children
  );
};

export default ErrorHandler;
