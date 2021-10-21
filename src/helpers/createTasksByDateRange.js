import getDaysFromDate from "./getDaysFromDate";
import { FAKE_USERS } from "../fakeDb/fakeUsers";
import dateDiffInDays from "./dateDiffInDays";
import getCreateTasks from "./getCreateTasks";

import _ from "lodash";

const createTasksByDateRange = () => {
  const lastUser = _.maxBy(FAKE_USERS, function (o) {
    return new Date(o.lastLogin).getTime();
  });

  console.log("1111111111111111111111");
  console.log(lastUser.lastLogin);
  const lastUserLogin = new Date(lastUser.lastLogin);

  const days_diff = dateDiffInDays(lastUserLogin, new Date());

  const all_dates_arr = getDaysFromDate(days_diff, lastUserLogin);

  console.log("2222222222222222");
  all_dates_arr.map((calDate) => {
    getCreateTasks(calDate);
  });
};

export default createTasksByDateRange;
