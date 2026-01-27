import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
function UsestateWithArr() {
  const [idArr, setIdArr] = useState<number[]>([]);
  const addElement = () => {
    setIdArr((i) => [...i, Math.random()]);
  };
  const removeElement = (n: number) => {
    const new_arr = idArr.filter((i) => {
      return !(i == n);
    });
    setIdArr(new_arr);
  };
  return (
    <>
      <Stack spacing={1}>
        {idArr.map((i) => (
          <Stack
            key={i}
            direction="row"
            alignItems="center"
            sx={{
              border: "1px solid #ddd",
              px: 1,
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                flex: 1, // take remaining space
                minWidth: 0, // IMPORTANT for ellipsis
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {i}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              onClick={() => removeElement(i)}
            >
              X
            </Button>
          </Stack>
        ))}
      </Stack>

      <Button variant="contained" onClick={() => addElement()}>
        Add random number
      </Button>
    </>
  );
}

export default UsestateWithArr;
