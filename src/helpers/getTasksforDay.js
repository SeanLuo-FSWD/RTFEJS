import _ from "lodash";
import CustomUtil from "./CustomUtil";

const getTasksforDay = (calDate, item, ele, roomKey) => {
  let startDate;
  let endDate;
  startDate = new Date(ele.duration[0]).getTime();
  endDate = new Date(ele.duration[1]).getTime();

  if (
    calDate.getTime() >= startDate &&
    calDate.getTime() <= endDate &&
    roomKey === ele.roomKey
  ) {
    return item;
  }
};

export default getTasksforDay;
