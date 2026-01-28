import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai"];

export default function AutoCompleteEg() {
  const [value, setValue] = useState<string | null>(null);
  const [pvalue, setPvalue] = useState<number | null>(null);

  type City = { id: number; name: string };

  const cities_eg2: City[] = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Mumbai" },
    { id: 3, name: "Maharastra" },
  ];
  const handleNew = (_event: React.SyntheticEvent, n: City | null) => {
    if (n) {
      console.log(n.id);
      setPvalue(n.id);
    }
  };
  return (
    <>
      {pvalue}
      Single selection
      <Autocomplete
        options={cities}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
      Object
      <Autocomplete
        options={cities_eg2}
        getOptionLabel={(option) => option.name}
        onChange={(e, newValue) => handleNew(e, newValue)}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
      Multiselect
      <Autocomplete
        multiple
        options={cities}
        onChange={(e, value) => console.log(value)}
        renderInput={(params) => <TextField {...params} label="Cities" />}
      />
      Multiselect 2
      <Autocomplete
        multiple
        options={cities_eg2}
        getOptionLabel={(option) => option.name}
        onChange={(e, newValue) => console.log(newValue)}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
    </>
  );
}
