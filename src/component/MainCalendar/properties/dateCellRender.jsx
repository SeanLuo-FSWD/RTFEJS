import React, { useState } from "react";
import { EVENTS, createEventId } from "../../../fakeDb/events";
import { TASK_TEMPLATES } from "../../../fakeDb/task_templates";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";
import getCreateTasks from "../../../helpers/getCreateTasks";
import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";
import getTasksforDay from "../../../helpers/getTasksforDay";

const dateCellRender = (date, setModal) => {
  const calDate = CustomUtil.formatTimelessDate(date._d.toDateString());

  let ele_arr = null;

  /*
    Adding reoccuring tasks to EVENTS here.
  */
  getCreateTasks(calDate);

  ele_arr = EVENTS.map((ele) => {
    const item = (
      <div
        style={{ backgroundColor: ele.color, border: "thin solid black" }}
        onClick={(e) => setModal(e, ele.id)}
      >
        {ele.title}
      </div>
    );

    return getTasksforDay(calDate, item, ele);
  });

  return ele_arr;
};

export default dateCellRender;
