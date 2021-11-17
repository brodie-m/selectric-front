import React from "react";
import Feature from "../Feature";
import "./about.css";
export default function About() {
  return (
    <div className="selectric__about section__margin anim" id="about">
      <div className="selectric__about-heading">
        <h1 className="gradient__text">learn more about selectric</h1>
        <div className="selectric__about-feature">
          <Feature title="Meet our team" avatars={true} />
        </div>
      </div>
      <div className="selectric__about-container">
      
        <Feature
          title="purpose"
          text="electric cars are here to stay. without them, we are doomed. we wanted a light-weight and user-friendly"
        />
        <Feature
          title="how does it work"
          text="selectric uses data from openchargemap, as well a sgoogle maps, directions, and places APIs to display routes through charging points worldwide"
        />
      </div>
    </div>
  );
}
