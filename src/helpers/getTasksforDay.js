import _ from "lodash";
import CustomUtil from "./CustomUtil";

const getTasksforDay = (calDate, item, ele) => {
  let startDate;
  let endDate;
  startDate = new Date(ele.duration[0]);
  endDate = new Date(ele.duration[1]);

  if (calDate >= startDate && calDate <= endDate) {
    return item;
  }
};

export default getTasksforDay;
