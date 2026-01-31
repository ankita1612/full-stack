import {
  Checkbox,
  FormControlLabel,
  Box,
  FormLabel,
  FormGroup,
  FormControl,
} from "@mui/material";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";

export default function MuiCheckbox() {
  const [checked, setChecked] = useState(false);
  const hobbiesList = ["Cricket", "Football", "Tennis"];
  const [hobbies, setHobbies] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    console.log(e.target.checked);
  };
  console.log(hobbies);
  const handleHobbyChange = (
    hobby: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      setHobbies((prev) => [...prev, hobby]);
    } else {
      setHobbies((prev) => prev.filter((h) => h !== hobby));
    }
    console.log(e.target.checked);
  };
  return (
    <>
      <Box>
        <FormLabel>Accept</FormLabel>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="Accept Terms"
        />
      </Box>

      {hobbies}
      <Box>
        <FormControl>
          <FormLabel>Hobbies</FormLabel>
          <FormGroup>
            {hobbiesList.map((hobby) => (
              <FormControlLabel
                key={hobby}
                control={
                  <Checkbox
                    value={hobby}
                    checked={hobbies.includes(hobby)}
                    onChange={(e) => handleHobbyChange(hobby, e)}
                  />
                }
                label={hobby}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Box>
        <Checkbox
          icon={<BookmarkBorder />}
          checkedIcon={<BookmarkIcon />}
          onChange={handleChange}
        />
      </Box>
    </>
  );
}
