import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useForm from "../hooks/useForm";

import Center from "./Center";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import useStateContext from "../hooks/useStateContext";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const getFreshModel = () => ({
  userName: "user@example.com",
  password: "Iphone@123",
});

export const Login = () => {
  const navigate = useNavigate();
  const { context, setContext, resetContext } = useStateContext();
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  useEffect(() => {
    resetContext();
  });

  const login = (e) => {
    e.preventDefault();
    if (validate())
      createAPIEndpoint(ENDPOINTS.login)
        .post(values)
        .then((res) => {
          setContext({
            token: res.data.token,
            displayUserName: res.data.displayUserName,
            role: res.data.role,
          });
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
  };

  const validate = () => {
    let temp = {};
    temp.userName = /\S+@\S+\.\S+/.test(values.userName)
      ? ""
      : "Email is not valid.";
    temp.password = values.name != "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="userName"
                value={values.userName}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.userName && {
                  error: true,
                  helperText: errors.userName,
                })}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>
            <Typography variant="h9" sx={{ color: grey[1000] }}>
              Not a current user ?
            </Typography>
            <Link to="/register">Click here</Link>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
};
