import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
//import tamagotchimodels from "./tamagotchi-models.json";
import generateCard from "./components/Cards/Cards";

function App() {
  return (
    <div className="App">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
        >
          <Typography></Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      {generateCard()}
    </div>
  );
}

export default App;
