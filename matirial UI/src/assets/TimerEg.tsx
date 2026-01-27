import Button from "@mui/material/Button";
import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function TimerEg() {
  const [cntr, setCntr] = useState<number>(0);
  const prevRef = useRef<number>(0);
  const startTimer = () => {
    if (prevRef.current != 0) return false;

    prevRef.current = setInterval(() => setCntr((p) => p + 1), 1000);
  };
  const stopTimer = () => {
    clearInterval(prevRef.current);
    prevRef.current = 0;
  };
  const ResetTimer = () => {
    stopTimer();
    setCntr(0);
  };
  useEffect(() => {
    return () => stopTimer(); // cleanup on unmount
  }, []);
  return (
    <>
      <Stack>{cntr}</Stack>
      <Stack direction="row">
        <Button variant="contained" onClick={() => startTimer()}>
          Start
        </Button>
        <Button variant="contained" onClick={() => stopTimer()}>
          Stop
        </Button>
        <Button variant="contained" onClick={() => ResetTimer()}>
          Reset
        </Button>
      </Stack>
    </>
  );
}

export default TimerEg;
