import CustomUtil from "./CustomUtil";

const getDaysFromToday = (days, startDate = new Date()) => {
  let days_arr = [];

  for (let i = 0; i < days; i++) {
    days_arr.push(
      CustomUtil.formatTimelessDate(startDate.toDateString(), false, {
        offsetType: "day",
        amount: i,
      })
    );
  }

  return days_arr;
};

export default getDaysFromToday;
