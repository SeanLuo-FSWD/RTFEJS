import { EVENTS } from "../fakeDb/events";
import getDaysFromDate from "./getDaysFromDate";
import { EVENTS_DRAFT } from "../store/stateless/event_draft";
import CustomUtil from "./CustomUtil";
import { TASK_TEMPLATES } from "../fakeDb/task_templates";
import _ from "lodash";

/* Used to calculate assignee for each task, return an array of dates and assignees for each */
const turn2Calculator = (calDate, up_to_days) => {
  // let target_tasks = _.filter(EVENTS, (task) => {
  //   const task_date = new Date(task.duration[0]);
  //   let next_up_to_date = new Date(calDate.getTime());
  //   next_up_to_date.setDate(calDate.getDate() + up_to_days);
  //   return (
  //     task_date.getTime() >= calDate.getTime() &&
  //     task_date.getTime() <= next_up_to_date.getTime() &&
  //     task.templateId &&
  //     !task.assignees
  //   );
  // });

  for (let i = 0; i < EVENTS.length; i++) {
    const task_date = new Date(EVENTS[i].duration[0]);
    let next_up_to_date = new Date(calDate.getTime());
    next_up_to_date.setDate(calDate.getDate() + up_to_days);
    if (
      task_date.getTime() >= calDate.getTime() &&
      task_date.getTime() <= next_up_to_date.getTime() &&
      EVENTS[i].templateId &&
      !EVENTS[i].assignees
    ) {
      EVENTS[i].assignees = [insertAssignee(EVENTS[i])];
      console.log("999999999999999999999 EVENTS[i]");
      console.log(EVENTS[i]);
    }
  }

  // target_tasks.forEach((each) => {
  //   each = {
  //     ...each,
  //     assignees: insertAssignee(each),
  //   };
  // });

  // Grab the events in question
};

const insertAssignee = (task) => {
  console.log("55555555555555555");
  console.log(task);
  const template = TASK_TEMPLATES.find((t) => {
    return t.id === task.templateId;
  });
  const assignees = template.assignees;

  let tasked_dates_arr = [];
  let merged_dates = [];

  const firstDate = new Date(template.beginDate);
  const targetDate = new Date(task.duration[0]);
  console.log("666666666666666666");
  console.log(firstDate);
  console.log(targetDate);

  const days_diff = dateDiffInDays(
    // date of the first event.
    firstDate,
    targetDate
  );

  let all_dates_arr = getDaysFromDate(days_diff, firstDate);
  console.log("all_dates_arr");
  console.log(all_dates_arr);
  /* all dates with the said template from beginning */
  tasked_dates_arr = all_dates_arr.filter((calDate) => {
    return getTaskedDates(calDate, template);
  });

  console.log("777777777777777777777");
  console.log(tasked_dates_arr);
  /* looping thru each assignee, and start from beginning once loop ended */
  let i = 0;
  tasked_dates_arr.forEach((date_str) => {
    merged_dates.push(
      // date: new Date(date_str),
      assignees[i]
    );

    if (i === assignees.length - 1) {
      i = 0;
    } else {
      i++;
    }
  });
  console.log("88888888888888888888");
  console.log(merged_dates);

  return merged_dates[merged_dates.length - 1];
};

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
}

const getTaskedDates = (calDate, template) => {
  let have_task_date;

  for (let i = 0; i < template.days.length; i++) {
    let unified_day = template.days[i];
    let cell_day;
    if (template.type === "monthly") {
      cell_day = calDate.getDate();
      if (template.days[i] === "month end") {
        unified_day = CustomUtil.getMonthLastDate(calDate);
      }
    } else {
      /* weekly task */
      cell_day = calDate.getDay();
    }
    if (cell_day == unified_day) {
      have_task_date = CustomUtil.formatTimelessDate(
        calDate.toDateString(),
        true
      );
      break;
    }
  }

  if (have_task_date) {
    return have_task_date;
  }
  return;
};

export default turn2Calculator;
