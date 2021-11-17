import React from "react";
import Feature from "../Feature";
import "./about.css";
export default function About() {
  return (
    <div className="selectric__about section__margin anim" id="about">
      <div className="selectric__about-heading">
        <h1 className="gradient__text" style={{marginBottom: '10px'}}>learn more about selectric</h1>
        <div className="selectric__about-feature">
          <Feature title="Meet our team" avatars={true}
            />
        </div>
      </div>
      <div className="selectric__about-container">
      
        <Feature
          title="Purpose"
          text="Selectric is here to ease your transition into a more eco conscious, electrically powered automotive world."
        />
        <Feature
          title="How Does It Work?"
          text="Selectric uses data from Open Charge Maps, along with Google maps, directions, and places APIs to display routes through charging points worldwide using your car specification. However, it doesn't stop there! Selectric suggests activities to do in the local area whilst your car is charging,  based on your preferences."
        />
      </div>
    </div>
  );
}
