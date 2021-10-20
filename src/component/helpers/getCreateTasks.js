import { EVENTS, createEventId } from "../../fakeDb/events";
import { TASK_TEMPLATES } from "../../fakeDb/task_templates";
import _ from "lodash";
import CustomUtil from "../../helpers/CustomUtil";
// import turnCalculator from "../../helpers/turnCalculator";
import { EVENTS_DRAFT } from "../../store/stateless/event_draft";

/*
    Adding reoccuring tasks to EVENTS here.
  */
const getCreateTasks = (calDate) => {
  const day_tasks = _.filter(EVENTS, (task) => {
    const task_date = new Date(task.duration[0]);
    return task_date.getTime() == calDate.getTime();
  });

  const day_templateIds = day_tasks.map((task) => {
    return task.templateId;
  });

  /* This loop parses the template to get all events for that date,
  then calls turnCalculator to take the events, and assign users to it */
  TASK_TEMPLATES.forEach((task) => {
    task.days.forEach((day) => {
      let unified_day = day;
      let cell_day;

      if (task.type === "monthly") {
        cell_day = calDate.getDate();
        if (day === "month end") {
          unified_day = CustomUtil.getMonthLastDate(calDate);
        }
      } else {
        /* weekly task */
        cell_day = calDate.getDay();
      }

      /*
          Add new reoccuring task on calendar month change, must match conditions:
          1. "cell_day == unified_day" : Day of cell equal day specified on the task, whether weekly or monthly.
          2. "!day_templateIds.includes(task.id)" : Must not be already created previously. 
          3. "calDate >= new Date()" : Must be today or a future date.
        */
      if (
        cell_day == unified_day &&
        !day_templateIds.includes(task.id) &&
        calDate.getTime() >= new Date(task.beginDate).getTime()
      ) {
        let one_day_duration = getDuration(calDate);

        let obj_submit = {
          id: createEventId(),
          templateId: task.id,
          title: task.title,
          type: task.type,
          description: task.description,
          duration: [one_day_duration, one_day_duration],
          assignees: task.assignees,
          points: task.points,
          completed: false,
          color: task.color,
        };

        EVENTS.push(obj_submit);
        /* Since we did not calculate the assignee for that task, we don't push to EVENTS yet, but push to a "shadow-EVENTs" obj called EVENTS_DRAFT
         */

        // EVENTS_DRAFT.push(obj_submit);
      }
    });
    // if (EVENTS_DRAFT.length != 0) {
    //   /* Once we are done with all events for that that task for that calendar day, we calculate the assignee */
    //   turnCalculator(task.id, calDate);
    // }
  });
};

let getDuration = function (calDate) {
  let to_return = CustomUtil.formatTimelessDate(calDate.toDateString(), true);
  return to_return;
};

export default getCreateTasks;
