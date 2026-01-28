import React from "react";
import { Grid, Box } from "@mui/material";

function GridEg() {
  return (
    <>
      <Grid
        my={1}
        container
        sx={{ border: "1px solid red" }}
        spacing={1}
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid size={{ xs: 2, sm: 2, md: 2 }} sx={{ border: "1px solid red" }}>
          <Box bgcolor="primary.light" p={2}>
            1 number
          </Box>
        </Grid>
        <Grid size={{ xs: "auto", sm: 1, md: "auto" }}>
          <Box bgcolor="primary.light" p={2}>
            ankita modi
          </Box>
        </Grid>
        <Grid size={{ xs: 2, sm: 1, md: 2 }}>
          <Box bgcolor="primary.light" p={2}>
            10000 + 10000
          </Box>
        </Grid>
        <Grid size={{ xs: 2, sm: 1, md: 2 }}>
          <Box bgcolor="primary.light" p={2}>
            cricket cricket cricket cricket cricket
          </Box>
        </Grid>
        <Grid size={{ xs: 2, sm: 1, md: 2 }}>
          <Box bgcolor="primary.light" p={2}>
            activeactive activeactive activeactiveactive
          </Box>
        </Grid>
        <Grid size={{ xs: 2, sm: 1, md: 2 }}>
          <Box bgcolor="primary.light" p={2}>
            test test test test test testtest
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default GridEg;
