import CustomUtil from "../helpers/CustomUtil";
import { FAKE_USERS } from "./fakeUsers";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const EVENTS = [
  {
    id: createEventId(),
    roomKey: "rom1",
    title: "Passed event",
    type: "once",
    description: "first event description here",
    duration: [
      CustomUtil.formatTimelessDate(
        new Date(
          "Thu Sep 16 2021 01:00:00 GMT-0700 (Pacific Daylight Time)"
        ).toDateString(),
        true
      ),
      CustomUtil.formatTimelessDate(
        new Date(
          "Thu Sep 16 2021 01:00:00 GMT-0700 (Pacific Daylight Time)"
        ).toDateString(),
        true
      ),
    ],
    assignees: [{ id: FAKE_USERS[0].id, username: FAKE_USERS[0].username }],
    points: 15,
    completed: false,
    color: "yellow",
  },
  {
    id: createEventId(),
    roomKey: "rom1",
    title: "All-day event",
    type: "once",
    description: "first event description here",
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
    ],
    assignees: [{ id: FAKE_USERS[0].id, username: FAKE_USERS[0].username }],
    points: 30,
    completed: false,
    color: "yellow",
  },
  {
    id: createEventId(),
    roomKey: "rom1",
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
    points: 20,
    completed: false,
    color: null,
  },
  {
    id: createEventId(),
    roomKey: "rom2",
    title: "All-day event",
    type: "once",
    description: "first event description here",
    duration: [
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
      CustomUtil.formatTimelessDate(new Date().toDateString(), true),
    ],
    assignees: [{ id: FAKE_USERS[4].id, username: FAKE_USERS[4].username }],
    points: 30,
    completed: false,
    color: "lightcoral",
  },
  {
    id: createEventId(),
    roomKey: "rom2",
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
    assignees: [{ id: FAKE_USERS[4].id, username: FAKE_USERS[4].username }],
    points: 20,
    completed: false,
    color: "lightblue",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
