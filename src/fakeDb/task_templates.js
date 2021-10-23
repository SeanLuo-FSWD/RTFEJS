import CustomUtil from "../helpers/CustomUtil";
import { FAKE_USERS } from "./fakeUsers";
let eventGuid = 0;

export const TASK_TEMPLATES = [
  {
    id: createTemplateId(),
    title: "Monthly reoccuring",
    type: "monthly",
    description: "Monthly event description here",
    days: [15, "month end"],
    assignees: [
      { id: FAKE_USERS[0].id, username: FAKE_USERS[0].username },
      { id: FAKE_USERS[2].id, username: FAKE_USERS[2].username },
    ],
    beginDate: CustomUtil.formatTimelessDate(new Date().toDateString()),
    points: 20,
    color: "lightgreen",
    roomKey: "rom1",
  },
  {
    id: createTemplateId(),
    title: "Weely reoccuring",
    type: "weekly",
    description: "Weely event description here",
    days: [6],
    assignees: [{ id: FAKE_USERS[0].id, username: FAKE_USERS[0].username }],
    beginDate: CustomUtil.formatTimelessDate(
      new Date(
        "Thu Sep 16 2021 01:00:00 GMT-0700 (Pacific Daylight Time)"
      ).toDateString()
    ),
    points: 12,
    color: "lightcoral",
    roomKey: "rom1",
  },
  {
    id: createTemplateId(),
    title: "Weely reoccuring",
    type: "weekly",
    description: "Weely event description here",
    days: [6],
    assignees: [{ id: FAKE_USERS[4].id, username: FAKE_USERS[4].username }],
    beginDate: CustomUtil.formatTimelessDate(
      new Date(
        "Thu Sep 16 2021 01:00:00 GMT-0700 (Pacific Daylight Time)"
      ).toDateString()
    ),
    points: 12,
    color: "lightcoral",
    roomKey: "rom2",
  },
];

export function createTemplateId() {
  return String(eventGuid++);
}
