import React from "react";
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

const getFreshModel = () => ({
  userName: "",
  password: "",
});

export const Login = () => {
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const login = (e) => {
    e.preventDefault();
    if (validate())
      createAPIEndpoint(ENDPOINTS.login)
        .post(values)
        .then((res) => console.log(res))
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
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
};
