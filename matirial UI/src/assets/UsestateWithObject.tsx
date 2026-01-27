import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
function UsestateWithObject() {
  console.log("rerender");
  type userObj = {
    name: string;
    age: number;
  };
  const [form, setForm] = useState({ name: "", age: "" });

  const [user, setUser] = useState<userObj[]>([]);
  const addElement = () => {
    if (!form.name || !form.age) return;
    setUser((p) => [...p, { name: form.name, age: Number(form.age) }]);
    setForm({ name: "", age: "" });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name + "===" + value);
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const removeElement = (data: userObj) => {
    const new_data = user.filter((i) => {
      return !(i.name == data.name && i.age == data.age);
    });
    setUser(new_data);
  };
  return (
    <>
      <Stack sx={{ border: "1px solid black" }} alignItems="center">
        <Stack direction="row" sx={{ my: 2 }}>
          <TextField
            name="name"
            label="Enter value"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            name="age"
            value={form.age}
            label="Enter age"
            variant="outlined"
            onChange={handleChange}
          />
        </Stack>
        <Stack>
          <Button variant="contained" onClick={() => addElement()}>
            Add random number
          </Button>
        </Stack>
        <Stack>
          {user?.map((i) => (
            <Stack key={i.name} direction="row" spacing={2} alignItems="center">
              <Typography variant="body1">
                {i.name} = {i.age}
              </Typography>
              <Button variant="contained" onClick={() => removeElement(i)}>
                X
              </Button>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default UsestateWithObject;
