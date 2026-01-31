import { Paper, Typography,Stack } from "@mui/material";

function PaperEg() {
  return (
    <>
    <Stack direction="row" spacing={2}>
      <Paper elevation={3} sx={{ p: 2, width:"300px", height:"100px" }} >
        <Typography>This is inside Paper</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, width:"400px", height:"100px" }} >
        <Typography>This is another paper</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, width:"400px", height:"100px" }} >
        <Typography>This is another paper</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, width:"400px", height:"100px" }} >
        <Typography>This is another paper</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, width:"400px", height:"100px" }} >
        <Typography>This is another paperThis is another paper This is another paper This is another paper</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, width:"400px", height:"100px" }} >
        <Typography>This is another paper This is another paper This is another paper</Typography>
      </Paper>
      </Stack>
    </>
  );
}
export default PaperEg;
