import {
  Avatar,
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import React, { useState } from "react";
import './options.css'
export default function MapOptions(props) {

  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  
  return (
    <div className='options__container'>

      <FormControl sx={{ m: 1 }} variant="outlined" className='options__item-a'>
        <InputLabel htmlFor="outlined-from">from</InputLabel>
        <OutlinedInput
          id="outlined-from"
          //value={values.from}
          onChange={(event) => handleChange('from', event)}
          label="Email"
        ></OutlinedInput>

      </FormControl>

      <FormControl sx={{ m: 1 }} variant="outlined" className='options__item-b'>
        <InputLabel htmlFor="outlined-to">to</InputLabel>
        <OutlinedInput
          id="outlined-to"
          //value={values.to}
          //onChange={handleChange("to")}
          onChange={(event) => handleChange('to', event)}
          label="Email"
        ></OutlinedInput>
      </FormControl>

      <Avatar className='options__item-c'>
        <PendingIcon />
      </Avatar>

      <Button className='options__item-d'
        sx={{
          m: 1,
          px: 4,
          py: 1,
          color: "white",

          backgroundColor: "#ff4820",
          "&:hover": {
            backgroundColor: "#ff4820",
          },
        }}
        variant="contained"
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Go
      </Button>

    </div>
  );
}
