import React, { useEffect, useLayoutEffect, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { Container } from "@mui/material";
import NavBar from "../../Components/NavBar";
import "./dashboard.css";
import Profile from "../../Components/Profile";
import MapOptions from "../../Components/MapOptions";
import mapStyles from "./mapStyles";
import Directions from "../../Components/Directions";
require("dotenv").config();

export default function Dashboard() {
  const [selected, setSelected] = useState(false)
  const [markers, setMarkers] = useState([])
  const handleChange = (prop) => (event) => {
    console.log(event, event.target.value)
    setValues({ ...values, [prop]: event.target.value });
  };

  function directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        setValues(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  const [values, setValues] = useState({
    origin: 'London',
    destination: 'Edinburgh',
    travelMode: 'DRIVING',
    response: null,
  })

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
    disableDefaultUI: true,
    zoomControl: true
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
    async function fetchChargePoints() {

      const polyline = values.response.routes[0].overview_polyline
      const distance= 1
      const maxResults = 40

      //const result = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&maxresults=100?key=0c36b6d2-3cf6-4f4d-9bf9-fc72140229ab`)
      const result = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&distance=${distance}&polyline=${polyline}&maxresults=${maxResults}&key=0c36b6d2-3cf6-4f4d-9bf9-fc72140229ab`)
      const data = await result.json()
      console.log(data)
      const markers = data.map(point => {
        return {
          "name": point.AddressInfo.Title,
          "lat": point.AddressInfo.Latitude,
          "lng": point.AddressInfo.Longitude,
          "powerLevel": point.Connections[0].LevelID
        }
      })
      setMarkers(markers)
    }
    fetchChargePoints()
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
            <MapOptions handleChange={handleChange}/>
          </div>
          <div className="directions__holder anim"  style={{animationDelay: '-0.1s'}}>
            <Directions />
          </div>
        </div>
        <div className="maps__holder">
          <LoadScript googleMapsApiKey="AIzaSyCMnp0NR1KzbU5BYQP_MY8CIhBa9CigoGE">
            <GoogleMap
              id="dashboard-map"
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              options={options}
            >
              
              {/* Child components, such as markers, info windows, etc. */
              markers && markers.map((marker,index) => <Marker 
              key = {index}
              position = {{lat: marker.lat,lng: marker.lng}}
              icon ={{
                url: `bolt${marker.powerLevel}.svg`,
                scaledSize: new window.google.maps.Size(30,30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(10,10)
              }}
              onClick = {() => {
                setSelected(marker)
              }}
              />)
              
              } {
                selected &&
                <InfoWindow 
                position ={{lat: selected.lat, lng: selected.lng}}
                onCloseClick={() => setSelected(null)}
                >
                  <div>
                    <h2>{selected.name}</h2>
                    <p>Power level: {selected.powerLevel}</p>
                  </div>
                </InfoWindow>}
              
              <DirectionsService 
                options={{
                  destination: values.destination,
                  origin: values.origin,
                  travelMode: values.travelMode
                }}
                callback={directionsCallback}

              />
              <DirectionsRenderer 
                options={{directions: values.response}}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
}
