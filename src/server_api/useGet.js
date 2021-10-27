import React from "react";
import axios from "axios";
import { server_api } from "../env.config";
import useErrorCatcher from "./errorCatcher.helper";

const useGet = () => {
  const [doErrorCatcher] = useErrorCatcher();
  const doGet = (path, cb) => {
    axios
      .get(`${server_api}${path}`, { withCredentials: true })
      // .get(`${server_api}${path}`)

      .then((response) => {
        // set_postData(response.data);
        console.log(`${server_api}${path}` + " doGet : response.data");
        console.log(response.data);
        if (cb) {
          cb(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        doErrorCatcher(err);
      });
  };

  return [doGet];
};

export default useGet;
