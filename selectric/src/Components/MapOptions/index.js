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
import { DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";


export default function MapOptions(props) {

  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;

  const handleGo = props.handleGo;
  


  const [searchBox, setSearchBox] = useState(null);
  const onPlacesChanged = () => {
    let place = searchBox.getPlaces()[0].formatted_address;
    handleChange('from', place)
  }
  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  const [searchBox2, setSearchBox2] = useState(null);
  const onPlacesChanged2 = () => {
    let place2 = searchBox2.getPlaces()[0].formatted_address;
    handleChange('to', place2)
  }
  const onSBLoad2 = ref => {
    setSearchBox2(ref);
  };
  // const onPlacesChanged = () => {
  //   console.log("FROMMMMMMMMMM");
  //   const places = ref.searchBox.getPlaces()
  //   //console.log(StandaloneSearchBox.getPlaces())
  //   //   handleChange('from', event)
  //   // console.log(searchBox.getPlaces())
  //   console.log('places ' + places)
  // }


  // const onPlacesChanged2 = (event) => {
  //   console.log("TOOOOOOOOOOOOOO");
  //   handleChange('to', event)
  // }

  //const onPlacesChanged = () => console.log(searchBox);



  return (
    <div className='options__container'>


      <StandaloneSearchBox
        onPlacesChanged={onPlacesChanged}
        onLoad={onSBLoad}
      >
    {/* onChange={(event) => handleChange('from', event)} */}

        <FormControl sx={{ m: 1 }} variant="outlined" className='options__item-a'>
          <InputLabel htmlFor="outlined-from">from</InputLabel>
          <OutlinedInput
            id="outlined-from"
            //value={values.from}
            //onPlacesChanged={(event) => handleChange('from', event)}
            label="Email"
          ></OutlinedInput>
        </FormControl>
      </StandaloneSearchBox>

      <StandaloneSearchBox
        onPlacesChanged={onPlacesChanged2}
        onLoad={onSBLoad2}
      >
        <FormControl sx={{ m: 1 }} variant="outlined" className='options__item-b'>
          <InputLabel htmlFor="outlined-to">to</InputLabel>
          <OutlinedInput
            id="outlined-to"
            //value={values.to}
            //onChange={handleChange("to")}
            //onPlacesChanged={(event) => handleChange('to', event)}
            label="Email"
          ></OutlinedInput>
        </FormControl>
      </StandaloneSearchBox>














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
        onClick={(event) => handleGo(event)}
      >
        Go
      </Button>

    </div>
  );
}
