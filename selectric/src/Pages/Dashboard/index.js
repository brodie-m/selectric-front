import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Container } from "@mui/material";
import NavBar from "../../Components/NavBar";
import "./dashboard.css";
import Profile from "../../Components/Profile";
import MapOptions from "../../Components/MapOptions";
import mapStyles from "./mapStyles";
import Directions from "../../Components/Directions";
require("dotenv").config();

export default function Dashboard() {
  const containerStyle = {
    width: "40vw",
    height: "40vw",
  };

  const center = {
    lat: 51.5012,
    lng: -0.1354,
  };

  const options = {
    styles: mapStyles,
  };

  return (
    <>
      <NavBar />
      <div className="maps__container">
        <div className="info__holder">
          <div className="profile__holder">
            <Profile />
          </div>
          <div className="options__holder">
            <MapOptions />
          </div>
          <div className="directions__holder">
            <Directions />
          </div>
        </div>
        <div className="maps__holder">
          <LoadScript googleMapsApiKey="AIzaSyAXOBirCcvhAEK4R_6pCHv8J3mhICNlm34">
            <GoogleMap
              id="dashboard-map"
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              options={options}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
}
