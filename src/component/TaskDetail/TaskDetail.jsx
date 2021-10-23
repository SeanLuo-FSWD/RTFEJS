import React, { useState } from "react";
import Modal from "react-modal";
import { EVENTS } from "../../fakeDb/events";
import EventForm from "../EventForm/EventForm";
import Checkbox from "@mui/material/Checkbox";
import { FAKE_USERS } from "../../fakeDb/fakeUsers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },

  greyout: {
    backgroundColor: "lightgrey",
  },
};

Modal.setAppElement("#root");

function TaskModal({
  isOpenProp,
  closeModalProp,
  onAfterOpenProp,
  payloadProp,
}) {
  let modal;
  console.log("TaskModal - payloadProp.event_obj : ");
  console.log(payloadProp.event_obj);

  const [StatusCheck, setStatusCheck] = useState(
    payloadProp.event_obj.completed
  );

  const displayAssignees = () => {
    let matching_event = EVENTS.find((e) => {
      return e.id === payloadProp.event_obj.id;
    });

    // let assignees = payloadProp.event_obj.assignees.map((user) => {
    //   return <p>{user.username}</p>;
    // });

    let assigneesCompo = matching_event.assignees.map((user) => {
      return <p>{user.username}</p>;
    });

    return assigneesCompo;
  };

  const onStatusChange = () => {
    let eve = EVENTS.find((e) => {
      return e.id === payloadProp.event_obj.id;
    });

    const newState = !StatusCheck;
    console.log("1111111111111111111111");
    console.log(eve.completed);
    eve.completed = newState;
    console.log(EVENTS);

    let user = FAKE_USERS.find((e) => {
      return e.id === eve.assignees[0].id;
    });

    // user.points = newState
    //   ? user.points + eve.points
    //   : user.points - eve.points;

    if (newState) {
      user.points = user.points + eve.points;
      user.assignedPoints = user.assignedPoints + eve.points;
    } else {
      user.points = user.points - eve.points;
      user.assignedPoints = user.assignedPoints - eve.points;
    }

    console.log("cccccccccccccccccccc");
    console.log(FAKE_USERS);
    setStatusCheck(newState);
  };

  switch (isOpenProp) {
    case "event":
      modal = (
        <Modal
          isOpen={isOpenProp ? true : false}
          onRequestClose={closeModalProp}
          style={customStyles}
        >
          <p
            style={{
              backgroundColor: payloadProp.event_obj.color,
            }}
          >
            Title: {payloadProp.event_obj.title}
          </p>
          <p>Description: {payloadProp.event_obj.description}</p>
          <div>Assignees: {displayAssignees()}</div>

          <p>Points: {payloadProp.event_obj.points}</p>
          {/* <p>Completed: {`${payloadProp.event_obj.completed}`}</p> */}

          {payloadProp.duration && (
            <div>
              {" "}
              <p>start: {payloadProp.event_obj.duration[0]}</p>
              <p>end: {payloadProp.event_obj.duration[1]}</p>
            </div>
          )}

          <div>
            <label htmlFor="select_completion">Completed</label>
            <Checkbox
              checked={StatusCheck}
              onChange={(e) => {
                e.preventDefault();
                console.log("2222222222222222");
                console.log(e);
                onStatusChange();
              }}
              name="select_completion"
            />
          </div>
        </Modal>
      );
      break;

    default:
      // add new modal.
      modal = (
        <Modal
          isOpen={isOpenProp ? true : false}
          style={customStyles}
          onAfterOpen={onAfterOpenProp}
          onRequestClose={closeModalProp}
        >
          <EventForm
            payloadProp={payloadProp}
            closeModalProp={closeModalProp}
          />
        </Modal>
      );
      break;
  }

  // return isOpenProp && modal;
  return modal;
  // return <p>asdfds</p>;
}

export default TaskModal;
