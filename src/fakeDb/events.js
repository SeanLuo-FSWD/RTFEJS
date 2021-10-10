import CustomUtil from "../helpers/CustomUtil";
import { FAKE_USERS } from "./fakeUsers";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    type: "once",
    description: "first event description here",
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
    ],
    assignees: [
      { id: FAKE_USERS[0].id, username: FAKE_USERS[0].username },
      { id: FAKE_USERS[2].id, username: FAKE_USERS[2].username },
    ],
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
    assignees: [{ id: FAKE_USERS[1].id, username: FAKE_USERS[1].username }],
    points: "",
    completed: false,
    color: null,
  },
];

export function createEventId() {
  return String(eventGuid++);
}
