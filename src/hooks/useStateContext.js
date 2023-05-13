import { linearProgressClasses } from "@mui/material";
import React, { createContext, useContext, useState, useEffect } from "react";

export const stateContext = createContext();

const getFreshContext = () => {
  if (sessionStorage.getItem("context") === null)
    sessionStorage.setItem(
      "context",
      JSON.stringify({
        token: "",
        role: "",
        displayUserName: "",
        timeTaken: 0,
        selectedOptions: [],
      })
    );
  return JSON.parse(sessionStorage.getItem("context"));
};

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
    resetContext: () => {
      sessionStorage.removeItem("context");
      setContext(getFreshContext());
    },
  };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());

  useEffect(() => {
    sessionStorage.setItem("context", JSON.stringify(context));
  }, [context]);

  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  );
}
