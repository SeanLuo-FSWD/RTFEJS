import React from "react";
import Picker from "react-calendar";
import pickDates from "./pickDates";

const monthArr = [];

monthArr.push("select");
for (let i = 1; i <= 31; i++) {
  monthArr.push(i.toString());
}
monthArr.push("month end");

function TypeSpecific({ formValue, onFormChange }) {
  return (
    <div>
      {formValue.type === "once" ? (
        <div style={{ display: "flex" }}>
          <div>
            <p>
              Start date:{" "}
              {formValue.duration[0] ? (
                <span>{formValue.duration[0]}</span>
              ) : (
                <span> ?</span>
              )}
            </p>
            <div className="pick_start">
              <Picker
                defaultActiveStartDate={
                  formValue.duration[0] && new Date(formValue.duration[0])
                }
                onChange={(date) => {
                  let new_duration = pickDates(
                    date,
                    [...formValue.duration],
                    true
                  );

                  new_duration &&
                    onFormChange({ ...formValue, duration: new_duration });
                }}
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
                onChange={(date) => {
                  let new_duration = pickDates(
                    date,
                    [...formValue.duration],
                    false
                  );

                  new_duration &&
                    onFormChange({ ...formValue, duration: new_duration });
                }}
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

                onFormChange({ ...formValue, days: new_days });
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
                onFormChange({
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
    </div>
  );
}

export default TypeSpecific;
