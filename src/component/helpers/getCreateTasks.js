import { EVENTS, createEventId } from "../../fakeDb/events";
import { TASK_TEMPLATES } from "../../fakeDb/task_templates";
import _ from "lodash";
import CustomUtil from "../../helpers/CustomUtil";

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
        calDate >= new Date()
      ) {
        let submit_obj = {
          id: createEventId(),
          templateId: task.id,
          title: task.title,
          type: task.type,
          description: task.description,
          duration: [
            CustomUtil.formatTimelessDate(calDate.toDateString(), true),
            CustomUtil.formatTimelessDate(calDate.toDateString(), true),
          ],
          // to update below
          assignees: task.assignees,
          points: task.points,
          completed: false,
          color: task.color,
        };

        EVENTS.push(submit_obj);
      }
    });
  });
};

export default getCreateTasks;
