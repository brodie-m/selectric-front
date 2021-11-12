import React, { useState } from 'react'
import {
    Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
export default function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        showPassword: false,
      });
    
      const [goodLogin, setGoodLogin] = useState(false)
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleSubmit = async (e) => {
          e.preventDefault();
          console.log('submit in progress')
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values
            }),
          };
          
          const result = await fetch('http://127.0.0.1:5000/register',options)
          if (result.status !== 201) {
              setGoodLogin(false);
              return;
          }
          const data = await result.json()
          localStorage.setItem('token',data.token)
          window.location.href='./dashboard'
    
      }
    return (
        <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-name">Name</InputLabel>
          <OutlinedInput
            id="outlined-name"
            value={values.username}
            onChange={handleChange("username")}
            label="Name"
          ></OutlinedInput>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-email"
            value={values.email}
            onChange={handleChange("email")}
            label="Email"
          ></OutlinedInput>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant='contained' type='submit'>Submit</Button>
      </FormGroup>
      </form>
    )
}
