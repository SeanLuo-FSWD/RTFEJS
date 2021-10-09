import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "antd";
import "./MainCalendar.scss";
import { INITIAL_EVENTS } from "../../fakeDb/event-utils";
import dateCellRender from "./properties/dateCellRender";
import TaskModal from "../TaskDetail/TaskDetail";
import colorMainCal from "./functions/colorMainCal";

const _Modal_initial = {
  type: null,
  payload: null,
};

let main_cell_click = false;

function MainCalendar() {
  const [_Modal, set_Modal] = useState(_Modal_initial);
  const [_ForceUpdate, set_ForceUpdate] = useState(false);

  useEffect(() => {
    main_cell_click = false;
    colorMainCal();
    set_ForceUpdate(false);
  });

  useEffect(() => {
    const main_cell_body = document.querySelector(".ant-picker-content tbody");

    const setMainCellClick = () => {
      main_cell_click = true;
    };

    main_cell_body.addEventListener("click", setMainCellClick, true);

    return () => {
      main_cell_body.removeEventListener("click", setMainCellClick, true);
    };
  }, []);

  const onSelect = (date, setFormModal) => {
    if (main_cell_click) {
      let clickedDay = new Date(date);
      setFormModal(clickedDay);
    }
  };

  const setDetailModal = (e, event_id) => {
    e.stopPropagation();
    for (let i = 0; i < INITIAL_EVENTS.length; i++) {
      if (event_id === INITIAL_EVENTS[i].id) {
        set_Modal({ type: "event", payload: INITIAL_EVENTS[i] });
      }
    }
  };

  const setFormModal = (date) => {
    set_Modal({ type: "form", payload: { date } });
  };

  const closeModal = () => {
    set_Modal(_Modal_initial);
  };

  return (
    <div id="calendarMain">
      <Calendar
        dateCellRender={(date) => dateCellRender(date, setDetailModal)}
        onSelect={(date) => onSelect(date, setFormModal)}
        onPanelChange={() => set_ForceUpdate(true)}
      />
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

export default MainCalendar;
