import React, { useState, useContext } from "react";
import { EVENTS, createEventId } from "../../../fakeDb/events";
import { TASK_TEMPLATES } from "../../../fakeDb/task_templates";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";
import getCreateTasks from "../../../helpers/getCreateTasks";
import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";
import getTasksforDay from "../../../helpers/getTasksforDay";
import { globalContext } from "../../../store/context/globalContext";

const DateCellRender = (date, setModal, addDates, Events) => {
  const { currentUser } = useContext(globalContext);
  const calDate = CustomUtil.formatTimelessDate(date._d.toDateString());

  let ele_arr = null;

  /*
    Adding reoccuring tasks to EVENTS here.
  */
  getCreateTasks(calDate, currentUser.roomKey);

  addDates(calDate);

  ele_arr = Events.map((ele) => {
    const item = (
      <div
        style={{ backgroundColor: ele.color, border: "thin solid black" }}
        onClick={(e) => setModal(e, ele.id)}
      >
        {ele.title}
      </div>
    );

    return getTasksforDay(calDate, item, ele, currentUser.roomKey);
  });

  return ele_arr;
};

export default DateCellRender;
