import React, { useContext } from "react";

import { FAKE_USERS } from "../../fakeDb/fakeUsers";
import _ from "lodash";
import styles from "./UserTransfer.module.scss";
import { globalContext } from "../../store/context/globalContext";

function UserTransfer({ formValue, onFormChange }) {
  const { currentUser } = useContext(globalContext);

  /*
    https://stackoverflow.com/questions/32965688/comparing-two-arrays-of-objects-and-exclude-the-elements-who-match-values-into
    */
  let users_to_display = FAKE_USERS.filter(
    (o1) => !formValue.shared.assignees.some((o2) => o1.id === o2.id)
  ).filter((ele) => {
    if (ele.roomKey === currentUser.roomKey) {
      return true;
    }
  });

  console.log("2222222222222222_users_to_display");
  console.log(users_to_display);

  return (
    <div>
      <label htmlFor="select_assignee">Assignee</label>
      <div className="flex">
        <div className={`${styles.border}`}>
          <h3>Available</h3>
          {users_to_display.map((u) => {
            return (
              <p
                onClick={(e) => {
                  console.log(e.target.id);

                  const full_user = _.filter(users_to_display, (u) => {
                    return u.id === parseInt(e.target.id);
                  });

                  const assignee = {
                    id: full_user[0].id,
                    username: full_user[0].username,
                  };

                  const new_assignees = [
                    ...formValue.shared.assignees,
                    assignee,
                  ];

                  onFormChange({
                    ...formValue,
                    shared: {
                      ...formValue.shared,
                      assignees: new_assignees,
                    },
                  });
                }}
                id={u.id}
              >
                {u.username}
              </p>
            );
          })}
        </div>
        <div className={`${styles.border}`}>
          <h3>Chosen</h3>

          {formValue.shared.assignees.map((u) => {
            return (
              <p
                onClick={(e) => {
                  const updated_arr = _.filter(
                    formValue.shared.assignees,
                    (u) => {
                      return u.id !== parseInt(e.target.id);
                    }
                  );

                  onFormChange({
                    ...formValue,
                    shared: {
                      ...formValue.shared,
                      assignees: updated_arr,
                    },
                  });
                }}
                id={u.id}
              >
                {u.username}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserTransfer;
