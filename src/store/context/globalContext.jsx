import { createContext, useState } from "react";

export const globalContext = createContext({});

export default function GlobalContext(props) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <globalContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </globalContext.Provider>
  );
}
