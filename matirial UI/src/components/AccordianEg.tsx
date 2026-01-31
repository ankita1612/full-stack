import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordianEg() {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>What is MUI?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>MUI is a popular React UI component library.</Typography>
        </AccordionDetails>
      </Accordion>

      {["Question 1", "Question 2"].map((q, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Answer content here.</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
