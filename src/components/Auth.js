import React from "react";
import useStateContext from "../hooks/useStateContext";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const { context } = useStateContext();
  return context.token == "" ? <Navigate to="/" /> : <Outlet />;
};

export default Auth;
