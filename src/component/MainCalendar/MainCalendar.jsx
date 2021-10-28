import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "antd";
import "./MainCalendar.scss";
import { EVENTS } from "../../fakeDb/events";
import DateCellRender from "./properties/DateCellRender";
import TaskModal from "../TaskDetail/TaskDetail";
import colorMainCal from "./functions/colorMainCal";
import turn2Calculator from "../../helpers/turn2Calculator";
import CustomUtil from "../../helpers/CustomUtil";
import usePost from "../../server_api/usePost";
import _ from "lodash";

const _Modal_initial = {
  type: null,
  payload: null,
};

let main_cell_click = false;

let dates_arr = [];

function MainCalendar() {
  const [_Modal, set_Modal] = useState(_Modal_initial);
  const [_ForceUpdate, set_ForceUpdate] = useState(false);
  const [Events, setEvents] = useState([]);
  const [doPost] = usePost();

  useEffect(() => {
    const list_days = document.querySelectorAll(
      ".ant-picker-content tbody .ant-picker-cell"
    );
    const first_day_str = new Date(
      list_days[0].getAttribute("title")
    ).toDateString();
    const firstDay = CustomUtil.formatTimelessDate(first_day_str);
    turn2Calculator(firstDay, 40);
    main_cell_click = false;
    colorMainCal();
    set_ForceUpdate(false);
    console.log("000000000000000000000");
    console.log(dates_arr[0]);
    console.log(dates_arr[dates_arr.length - 1]);
  });

  // 1. update dates_arr
  // 2. setEvents triggered, Events changed
  // 3. rerender trigerred
  // 4. dates_arr = [], under useEffect[Events]
  // 5. won't call setEvents as dates_arr = []
  // 6. No rerender triggered, end.
  useEffect(() => {
    if (dates_arr.length !== 0) {
      doPost(
        "user/events",
        { firstDay: dates_arr[0], lastDay: dates_arr[dates_arr.length - 1] },
        (res) => {
          dates_arr = [];
          if (!_.isEqual(Events, res.EVENTS)) {
            setEvents(res.EVENTS);
          }
        }
      );
    }
  }, [Events]);

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

  const addDates = (date) => {
    dates_arr.push(date);
  };

  const onSelect = (date, setFormModal) => {
    if (main_cell_click) {
      let clickedDay = new Date(date);
      setFormModal(clickedDay);
    }
  };

  const setDetailModal = (e, event_id) => {
    e.stopPropagation();
    for (let i = 0; i < EVENTS.length; i++) {
      if (event_id === EVENTS[i].id) {
        set_Modal({ type: "event", payload: EVENTS[i] });
      }
    }
  };

  const setFormModal = (date) => {
    set_Modal({ type: "form", payload: { date } });
  };

  const closeModal = () => {
    set_Modal(_Modal_initial);
  };

  const returnCalendar = () => {
    dates_arr = [];

    return (
      <Calendar
        dateCellRender={(date) =>
          DateCellRender(date, setDetailModal, addDates, Events)
        }
        onSelect={(date) => onSelect(date, setFormModal)}
        onPanelChange={() => set_ForceUpdate(true)}
      />
    );
  };

  return (
    <div id="calendarMain" className="antd_styling">
      {returnCalendar()}
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
