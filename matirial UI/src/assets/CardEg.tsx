import React from "react";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";

function CardEg() {
  return (
    <Box width="300px">
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="download.jpg"
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            this is first text
          </Typography>
          <Typography variant="h4" component="span">
            this is secinf text
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">send</Button>
          <Button size="small">Ok</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
export default CardEg;
