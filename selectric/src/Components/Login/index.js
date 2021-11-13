import React, { useState } from 'react'
import {
    Button,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import './Login.css'
export default function Login() {
    const [values, setValues] = useState({
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
          console.log(values)
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values
            }),
          };
          
          const result = await fetch("https://selectric.herokuapp.com/login",options)
          if (result.status !== 200) {
              setGoodLogin(false);
              return;
          }
          const data = await result.json()
          localStorage.setItem('token',data.token)
          setGoodLogin(true)
          window.location.href='./dashboard'
          
    
      }
    return (
        <form onSubmit={handleSubmit}>
      <FormGroup>
        <h2 className ='gradient__text login__text-title' style={{fontWeight: 800}}>welcome back!</h2>
        <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
          <InputLabel htmlFor="outlined-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-email"
            value={values.email}
            onChange={handleChange("email")}
            label="Email"
          ></OutlinedInput>
        </FormControl>
        <FormControl sx={{ m: 1, width: "auto" }} variant="outlined">
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
        <Button sx={{ m: 1, px: 4, py: 1, color: 'white', backgroundColor: '#ff4820', '&:hover': {
              backgroundColor: '#ff4820'
          } }} variant='contained' type='submit'>Submit</Button>
      </FormGroup>
      </form>
    )
}
