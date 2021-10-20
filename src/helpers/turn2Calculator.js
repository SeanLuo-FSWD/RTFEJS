import { TASK_TEMPLATES } from "../fakeDb/task_templates";
import { EVENTS } from "../fakeDb/events";
import getDaysFromToday from "./getDaysFromToday";
import { EVENTS_DRAFT } from "../store/stateless/event_draft";
import CustomUtil from "./CustomUtil";

let tasked_dates_arr = [];
let merged_dates = [];

/* Used to calculate assignee for each task, return an array of dates and assignees for each */
const turn2Calculator = (calDate, up_to_days) => {
  let target_events = _.filter(EVENTS, (task) => {
    const task_date = new Date(task.duration[0]);
    let next_up_to_date = new Date(calDate.getTime());
    next_up_to_date.setDate(calDate.getDate() + up_to_days);
    return (
      task_date.getTime() >= calDate.getTime() &&
      task_date.getTime() <= next_up_to_date.getTime() &&
      task.templateId
    );
  });

  console.log("aaaaaaaaaaaaaaaaaaaaaaaa target_events");
  console.log(target_events);
};

export default turn2Calculator;
