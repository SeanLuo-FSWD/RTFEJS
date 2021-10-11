import { TASK_TEMPLATES } from "../fakeDb/task_templates";
import { EVENTS } from "../fakeDb/events";
import getDaysFromToday from "./getDaysFromToday";

let tasked_dates_arr = [];

const turnCalculator = (templateId, date) => {
  const first_event = EVENTS.find((event) => event.templateId === templateId);
  const assignees = first_event.assignees;
  const first_date = first_event.duration[0];
  const first_assignee = first_event.assignees[0];
  const days_diff = dateDiffInDays(first_date, date);
  const all_dates_arr = getDaysFromToday(days_diff, date);

  all_dates_arr.map((calDate) => {
    getTaskedDates(calDate, templateId);
  });

  tasked_dates_arr;
};

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/* mirros getCreateTasks */
const getTaskedDates = (calDate, templateId) => {
  const template = TASK_TEMPLATES.find(
    (template) => template.id === templateId
  );

  template.days.forEach((day) => {
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
    if (cell_day == unified_day) {
      tasked_dates_arr.push(
        CustomUtil.formatTimelessDate(calDate.toDateString(), true)
      );
    }
  });
};
