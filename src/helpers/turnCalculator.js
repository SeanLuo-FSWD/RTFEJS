// import { TASK_TEMPLATES } from "../fakeDb/task_templates";
// import { EVENTS } from "../fakeDb/events";
// import getDaysFromToday from "./getDaysFromToday";
// import { EVENTS_DRAFT } from "../store/stateless/event_draft";
// import CustomUtil from "./CustomUtil";

// let tasked_dates_arr = [];
// let merged_dates = [];

// /* Used to calculate assignee for each task, return an array of dates and assignees for each */
// const turnCalculator = (templateId, calDate) => {
//   // date is the cell_date we wish to display
//   tasked_dates_arr = [];
//   merged_dates = [];

//   const template = TASK_TEMPLATES.find((template) => {
//     return template.id === templateId;
//   });

//   console.log("EVENTS_DRAFT______2222222222222222");
//   console.log(EVENTS_DRAFT);
//   const first_date = EVENTS_DRAFT[0].duration[0];

//   let next_60_days = new Date(calDate.getTime());
//   next_60_days.setDate(calDate.getDate() + 60);

//   console.log("xxxxxxxxxxxxxxxxxxxxxx");
//   console.log(calDate);
//   console.log(next_60_days);
//   const days_diff = dateDiffInDays(
//     new Date(first_date),
//     new Date(next_60_days)
//   );
//   const all_dates_arr = getDaysFromToday(days_diff, calDate);

//   const assignees = template.assignees;

//   tasked_dates_arr = all_dates_arr.filter((calDate) => {
//     return getTaskedDates(calDate, template);
//   });

//   // tasked_dates_arr = all_dates_arr.map((calDate) => {
//   //   getTaskedDates(calDate, template);
//   // });
//   console.log("777777777777777777777");
//   console.log(tasked_dates_arr);

//   let i = 0; // for assignees
//   tasked_dates_arr.forEach((date_str) => {
//     console.log("55555555555555555");
//     console.log(date_str);
//     // while (new Date(date_str).getTime() <= date.getTime()) {}
//     merged_dates.push({
//       date: new Date(date_str),
//       assignee: [assignees[i]],
//     });

//     if (i === assignees.length - 1) {
//       i = 0;
//     } else {
//       i++;
//     }
//   });

//   console.log("zzzzzzzzzzzzzzzzzzzzzzz");
//   console.log(merged_dates);
//   console.log(EVENTS_DRAFT);
//   /* Pushes into the EVENT obj with proper assignee */
//   EVENTS_DRAFT.forEach((e_obj) => {
//     if (!e_obj.assignees) {
//       merged_dates.forEach((da_obj) => {
//         if (da_obj.date.getTime() === new Date(e_obj.duration[0]).getTime()) {
//           const obj_to_submit = { ...e_obj, assignees: da_obj.assignee };
//           // e_obj.assignees = da_obj.assignee;

//           console.log("fffffffffffffffffffffff");
//           console.log(obj_to_submit);
//           /* We finally push to the EVENTS obj, after getting the correct assignee */
//           EVENTS.push(obj_to_submit);
//         }
//       });
//     }
//   });

//   console.log("999999999999999999999");
//   console.log("expected to call after CustomUtil : EVENTS_DRAFT.length = 0");
//   EVENTS_DRAFT.length = 0;
// };

// function dateDiffInDays(a, b) {
//   const _MS_PER_DAY = 1000 * 60 * 60 * 24;

//   console.log("3333333333333333");
//   console.log(a);
//   console.log(b);
//   const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
//   const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

//   return Math.floor((utc2 - utc1) / _MS_PER_DAY);
// }

// /* mirros getCreateTasks */
// const getTaskedDates = (calDate, template) => {
//   let have_task_date;

//   for (let i = 0; i < template.days.length; i++) {
//     let unified_day = template.days[i];
//     let cell_day;
//     if (template.type === "monthly") {
//       cell_day = calDate.getDate();
//       if (template.days[i] === "month end") {
//         unified_day = CustomUtil.getMonthLastDate(calDate);
//       }
//     } else {
//       /* weekly task */
//       cell_day = calDate.getDay();
//     }
//     if (cell_day == unified_day) {
//       // tasked_dates_arr.push(
//       //   CustomUtil.formatTimelessDate(calDate.toDateString(), true)
//       // );

//       have_task_date = CustomUtil.formatTimelessDate(
//         calDate.toDateString(),
//         true
//       );
//       break;
//     }
//   }

//   if (have_task_date) {
//     console.log("666666666666666666");
//     console.log(have_task_date);

//     return have_task_date;
//   }

//   // template.days.forEach((day) => {
//   //   let unified_day = day;
//   //   let cell_day;
//   //   if (template.type === "monthly") {
//   //     cell_day = calDate.getDate();
//   //     if (day === "month end") {
//   //       unified_day = CustomUtil.getMonthLastDate(calDate);
//   //     }
//   //   } else {
//   //     /* weekly task */
//   //     cell_day = calDate.getDay();
//   //   }
//   //   if (cell_day == unified_day) {
//   //     // tasked_dates_arr.push(
//   //     //   CustomUtil.formatTimelessDate(calDate.toDateString(), true)
//   //     // );

//   //     const have_task_date = CustomUtil.formatTimelessDate(
//   //       calDate.toDateString(),
//   //       true
//   //     );

//   //       array_to_return.push(have_task_date);
//   //   }
//   // });

//   // return
// };

// export default turnCalculator;
