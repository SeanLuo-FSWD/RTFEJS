import React, { useState } from "react";
import { EVENTS, createEventId } from "../../../fakeDb/events";
import { TASK_TEMPLATES } from "../../../fakeDb/task_templates";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";

import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";
import getTasksforDay from "../../../helpers/getTasksforDay";

const dateCellRender = (date, setModal) => {
  const calDate = CustomUtil.formatTimelessDate(date._d.toDateString());

  const day_tasks = _.filter(EVENTS, (task) => {
    const task_date = new Date(task.duration[0]);
    console.log("????????");
    console.log("task_date: " + task_date.toString());
    console.log("calDate: " + calDate.toString());

    console.log(task_date.getTime() == calDate.getTime());

    // return task_date == calDate && task.type != "once";
    return task_date.getTime() == calDate.getTime();

    // return u.id === parseInt(e.target.value);
  });

  if (day_tasks.length > 0) {
    console.log("..................................");
  }

  const day_templateIds = day_tasks.map((task) => {
    return task.templateId;
  });

  let ele_arr = null;

  // Need to push to events here.

  const getCreateTasks = () => {
    TASK_TEMPLATES.forEach((task) => {
      task.days.forEach((day) => {
        let unified_day = day;
        let cell_day;
        if (task.type === "monthly") {
          cell_day = calDate.getDate();
          if (day === "month end") {
            unified_day = CustomUtil.getMonthLastDate(calDate);
          }
        } else {
          // weekly here
          cell_day = calDate.getDay();
        }

        console.log("sssssssssssssssssssssssss________");
        console.log(cell_day);
        console.log(unified_day);
        console.log("_______sssssssssssssssssssssssss");
        console.log(day_templateIds);
        console.log(task.id);
        console.log(!day_templateIds.includes(task.id));
        console.log("________________________________");

        // what if Oct matched with Nov? If have one have it, then problem.
        if (cell_day == unified_day && !day_templateIds.includes(task.id)) {
          console.log("puuuuuuuuuush");
          EVENTS.push({
            id: createEventId(),
            templateId: task.id,
            title: task.title,
            type: task.type,
            description: task.description,
            duration: [
              CustomUtil.formatTimelessDate(calDate.toDateString(), true),
              CustomUtil.formatTimelessDate(calDate.toDateString(), true),
            ],
            days: [],
            // to update below
            assignee: {
              id: FAKE_USERS[2].id,
              username: FAKE_USERS[2].username,
            },
            points: task.points,
            completed: false,
            color: task.color,
          });
        }
      });
    });
  };

  getCreateTasks();
  console.log("444444444444444444---------");
  console.log(EVENTS);

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
