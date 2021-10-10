import React, { useState, useEffect, useRef } from "react";
import { EVENTS } from "../../fakeDb/events";
import getDaysFromToday from "../../helpers/getDaysFromToday";
import getTasksforDay from "../../helpers/getTasksforDay";
import TaskModal from "../TaskDetail/TaskDetail";
import CustomUtil from "../../helpers/CustomUtil";

const _Modal_initial = {
  type: null,
  payload: null,
};

function TaskList() {
  const [_Modal, set_Modal] = useState(_Modal_initial);
  const closeModal = () => {
    set_Modal(_Modal_initial);
  };

  const setDetailModal = (e, event_id) => {
    e.stopPropagation();
    for (let i = 0; i < EVENTS.length; i++) {
      if (event_id === EVENTS[i].id) {
        set_Modal({ type: "event", payload: EVENTS[i] });
      }
    }
  };

  const days_arr = getDaysFromToday(30);

  let taskListCompo = days_arr.map((calDate) => {
    let ele_arr = null;

    ele_arr = EVENTS.filter((ele) => {
      return getTasksforDay(calDate, true, ele);
    }).map((ele) => {
      const item = (
        // <button onClick={(e) => setDetailModal(e, ele.id)}>{ele.title}</button>
        <div
          style={{ backgroundColor: ele.color, border: "thin solid black" }}
          onClick={(e) => setDetailModal(e, ele.id)}
        >
          {ele.title}
        </div>
      );

      const hasEvents = getTasksforDay(calDate, item, ele);

      return hasEvents;
    });

    const today = CustomUtil.formatTimelessDate(new Date().toDateString());

    let dateDisplay;

    if (today.getTime() === calDate.getTime()) {
      dateDisplay = "Today";
    } else if (
      today.getTime() ===
      CustomUtil.formatTimelessDate(calDate.toDateString(), false, {
        offsetType: "day",
        amount: -1,
      }).getTime()
    ) {
      dateDisplay = "Tomorrow";
    } else {
      dateDisplay = calDate.toISOString().replace(/T.*$/, "");
    }

    if (ele_arr.length > 0) {
      return (
        <div>
          <h2>{dateDisplay}</h2>
          <div>{ele_arr}</div>
        </div>
      );
    }
  });

  return (
    <div>
      {taskListCompo}

      {_Modal.type && (
        <TaskModal
          isOpenProp={_Modal.type}
          closeModalProp={closeModal}
          payloadProp={{ event_obj: _Modal.payload }}
        />
      )}
    </div>
  );
}

export default TaskList;
