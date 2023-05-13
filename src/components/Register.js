import React, { useEffect, useState } from "react";
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
import { green, grey } from "@mui/material/colors";
import { toast } from "react-toastify";

const getFrshModel = () => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const Register = () => {
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFrshModel);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();

    if (validate()) {
      setLoader(true);
      createAPIEndpoint(ENDPOINTS.createRegister)
        .post(values)
        .then((res) => {
          setLoader(false);
          toast.success(res?.data?.messages[0], { position: "top-right" });
          navigate("/");
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err?.response?.data?.messages[0], {
            position: "top-right",
          });
        });
    }
  };

  const validate = () => {
    let temp = {};
    temp.firstName = values.firstName != "" ? "" : "This field is required.";
    temp.lastName = values.lastName != "" ? "" : "This field is required.";
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.password = values.password != "" ? "" : "This field is required.";
    temp.confirmPassword =
      values.confirmPassword != values.password
        ? "Confirm password does not match"
        : "";

    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 3 }}>
            Register
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={registerUser}>
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                value={values.firstName}
                onChange={handleInputChange}
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                value={values.lastName}
                onChange={handleInputChange}
                {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
              />
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                value={values.email}
                onChange={handleInputChange}
                {...(errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                type="password"
                value={values.confirmPassword}
                onChange={handleInputChange}
                {...(errors.confirmPassword && {
                  error: true,
                  helperText: errors.confirmPassword,
                })}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
                disabled={loader ? true : false}
              >
                {loader ? "Submitting..." : "Submit"}
              </Button>
            </form>
            <Typography variant="h9" sx={{ color: grey[1000] }}>
              Already a user ?
            </Typography>
            <Link to="/">
              <Typography variant="h9" sx={{ color: green[1000] }}>
                Click Here
              </Typography>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
};

export default Register;
