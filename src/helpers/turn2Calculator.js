import { TASK_TEMPLATES } from "../fakeDb/task_templates";
import { EVENTS } from "../fakeDb/events";
import getDaysFromToday from "./getDaysFromToday";
import { EVENTS_DRAFT } from "../store/stateless/event_draft";
import CustomUtil from "./CustomUtil";

let tasked_dates_arr = [];
let merged_dates = [];

/* Used to calculate assignee for each task, return an array of dates and assignees for each */
const turn2Calculator = (templateId, calDate) => {
  /* date is the cell_date we wish to display */
  tasked_dates_arr = [];
  merged_dates = [];

  const template = TASK_TEMPLATES.find((template) => {
    return template.id === templateId;
  });

  const first_date = EVENTS_DRAFT[0].duration[0];

  let next_60_days = new Date(calDate.getTime());
  next_60_days.setDate(calDate.getDate() + 60);
  const days_diff = dateDiffInDays(
    new Date(first_date),
    new Date(next_60_days)
  );
  const all_dates_arr = getDaysFromToday(days_diff, calDate);

  const assignees = template.assignees;

  /* Get all dates with the task in questions for the calendar duration*/
  tasked_dates_arr = all_dates_arr.filter((calDate) => {
    return getTaskedDates(calDate, template);
  });

  /* looping thru each assignee, and start from beginning once loop ended */
  let i = 0;
  tasked_dates_arr.forEach((date_str) => {
    merged_dates.push({
      date: new Date(date_str),
      assignee: [assignees[i]],
    });

    if (i === assignees.length - 1) {
      i = 0;
    } else {
      i++;
    }
  });

  console.log("merged_dates: ");
  console.log(merged_dates);
  /* Pushes into the EVENT obj with proper assignee */
  //   EVENTS_DRAFT.forEach((e_obj) => {
  //     if (!e_obj.assignees) {
  //       merged_dates.forEach((da_obj) => {
  //         // don't they always equal?
  //         if (da_obj.date.getTime() === new Date(e_obj.duration[0]).getTime()) {
  //           const obj_to_submit = { ...e_obj, assignees: da_obj.assignee };
  //           /* We finally push to the EVENTS obj, after getting the correct assignee */
  //           EVENTS.push(obj_to_submit);
  //         }
  //       });
  //     }
  //   });

  //   for (let i = 0; i < merged_dates.length; i++) {
  //     console.log("111111 merged_dates[i].date");
  //     console.log(merged_dates[i].date);
  //     EVENTS_DRAFT.forEach((e_obj) => {
  //       /* matching all tasked dates to the looped task date, should have one match at least */

  //       console.log("2222222 e_obj.duration[0]");
  //       console.log(e_obj.duration[0]);
  //       if (
  //         merged_dates[i].date.getTime() === new Date(e_obj.duration[0]).getTime()
  //       ) {
  //         console.log("33333333 merged_dates[i].assignee : ");
  //         console.log(merged_dates[i].assignee);
  //         const obj_to_submit = { ...e_obj, assignees: merged_dates[i].assignee };

  //         EVENTS.push(obj_to_submit);
  //       }
  //     });
  //   }

  EVENTS_DRAFT.forEach((e_obj) => {
    console.log("11111 e_obj.duration[0]");
    console.log(e_obj.duration[0]);
    console.log("EVENTS_DRAFT");
    console.log(EVENTS_DRAFT);
    // for (let i = 0; i < merged_dates.length; i++) {
    //         console.log("22222 merged_dates[i].date");
    //         console.log(merged_dates[i].date);

    //     if (
    //     merged_dates[i].date.getTime() ===
    //     new Date(e_obj.duration[0]).getTime()
    //     ) {
    //     console.log("33333333 merged_dates[i].assignee : ");
    //     console.log(merged_dates[i].assignee);
    //     const obj_to_submit = {
    //         ...e_obj,
    //         assignees: merged_dates[i].assignee,
    //     };

    //         EVENTS.push(obj_to_submit);
    //         break;
    //     }
    // }
  });

  /* reset EVENTS_DRAFT to 0 to be used again 
  Each event draft if for 1 template, 1 day */
  //   EVENTS_DRAFT.length = 0;
};

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/* mirrors getCreateTasks */
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

  // template.days.forEach((day) => {
  //   let unified_day = day;
  //   let cell_day;
  //   if (template.type === "monthly") {
  //     cell_day = calDate.getDate();
  //     if (day === "month end") {
  //       unified_day = CustomUtil.getMonthLastDate(calDate);
  //     }
  //   } else {
  //     /* weekly task */
  //     cell_day = calDate.getDay();
  //   }
  //   if (cell_day == unified_day) {
  //     // tasked_dates_arr.push(
  //     //   CustomUtil.formatTimelessDate(calDate.toDateString(), true)
  //     // );

  //     const have_task_date = CustomUtil.formatTimelessDate(
  //       calDate.toDateString(),
  //       true
  //     );

  //       array_to_return.push(have_task_date);
  //   }
  // });

  // return
};

export default turn2Calculator;
