"use client";
import { createContext, useState } from "react";

export const UserContext = createContext();

const CurrentUserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default CurrentUserContext;


