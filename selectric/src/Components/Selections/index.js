import {
  Avatar,
  FormControl,
  FormGroup,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  TextField,
  Button,
  CardMedia,
} from "@mui/material";
import { storage } from "../../firebase";
import React, { useLayoutEffect, useState } from "react";
import "./selections.css";
export default function Selections() {
  const [values, setValues] = useState({
    profile_image: "",
    name: "",
    carObject: {},
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, profile_image: e.target.value });
    setImage(e.target.files[0]);
  };

  const handleCarChange = (e) => {
    const brandName = e.target.innerText.split(" ")[0] + " ";

    const modelName = e.target.innerText.split(`${brandName}`)[1] + " ";
    const carToFind = carData.filter((car) => car.Brand == brandName);
    const carFilter = carToFind.filter((car) => car.Model == modelName);
    console.log(carToFind);
    console.log(carFilter);
    carFilter[0]._id = "";
    console.log(carFilter);
    setValues({ ...values, carObject: carFilter[0] });
    console.log(values.carObject);
  };

  const handleFileUpload = () => {
    console.log("clicked");
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () =>
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImageUrl(url);
          })
    );
  };

  const [carData, setCarData] = useState([]);
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchCarData() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      };
      const result = await fetch(
        `https://selectric.herokuapp.com/cars`,
        options
      );

      const data = await result.json();
      setCarData(data);
    }
    fetchCarData();
    return () => {};
  }, []);

  const [userData, setUserData] = useState(null);
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    async function fetchUserData() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      };
      const result = await fetch(
        `https://selectric.herokuapp.com/user`,
        options
      );

      const data = await result.json();
      setUserData(data);
    }
    fetchUserData();
    return () => {};
  }, []);

  console.log(carData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("submit in progress");
    console.log(values);
    const options = {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        updates: [
          { name: "username", value: values.name },
          { name: "profile_image", value: values.profile_image },
          {
            name: "cars",
            value: {
              brand: values.carObject.Brand,
              model: values.carObject.Model,
              plugType: values.carObject.PlugType,
            },
          },
        ],
      }),
    };
    console.log(options);
    const result = await fetch(`https://selectric.herokuapp.com/user`, options);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <div className="profile__holder">
            <FormControl sx={{ m: 1, width: "auto" }} variant="outlined">
              {imageUrl ? (
                <CardMedia
                  component="img"
                  height="150"
                  width="150"
                  src={imageUrl}
                  alt="user image"
                />
              ) : (
                <Avatar
                  alt="profile picture"
                  sx={{ height: "150px", width: "150px" }}
                />
              )}

              <input type="file" onChange={handleFileChange} />
              <Button
                sx={{
                  m: 1,
                  p: 1,
                  "&:hover": {
                    background: "transparent",
                  },
                }}
                variant="contained"
                component="label"
                onClick={handleFileUpload}
              >
                Upload
              </Button>
            </FormControl>
            <div className="names__holder">
              <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
                <InputLabel htmlFor="outlined-username">Username</InputLabel>
                <OutlinedInput
                  id="outlined-username"
                  value={values.username}
                  onChange={handleChange("name")}
                  label="Username"
                ></OutlinedInput>
              </FormControl>
              <Autocomplete
                disablePortal
                name="cars"
                id="combo-box-demo"
                options={carData.map((car) => {
                  return `${car.Brand}${car.Model}`;
                })}
                sx={{ m: 1, width: "90%" }}
                value={values.cartype}
                onChange={handleCarChange}
                isOptionEqualToValue={(option, value) => option.code === value}
                renderInput={(params) => (
                  <TextField {...params} label="Car Type" />
                )}
              />
            </div>
            <Button
              className="selections__submit"
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
            >
              Submit
            </Button>
          </div>
        </FormGroup>
      </form>
    </>
  );
}
