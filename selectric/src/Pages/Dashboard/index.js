import React, { useLayoutEffect } from "react";
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
  useLayoutEffect(() => {
    const titles = document.querySelectorAll('.anim')
    const observer =new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate')
            }
            else {entry.target.classList.remove('animate')}
        })
    })
    titles.forEach(title=> {
        observer.observe(title)
    })
    return () => {
        
    };
}, [])

  return (
    <>
      <NavBar />
      <div className="maps__container">
        <div className="info__holder">
          <div className="profile__holder anim" style={{animationDelay: '-0.3s'}}>
            <Profile />
          </div>
          <div className="options__holder anim" style={{animationDelay: '-0.2s'}}>
            <MapOptions />
          </div>
          <div className="directions__holder anim"  style={{animationDelay: '-0.1s'}}>
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
