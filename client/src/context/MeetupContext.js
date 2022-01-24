import { createContext, useState } from "react";

export const MeetupContext = createContext();

export const MeetupProvider = ({ children }) => {
  const [context, setContext] = useState({
    singleMeetupId: "61ea80effe705abdc1db26e8",
    singleMeetup: null,
    allMeetups: [],
  });

  function updateContext(updates) {
    setContext((preState) => {
      return {
        ...preState,
        ...updates,
      };
    });
  }
  const value = [context, updateContext];

  return (
    <MeetupContext.Provider value={value}>{children}</MeetupContext.Provider>
  );
};
