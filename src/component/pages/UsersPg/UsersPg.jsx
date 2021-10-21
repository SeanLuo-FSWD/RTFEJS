import React from "react";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";
import Navbar from "../../Navbar/Navbar";

function UsersPg() {
  console.log("FAKE_USERS FAKE_USERS UsersPg ");
  console.log(FAKE_USERS);
  return (
    <div>
      <Navbar />
      <h2>All users</h2>

      {FAKE_USERS.map((u) => {
        return (
          <div>
            <p>Username: {u.username}</p>
            <p>Points: {u.points}</p>
            <p>AssignedPoints: {u.assignedPoints}</p>

            <p>
              Completion percentage:{" "}
              {u.assignedPoints ? u.points / u.assignedPoints : "n/a"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default UsersPg;
