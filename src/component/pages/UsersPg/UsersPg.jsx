import React, { useContext } from "react";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";
import Navbar from "../../Navbar/Navbar";
import { globalContext } from "../../../store/context/globalContext";

function UsersPg() {
  console.log("FAKE_USERS FAKE_USERS UsersPg ");
  console.log(FAKE_USERS);
  const { currentUser } = useContext(globalContext);

  return (
    <div>
      <Navbar />
      <h2>All users</h2>

      {FAKE_USERS.filter((ele) => {
        if (ele.roomKey === currentUser.roomKey) {
          return true;
        }
      }).map((u) => {
        return (
          <div>
            <p>Username: {u.username}</p>
            <p>Points: {u.points}</p>
            <p>AssignedPoints: {u.assignedPoints}</p>

            <p>
              Completion percentage:{" "}
              {u.assignedPoints ? u.points / u.assignedPoints : "n/a"}
            </p>
            <p>---------</p>
          </div>
        );
      })}
    </div>
  );
}

export default UsersPg;
