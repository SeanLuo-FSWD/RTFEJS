import React from "react";
import Modal from "react-modal";
import EventForm from "../EventForm/EventForm";

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

  const displayAssignees = () => {
    let assignees = payloadProp.event_obj.assignees.map((user) => {
      return <p>{user.username}</p>;
    });
    return assignees;
  };

  switch (isOpenProp) {
    case "event":
      modal = (
        <Modal
          isOpen={isOpenProp ? true : false}
          onRequestClose={closeModalProp}
          style={customStyles}
        >
          <form>
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
            <p>Completed: {`${payloadProp.event_obj.completed}`}</p>

            {payloadProp.duration && (
              <div>
                {" "}
                <p>start: {payloadProp.event_obj.duration[0]}</p>
                <p>end: {payloadProp.event_obj.duration[1]}</p>
              </div>
            )}
          </form>
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

  return isOpenProp && modal;
  // return <p>asdfds</p>;
}

export default TaskModal;
