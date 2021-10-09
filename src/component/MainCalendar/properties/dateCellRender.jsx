import React, { useState } from "react";
import { INITIAL_EVENTS } from "../../../fakeDb/event-utils";
import CustomUtil from "../../../helpers/CustomUtil";
import _ from "lodash";
import getTasksforDay from "../../../helpers/getTasksforDay";

const dateCellRender = (date, setModal) => {
  const calDate = CustomUtil.formatTimelessDate(date._d.toDateString());
  console.log("calDate " + calDate);

  let ele_arr = null;

  ele_arr = INITIAL_EVENTS.map((ele) => {
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
