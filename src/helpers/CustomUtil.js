class CustomUtil {
  static getMonthLastDate(calDate) {
    const month = calDate.getMonth();
    let calDate_str = calDate.toDateString();
    let dayPDT = new Date(
      calDate_str + " 01:00:00 GMT-0700 (Pacific Daylight Time)"
    );
    const lastDay = new Date(2008, month + 1, 0).getDate();
    // dayPDT.setDate(lastDay);
    // console.log("zzzzzzzzzzzzzzzzzzzzzzz");
    // console.log(dayPDT);
    // return dayPDT;
    return lastDay;
  }

  static isDigitConvertible(value) {
    return /^\d+$/.test(value);
  }

  static formatTimelessDate(
    day, //calDate.toDateString()
    typeString = false,
    offset = {
      offsetType: null,
      amount: 0,
    }
  ) {
    let dayPDT = new Date(day + " 01:00:00 GMT-0700 (Pacific Daylight Time)");
    let year = dayPDT.getFullYear();
    let month = dayPDT.getMonth();
    let date = dayPDT.getDate();

    if (offset.offsetType) {
      switch (offset.offsetType) {
        case "year":
          year = year + offset.amount;
          break;
        case "month":
          month = month + offset.amount;
          break;
        case "day":
          date = date + offset.amount;
          break;
        default:
          break;
      }
    }

    // let formatDay: any =
    //   new Date(year, month, date, 0, 0, 0).toISOString().replace(/T.*$/, "") +
    //   " 00:00:00 GMT-0700 (Pacific Daylight Time)";

    let formatDay = new Date(year, month, date, 0, 0, 0);

    if (typeString) {
      formatDay = formatDay.toDateString();
    }

    return formatDay;
  }
}

export default CustomUtil;
