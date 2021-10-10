import React, { useEffect, useState } from "react";
import { EVENTS, createEventId } from "../../fakeDb/events";
import { FAKE_USERS } from "../../fakeDb/fakeUsers";
import { TASK_TEMPLATES, createTemplateId } from "../../fakeDb/task_templates";
import CustomUtil from "../../helpers/CustomUtil";
import dateHighLight from "./dateHighLight";
import TypeSpecific from "./TypeSpecific";
import _ from "lodash";
import { Transfer } from "antd";

function EventForm({ payloadProp, closeModalProp }) {
  const initialForm = {
    shared: {
      title: "",
      description: "",
      type: "once",
      points: null,
      color: null,
      // To fix this
      assignees: [{ id: FAKE_USERS[0].id, username: FAKE_USERS[0].username }],
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
    },
  };
  const [formValue, setFormValue] = useState(initialForm);

  const [transferVal, setTransferVal] = useState(["1", "2", "3"]);

  useEffect(() => {
    console.log("EventForm formValue: ");
    console.log(formValue);
    dateHighLight(formValue.once.duration);
  });

  const onTransferChange = (params, d, mk) => {
    console.log("777777777777777777777 onTransferChange");
    console.log(params);
    console.log(d);
    console.log(mk);
  };

  const onSelectChange = (ssk, tsk) => {
    console.log("666666666666666666");
    console.log(ssk);
    console.log(tsk);
  };

  const onFormChange = (values) => {
    setFormValue(values);
  };
  const onFormSubmit = () => {
    console.log("fffffffffffffffffffffff_____onFormSubmit: formValue");
    console.log(formValue);

    let submit_obj;
    if (formValue.shared.type === "once") {
      // let dates_duration = formValue.once.duration.map((val) => {
      //   return CustomUtil.formatTimelessDate(
      //     new Date(val).toDateString(),
      //     true
      //   );
      // });
      submit_obj = { ...formValue.shared, ...formValue.once };

      submit_obj.id = createEventId();
      EVENTS.push(submit_obj);
    } else {
      submit_obj = { ...formValue.shared, ...formValue.template };
      submit_obj.id = createEventId();
      TASK_TEMPLATES.push(submit_obj);
    }

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
          <div>
            <label htmlFor="select_assignee">Assignee</label>
            <div className="flex">
              <div>
                {FAKE_USERS.map((u) => {
                  return (
                    <p
                      onClick={(e) => {
                        console.log(e.target.id);

                        const full_user = _.filter(FAKE_USERS, (u) => {
                          return u.id === parseInt(e.target.id);
                        });

                        const assignee = {
                          id: full_user[0].id,
                          username: full_user[0].username,
                        };

                        const new_assignees = [
                          ...formValue.shared.assignees,
                          assignee,
                        ];
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
                        console.log(new_assignees);

                        setFormValue({
                          ...formValue,
                          shared: {
                            ...formValue.shared,
                            assignees: new_assignees,
                          },
                        });
                      }}
                      id={u.id}
                    >
                      {u.username}
                    </p>
                  );
                })}
              </div>

              <div>
                asdfsd
                {formValue.shared.assignees.map((u) => {
                  console.log("3333333333333333");
                  console.log(u);
                  return <p>{u.username}</p>;
                })}
              </div>
            </div>
          </div>

          {/* Need to fix this by adding toggle forms */}
          {/* <div> 
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
          </div> */}
        </div>

        <div>
          <label htmlFor="select_frequency">Frequency</label>
          <select
            id="select_frequency"
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

        {/* <div>
          <label for="select_completion">Completed</label>
          <Checkbox
            checked={formValue.once.completed}
            onChange={(e) => {
              console.log("666666666666666666");
              console.log(formValue.once.completed);
              setFormValue({ ...formValue, completed: !formValue.once.completed });
            }}
            name="select_completion"
          />
        </div> */}

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
