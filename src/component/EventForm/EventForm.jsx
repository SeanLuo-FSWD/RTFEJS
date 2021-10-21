import React, { useEffect, useState } from "react";
import { EVENTS, createEventId } from "../../fakeDb/events";
import { TASK_TEMPLATES, createTemplateId } from "../../fakeDb/task_templates";
import CustomUtil from "../../helpers/CustomUtil";
import dateHighLight from "./dateHighLight";
import TypeSpecific from "./TypeSpecific";
import _ from "lodash";
import { Transfer } from "antd";
import UserTransfer from "./UserTransfer";
import getDaysFromDate from "../../helpers/getDaysFromDate";
import getCreateTasks from "../../helpers/getCreateTasks";

function EventForm({ payloadProp, closeModalProp }) {
  const initialForm = {
    shared: {
      title: "",
      description: "",
      type: "once",
      points: null,
      color: null,
      assignees: [],
    },
    once: {
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
      completed: false,
    },
    template: {
      days: [],
      beginDate: CustomUtil.formatTimelessDate(
        payloadProp.event_obj.date.toDateString(),
        true
      ),
    },
  };
  const [formValue, setFormValue] = useState(initialForm);

  useEffect(() => {
    console.log("EventForm formValue: ");
    console.log(formValue);
    dateHighLight(formValue.once.duration);
  });

  const onFormChange = (values) => {
    setFormValue(values);
  };
  const onFormSubmit = () => {
    console.log("fffffffffffffffffffffff_____onFormSubmit: formValue");
    console.log(formValue);

    let submit_obj;
    if (formValue.shared.type === "once") {
      submit_obj = { ...formValue.shared, ...formValue.once };

      submit_obj.id = createEventId();
      EVENTS.push(submit_obj);
    } else {
      submit_obj = { ...formValue.shared, ...formValue.template };
      submit_obj.id = createEventId();
      TASK_TEMPLATES.push(submit_obj);
    }

    /* Get a month from today to create all the tasks for the first month */
    // const days_arr = getDaysFromDate(31);
    // days_arr.map((calDate) => {
    //   getCreateTasks(calDate);
    // });

    console.log("aaaaaaaaaaaaaaaaaaaaaaaa_____onFormSubmit: submit_obj");

    console.log(submit_obj);
    setFormValue(initialForm);
    closeModalProp();
  };

  console.log("88888888888888888888 formValue.shared.assignees: ");
  console.log(formValue.shared.assignees);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <input
            name="title"
            placeholder="title"
            value={formValue.shared.title}
            type="text"
            onChange={(e) => {
              setFormValue({
                ...formValue,
                shared: { ...formValue.shared, title: e.target.value },
              });
            }}
          />
          <textarea
            name="description"
            placeholder="description"
            value={formValue.shared.description}
            onChange={(e) => {
              setFormValue({
                ...formValue,
                shared: { ...formValue.shared, description: e.target.value },
              });
            }}
          />

          <UserTransfer formValue={formValue} onFormChange={onFormChange} />
        </div>

        <div>
          <label htmlFor="select_frequency">Frequency</label>
          <select
            id="select_frequency"
            // @@obj_dest
            onChange={(e) =>
              setFormValue({
                ...formValue,
                shared: { ...formValue.shared, type: e.target.value },
              })
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
              setFormValue({
                ...formValue,
                shared: { ...formValue.shared, points: e.target.value },
              })
            }
          >
            <option value="">N/A</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div>
          <label htmlFor="select_points">Color</label>
          <select
            id="select_points"
            onChange={(e) =>
              setFormValue({
                ...formValue,
                shared: { ...formValue.shared, color: e.target.value },
              })
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
