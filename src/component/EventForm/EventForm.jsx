import React, { useEffect, useState } from "react";
import { INITIAL_EVENTS, createEventId } from "../../fakeDb/event-utils";
import CustomUtil from "../../helpers/CustomUtil";
import Picker from "react-calendar";
import pickDates from "./pickDates";
import dateHighLight from "./dateHighLight";

const monthArr = [];

monthArr.push("select");
for (let i = 1; i <= 31; i++) {
  monthArr.push(i.toString());
}
monthArr.push("month end");

function EventForm({ payloadProp, closeModalProp }) {
  const initialForm = {
    id: null,
    title: null,
    description: null,
    type: "once",
    duration: [],
    days: [],
  };
  const [formValue, setFormValue] = useState(initialForm);

  useEffect(() => {
    dateHighLight(formValue.duration);
  });
  useEffect(() => {
    setFormValue({
      ...formValue,
      duration: [
        CustomUtil.formatTimelessDate(
          payloadProp.event_obj.date.toDateString(),
          true
        ),
      ],
    });
  }, []);
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
          value={formValue.description}
          onChange={(e) => {
            onFormChange({ ...formValue, description: e.target.value });
          }}
        />
        <select
          id="select"
          onChange={(e) => setFormValue({ ...formValue, type: e.target.value })}
        >
          <option value="once">once</option>
          <option value="monthly">monthly</option>
          <option value="weekly">weekly</option>
        </select>
      </div>

      {formValue.type === "once" ? (
        <div style={{ display: "flex" }}>
          <div>
            <p>
              Start date:{" "}
              {formValue.duration[0] ? (
                <span> {formValue.duration[0]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>
            <div className="pick_start">
              <Picker
                // activeStartDate={payloadProp.event_obj.date}
                defaultActiveStartDate={
                  formValue.duration[0] && new Date(formValue.duration[0])
                }
                //   onChange={(date: any) => pickDates(date, true)}
                onChange={
                  (date) => {
                    let new_duration = pickDates(
                      date,
                      [...formValue.duration],
                      true
                    );

                    new_duration &&
                      onFormChange({ ...formValue, duration: new_duration });
                  }
                  // "duration", new_duration
                }
              />
            </div>
          </div>

          <div>
            <p>
              End date:{" "}
              {formValue.duration[1] ? (
                <span> {formValue.duration[1]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>

            <div className="pick_end">
              <Picker
                defaultActiveStartDate={
                  formValue.duration[0] && new Date(formValue.duration[0])
                }
                onChange={
                  (date) => {
                    let new_duration = pickDates(
                      date,
                      [...formValue.duration],
                      false
                    );

                    new_duration &&
                      onFormChange({ ...formValue, duration: new_duration });
                  }
                  // "duration", new_duration
                }
              />
            </div>
          </div>
        </div>
      ) : formValue.type === "monthly" ? (
        <div>
          <div style={{ display: "flex" }}>
            days:
            {formValue.days.map((d) => {
              return <p>{d},</p>;
            })}
          </div>
          <select
            name="days"
            onChange={(e) => {
              if (
                e.target.value !== "select" &&
                !formValue.days.includes(parseInt(e.target.value))
              ) {
                const new_days = [...formValue.days, parseInt(e.target.value)];

                setFormValue({ ...formValue, days: new_days });
              }
            }}
          >
            {monthArr.map((day) => {
              return <option key={day}>{day}</option>;
            })}
          </select>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            days:
            {formValue.days.map((d) => {
              let day_str;

              switch (d) {
                case 0:
                  day_str = "Sun";
                  break;
                case 1:
                  day_str = "Mon";
                  break;
                case 2:
                  day_str = "Tue";
                  break;
                case 3:
                  day_str = "Wed";
                  break;
                case 4:
                  day_str = "Thu";
                  break;
                case 5:
                  day_str = "Fri";
                  break;
                case 6:
                  day_str = "Sat";
                  break;
                default:
                  break;
              }

              return <p>{day_str},</p>;
            })}
          </div>
          <select
            name="weekdays"
            onChange={(e) => {
              if (
                e.target.value !== "select" &&
                !formValue.days.includes(parseInt(e.target.value))
              ) {
                const new_days = [...formValue.days, parseInt(e.target.value)];
                setFormValue({
                  ...formValue,
                  days: new_days,
                });
              }
            }}
          >
            <option value="select">select</option>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default EventForm;
