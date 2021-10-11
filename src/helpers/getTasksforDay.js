import _ from "lodash";
import CustomUtil from "./CustomUtil";

const getTasksforDay = (calDate, item, ele) => {
  let startDate;
  let endDate;
  startDate = new Date(ele.duration[0]).getTime();
  endDate = new Date(ele.duration[1]).getTime();

  if (calDate.getTime() >= startDate && calDate.getTime() <= endDate) {
    return item;
  }
};

export default getTasksforDay;
