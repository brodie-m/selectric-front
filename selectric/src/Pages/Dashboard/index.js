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
const zoom = 10
export default function Dashboard() {
  const [selected, setSelected] = useState(false)
  const [markers, setMarkers] = useState([])

  
  // const handleChange = (prop) => (event) => {
  //   console.log(event, event.target.value)
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  function directionsCallback(response) {
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


  const [endpoints, setEndpoints] = useState({
    from: "",
    to: "",
  });

  const handleChange = (a, event) => {
    //console.log(event)//, event.target.value)
    console.log(event.target.value)
    console.log(a)
    console.log(endpoints)
    setEndpoints({ ...endpoints, [a]: event.target.value });
    console.log(endpoints)
  };


  function handleSubmit(event) {
    console.log(values)
    console.log(event)
    console.log(endpoints)
    setValues({ ...values, origin: endpoints.from, destination: endpoints.to, travelMode: 'DRIVING' })
    console.log(values)
  }

  const [values, setValues] = useState({
    //origin: 'London',
    //destination: 'Edinburgh',
    origin: '',
    destination: '',
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
      if (!values.response) {return}
      const polyline = values.response && values.response.routes[0].overview_polyline
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
          "powerLevel": point.Connections[0].LevelID,
          "connections": point.Connections.map((connection) => {
          

            return {
              connectionType: connection.ConnectionType,
              power: connection.PowerKW,
              statusType: connection.StatusType,
              
            }

          }),
          "usageCost": point.UsageCost,
          "usageType": point.UsageType,
          "operational": point.Connections.filter((connection) => {
            return connection.StatusType.IsOperational
          }).length ? true : false
        }
      })
      setMarkers(markers)
    }
    fetchChargePoints()
    return () => {
        
    };
}, [values.response])
  
  return (
    <>
      <NavBar />
      <div className="maps__container">
        <div className="info__holder">
          <div className="profile__holder anim" style={{animationDelay: '-0.3s'}}>
            <Profile />
          </div>
          <div className="options__holder anim" style={{animationDelay: '-0.2s'}}>
            <MapOptions handleSubmit={handleSubmit} handleChange={handleChange} values={values} setValues={setValues} />
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
              zoom={12}
              options={options}
            >
              
              {/* Child components, such as markers, info windows, etc. */
              markers && markers.map((marker,index) => <Marker 
              key = {index}
              position = {{lat: marker.lat,lng: marker.lng}}
              icon ={{
                url: marker.operational ? `bolt${marker.powerLevel}.svg` : `bad-bolt.svg`,
                scaledSize: new window.google.maps.Size(30,30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(10,10)
              }}
              onClick = {() => {
                console.log(marker)
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
                    <h3>Cost: {selected.usageCost ? selected.usageCost : 'not specified'}</h3>
                    {selected.usageType.IsMembershipRequired ? <h4>Membership required</h4> : ''}
                    {selected.connections.map((connection, index) => (

                      <ul key={index}>
                    <h2>Connection #{index +1}</h2>
                    <li>Power: {connection.power} kW </li>
                    <li>Operational: {connection.statusType.IsOperational ? 'true' : 'false'}</li>
                    <li></li>
                      </ul>
                    
                    ))}
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
                options={{directions: values.response, zoom: zoom}}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
}
