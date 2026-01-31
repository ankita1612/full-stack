import { circularProgressClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
function ProgressbarEg() {
  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => {
      if (cnt < 100) setCnt((p) => p + 10);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  });
  return (
    <div>
      [{cnt}]<LinearProgress variant="determinate" value={cnt}></LinearProgress>
    </div>
  );
}

export default ProgressbarEg;
