import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardMedia,
  Chip,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { BASE_URL } from "../api";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { red, green, grey } from "@mui/material/colors";

const Answer = ({ qnAnswers }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const markCorrectOrNot = (qna, idx) => {
    if ([qna.answer, qna.selected].includes(idx)) {
      return { sx: { color: qna.answer == idx ? green[500] : red[500] } };
    }
  };

  const changeColour = (answer, optIdx) => {
    if (optIdx === answer.correctAnswer) {
      return { sx: { color: green[500] } };
    }
    if (!answer.isCorrectSelected) {
      if (optIdx === answer.selectedAnswer) {
        return { sx: { color: red[500] } };
      }
    }
  };

  return (
    <Box sx={{ mt: 5, width: "100%", maxWidth: 640, mx: "auto" }}>
      {qnAnswers.map((answer, idx) => (
        <Accordion
          disableGutters
          key={idx}
          expanded={expanded === idx}
          onChange={handleChange(idx)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{
                  color: answer.isCorrectSelected ? green[500] : red[500],
                }}
              />
            }
          >
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              {answer.qnInWord}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: grey[900] }}>
            <List>
              {answer.options.map((option, opidx) => (
                <ListItem key={opidx}>
                  <Typography {...changeColour(answer, opidx)}>
                    <b>{String.fromCharCode(65 + opidx) + ". "}</b>
                    {option}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Answer;
