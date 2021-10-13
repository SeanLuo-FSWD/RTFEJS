import { EVENTS, createEventId } from "../../fakeDb/events";
import { TASK_TEMPLATES } from "../../fakeDb/task_templates";
import _ from "lodash";
import CustomUtil from "../../helpers/CustomUtil";
import turnCalculator from "../../helpers/turnCalculator";
import { EVENTS_DRAFT } from "../../store/stateless/event_draft";

// console.log("ddddddddddddddddddddddd");
// console.log("ddddddddddddddddddddddd");
// console.log("ddddddddddddddddddddddd");
// EVENTS_DRAFT.push({ name: "bob" });
// console.log(EVENTS_DRAFT);
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
        // calDate >= new Date()
        calDate.getTime() >= new Date(task.beginDate).getTime()
      ) {
        // const assignee = _.filter(EVENTS_DRAFT, (da) => {
        //   return da.date.getTime() === calDate.getTime();
        // });
        let one_day_duration = getDuration(calDate);

        console.log();
        let obj_submit = {
          id: createEventId(),
          templateId: task.id,
          title: task.title,
          type: task.type,
          description: task.description,
          // duration: [
          //   CustomUtil.formatTimelessDate(calDate.toDateString(), true),
          //   CustomUtil.formatTimelessDate(calDate.toDateString(), true),
          // ],
          duration: [new Date(), new Date()],
          assignees: false,
          points: task.points,
          completed: false,
          color: task.color,
        };

        // EVENTS.push(obj_submit);
        /* Since we did not calculate the assignee for that task, we don't push to EVENTS yet, but push to a "shadow-EVENTs" obj called EVENTS_DRAFT */

        EVENTS_DRAFT.push({
          howmanykeys: "random string",
        });

        let EVENTS_DRAFT_LOCAL = ["EVENTS_DRAFT_LOCAL"];
        EVENTS_DRAFT_LOCAL.push({
          howmanykeys: "random string",
        });
        // EVENTS_DRAFT.push(
        //   "a string"
        // );

        console.log("EVENTS_DRAFT_LOCAL:");
        console.log(EVENTS_DRAFT_LOCAL);

        console.log("");

        console.log("EVENTS_DRAFT:");
        console.log(EVENTS_DRAFT);

        console.log("");
        console.log("xxxxxxxxxxxxxxxxxxxxxx");
      }
    });
    // if (EVENTS_DRAFT.length != 0) {
    //   console.log("???????????  whyt this called?");
    //   console.log(EVENTS_DRAFT.length);
    //   console.log(EVENTS_DRAFT);

    //   /* Once we are done with all events for that that task for that calendar day, we calculate the assignee */
    //   // turnCalculator(task.id, calDate);
    // }
  });
};

let getDuration = function (calDate) {
  let to_return = CustomUtil.formatTimelessDate(calDate.toDateString(), true);

  return to_return;
};

export default getCreateTasks;
