import React, { useState, useContext } from "react";
import { globalContext } from "../../../store/context/globalContext";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";

function CommunityPg() {
  const { currentUser, setCurrentUser } = useContext(globalContext);

  const [KeyValue, setKeyValue] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          for (let i = 0; i < FAKE_USERS.length; i++) {
            const user = FAKE_USERS[i];
            console.log("KeyValue: " + KeyValue);
            console.log(
              user.id + " user.id === currentUser.id " + currentUser.id
            );
            if (user.id === currentUser.id) {
              user.roomKey = KeyValue;
              setCurrentUser({ ...currentUser, roomKey: KeyValue });
              break;
            }
          }
        }}
      >
        <input
          name="title"
          placeholder="title"
          type="text"
          onChange={(e) => {
            setKeyValue(e.target.value);
          }}
        />
        <button>Join room</button>
      </form>

      <button>Create room</button>
    </div>
  );
}

export default CommunityPg;
