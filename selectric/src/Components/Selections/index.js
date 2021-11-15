import { Avatar, FormControl, FormGroup, InputLabel, OutlinedInput, Autocomplete, TextField, Button } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import './selections.css'
export default function Selections() {
    const [values, setValues] = useState({
    avatar: "",
    username: "",
    cartype: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  const [carData, setCarData] = useState([])
  useLayoutEffect(()=> {
  const token = localStorage.getItem('token')
  async function fetchCarData() {
      const options = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':token
          }
      }
      const result = await fetch(`https://selectric.herokuapp.com/cars`, options)
      
      const data = await result.json()
      setCarData(data)
    }
    fetchCarData()
    return () => {
        
    };
}, [])

const [userData, setUserData] = useState(null)
useLayoutEffect(()=> {
    const token = localStorage.getItem('token')
    console.log(token)
    async function fetchUserData() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token
            }
        }
        const result = await fetch(`https://selectric.herokuapp.com/user`, options)
        
        const data = await result.json()
        setUserData(data)
        
    
      }
      fetchUserData()
      return () => {
          
      };
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit in progress')
    console.log(values)
    const options = {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          ...values
      }),
    }
};

return (
        <>
        <form onSubmit={handleSubmit}>
        <FormGroup>
        <div className='profile__holder'>
            <Avatar alt='profile picture' sx={{height: '150px',width:'150px'}}/>
            <div className='names__holder'>
                <FormControl sx={{ m: 1, width: 'auto' }} variant="outlined">
                <InputLabel htmlFor="outlined-username">Username</InputLabel>
                <OutlinedInput
                    id="outlined-username"
                    value={values.username}
                    onChange={handleChange("username")}
                    label="Username"
                    > 
                </OutlinedInput>
                </FormControl>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={carData.map(car => {
                        return `${car.Brand}${car.Model}`
                    })}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Car Type" />}
                    />
            </div> 
            <Button sx={{ m: 1, px: 4, py: 1, color: 'white', backgroundColor: '#ff4820', '&:hover': {
              backgroundColor: '#ff4820'
          } }} variant='contained' type='submit'>Submit</Button>
        </div>
        </FormGroup>
        </form>
        </>
    )
}