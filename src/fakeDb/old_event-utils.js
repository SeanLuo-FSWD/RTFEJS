import CustomUtil from "../helpers/CustomUtil";
import { FAKE_USERS } from "./fakeUsers";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    type: "once",
    description: "first event description here",
    // duration: [
    //   new Date().toISOString().replace(/T.*$/, "") +
    //     " 00:00:00 GMT-0700 (Pacific Daylight Time)",
    //   new Date().toISOString().replace(/T.*$/, "") +
    //     " 00:00:00 GMT-0700 (Pacific Daylight Time)",
    // ],
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
    ],
    days: [],
    assignee: { id: FAKE_USERS[0].id, username: FAKE_USERS[0].username },
    points: 30,
    completed: true,
    color: "yellow",
  },
  {
    id: createEventId(),
    title: "three days event",
    type: "once",
    description: "first event description here",
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true, {
        offsetType: "day",
        amount: 2,
      }),
    ],
    days: [],
    assignee: { id: FAKE_USERS[1].id, username: FAKE_USERS[1].username },
    points: "",
    completed: false,
    color: null,
  },
  {
    id: createEventId(),
    title: "Monthly reoccuring",
    type: "monthly",
    description: "Monthly event description here",
    days: [15, "month end"],
    assignee: { id: FAKE_USERS[2].id, username: FAKE_USERS[2].username },
    points: 20,
    completed: true,
    color: "lightgreen",
  },
  {
    id: createEventId(),
    title: "Weely reoccuring",
    type: "weekly",
    description: "Weely event description here",
    days: [6],
    assignee: { id: FAKE_USERS[0].id, username: FAKE_USERS[0].username },
    points: 10,
    completed: false,
    color: "lightcoral",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
