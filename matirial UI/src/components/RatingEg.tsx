import { Rating } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
export default function RatingEg() {
  const [value, setValue] = useState<number | null>(null);
  const [pvalue, setPvalue] = useState<number | null>(2);

  return (
    <>
      <Box>
        highlightSelectedOnly property {value}:
        <Rating
          name="customer_rating"
          precision={0.5}
          size="small"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          highlightSelectedOnly
        />
      </Box>
      <Box>
        <Rating
          name="product_rating"
          precision={0.5}
          size="small"
          value={pvalue}
          onChange={(event, newValue) => {
            setPvalue(newValue);
          }}
          icon={<BookmarkIcon fontSize="inherit" color="error" />}
          emptyIcon={<BookmarkBorder />}
        />
      </Box>
      <Box>
        Read only :
        <Rating
          name="product_rating"
          precision={0.5}
          size="small"
          value={3}
          readOnly
        />
      </Box>
    </>
  );
}
