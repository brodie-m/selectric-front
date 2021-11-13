import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Container } from "@mui/material";
import NavBar from "../../Components/NavBar";
import "./dashboard.css";
import Profile from "../../Components/Profile";
require("dotenv").config();

export default function Dashboard() {
  const containerStyle = {
    width: "55vw",
    height: "55vw",
  };

  const center = {
    lat: 51.5012,
    lng: -0.1354,
  };
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <div className="info__holder">
          <div className="profile__holder">
              <Profile/>
          </div>
          <div className="options__holder">hello options</div>
          <div className="directions__holder">hello directions</div>
        </div>
        <div className="maps__holder">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
      </Container>
    </>
  );
}
