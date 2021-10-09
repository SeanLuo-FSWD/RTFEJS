import React, { useEffect, useState } from "react";
import { INITIAL_EVENTS, createEventId } from "../../fakeDb/event-utils";
import { FAKE_USERS } from "../../fakeDb/fakeUsers";
import CustomUtil from "../../helpers/CustomUtil";
import dateHighLight from "./dateHighLight";
import TypeSpecific from "./TypeSpecific";
import _ from "lodash";
import Checkbox from "@mui/material/Checkbox";

function EventForm({ payloadProp, closeModalProp }) {
  const initialForm = {
    id: null,
    title: null,
    description: null,
    type: "once",
    duration: [
      CustomUtil.formatTimelessDate(
        payloadProp.event_obj.date.toDateString(),
        true
      ),
      CustomUtil.formatTimelessDate(
        payloadProp.event_obj.date.toDateString(),
        true
      ),
    ],
    days: [],
    assignee: { id: FAKE_USERS[0].id, username: FAKE_USERS[0].username },
    points: null,
    completed: false,
    color: null,
  };
  const [formValue, setFormValue] = useState(initialForm);

  useEffect(() => {
    console.log("EventForm formValue: ");
    console.log(formValue);
    dateHighLight(formValue.duration);
  });

  const onFormChange = (values) => {
    setFormValue(values);
  };
  const onFormSubmit = () => {
    if (formValue.type === "once") {
      let dates_duration = formValue.duration.map((val) => {
        return CustomUtil.formatTimelessDate(
          new Date(val).toDateString(),
          true
        );
      });

      setFormValue({
        ...formValue,
        id: createEventId(),
        duration: dates_duration,
      });
    } else {
      setFormValue({
        ...formValue,
        id: createEventId(),
        days: formValue.days,
      });
    }

    console.dir("form values: " + formValue);
    console.log(formValue);

    INITIAL_EVENTS.push(formValue);
    closeModalProp();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formValue);
        onFormSubmit();
        onFormChange(formValue);
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <input
            name="title"
            placeholder="title"
            value={formValue.title || ""}
            type="text"
            onChange={(e) => {
              onFormChange({ ...formValue, title: e.target.value });
            }}
          />
          <textarea
            name="description"
            placeholder="description"
            value={formValue.description || ""}
            onChange={(e) => {
              onFormChange({ ...formValue, description: e.target.value });
            }}
          />

          <div>
            <label htmlFor="select_assignee">Assignee</label>
            <select
              id="select_assignee"
              onChange={(e) => {
                const full_user = _.filter(FAKE_USERS, (u) => {
                  return u.id === parseInt(e.target.value);
                });

                const assignee = {
                  id: full_user[0].id,
                  username: full_user[0].username,
                };

                setFormValue({
                  ...formValue,
                  assignee,
                });
              }}
            >
              {FAKE_USERS.map((u) => {
                return <option value={u.id}>{u.username}</option>;
              })}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="select_frequency">Frequency</label>
          <select
            id="select_frequency"
            onChange={(e) =>
              setFormValue({ ...formValue, type: e.target.value })
            }
          >
            <option value="once">once</option>
            <option value="monthly">monthly</option>
            <option value="weekly">weekly</option>
          </select>
        </div>

        <div>
          <label htmlFor="select_points">Points</label>
          <select
            id="select_points"
            onChange={(e) =>
              setFormValue({ ...formValue, points: e.target.value })
            }
          >
            <option value="">N/A</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div>
          <label for="select_completion">Completed</label>
          <Checkbox
            checked={formValue.completed}
            onChange={(e) => {
              console.log("666666666666666666");
              console.log(formValue.completed);
              setFormValue({ ...formValue, completed: !formValue.completed });
            }}
            name="select_completion"
          />
        </div>

        <div>
          <label htmlFor="select_points">Color</label>
          <select
            id="select_points"
            onChange={(e) =>
              setFormValue({ ...formValue, color: e.target.value })
            }
          >
            <option value="">N/A</option>
            <option value="lightgreen">green</option>
            <option value="lightcoral">red</option>
            <option value="yellow">yellow</option>
            <option value="lightblue">blue</option>
          </select>
        </div>
      </div>

      <TypeSpecific onFormChange={onFormChange} formValue={formValue} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;
