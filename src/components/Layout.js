import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";
import { ENDPOINTS, createAPIEndpoint } from "../api";

const Layout = () => {
  const { resetContext, context } = useStateContext();
  const navigate = useNavigate();
  const logOut = () => {
    createAPIEndpoint(ENDPOINTS.signOut)
      .fetch()
      .then((res) => {
        if (res.data.success) {
          resetContext();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: 640, m: "auto" }}>
          <Typography variant="h8" align="left" sx={{ flexGrow: 1 }}>
            Welcome : {context.displayUserName}
          </Typography>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Quiz
          </Typography>
          <Button sx={{ color: "white" }} onClick={logOut}>
            Logout
          </Button>
          {context.role == "Admin" ? (
            <Button sx={{ color: "white" }}>Admin</Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
