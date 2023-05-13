import React, { useEffect, useState } from "react";
import { AuthCreateEndPoint, ENDPOINTS, createAPIEndpoint } from "../api";
import useStateContext from "../hooks/useStateContext";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { green } from "@mui/material/colors";
import Answer from "./Answer";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { toast } from "react-toastify";

const getFreashModel = () => ({
  score: 0,
  timeTaken: "",
});

const Result = () => {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [ansList, setAnsList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreashModel);

  useEffect(() => {
    AuthCreateEndPoint(ENDPOINTS.getResult, context.token)
      .post(context.selectedOptions)
      .then((res) => {
        setScore(res.data.correctAnswers);
        //console.log(res.data.answerResults);
        setAnsList(res.data.answerResults);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const submitScore = () => {
    setLoader(true);
    AuthCreateEndPoint(ENDPOINTS.userScore, context.token)
      .post({
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        if (res?.data?.success) {
          setLoader(false);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
          toast.success(res?.data?.messages[0], { position: "top-right" });
        } else {
          setLoader(false);
          toast.error(res?.data?.messages[0], { position: "top-right" });
        }
      })
      .catch((err) => {
        console.log("erre", err.response);
        setLoader(false);
        toast.error(err.response, { position: "top-right" });
      });
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>

            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
              disabled={loader ? true : false}
            >
              {loader ? "Submitting..." : "Submit"}
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Submitted.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={ansList} />
    </>
  );
};

export default Result;
