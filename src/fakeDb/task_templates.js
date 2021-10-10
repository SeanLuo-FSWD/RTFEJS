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
    points: 20,
    color: "lightgreen",
  },
  //   {
  //     id: createTemplateId(),
  //     title: "Weely reoccuring",
  //     type: "weekly",
  //     description: "Weely event description here",
  //     days: [6],
  //     assignees: [{ id: FAKE_USERS[0].id, username: FAKE_USERS[0].username }],
  //     points: 10,
  //     color: "lightcoral",
  //   },
];

export function createTemplateId() {
  return String(eventGuid++);
}
