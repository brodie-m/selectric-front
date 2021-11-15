
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, LoadScript, Marker, useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";

import { Container } from "@mui/material";
import NavBar from "../../Components/NavBar";
import "./dashboard.css";
import Profile from "../../Components/Profile";
import MapOptions from "../../Components/MapOptions";
import mapStyles from "./mapStyles";
import Directions from "../../Components/Directions";


require("dotenv").config();
const zoom = 10
const libraries=['places']
export default function Dashboard() {
  const mapRef = useRef()
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map
      setService(new window.google.maps.places.PlacesService(mapRef.current))
    },
    [],
  )
  

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyCFTum7OQMJw2xx0luble3U25N-QcRQg1g",
    libraries
  })
  const [service, setService] = useState(null)
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
    console.log('handle change ttiggerd')
    console.log(event)
  //  console.log(event.target.value)
    console.log('this is a ' + a)
    console.log( endpoints)
    setEndpoints({ ...endpoints, [a]: event });
    console.log(endpoints)
  };


  function handleSubmit(event) {
    console.log(values)
    console.log(event)
    console.log(endpoints)
    setValues({ ...values, origin: endpoints.from, destination: endpoints.to, travelMode: 'DRIVING' })
    console.log(values)
  }

  const [places, setPlaces] = useState(null)

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

  const infoWindowOptions = {
    styles: mapStyles
  }

  
  
  useLayoutEffect(() => {

    const titles = document.querySelectorAll('.anim')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
        else { entry.target.classList.remove('animate') }
      })
    })
    titles.forEach(title => {
      observer.observe(title)
    })
    async function fetchChargePoints() {
      if (!values.response) {return}
      const polyline = values.response && values.response.routes[0].overview_polyline
      const distance = 1
      const maxResults = 40

      //const result = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&maxresults=100?key=0c36b6d2-3cf6-4f4d-9bf9-fc72140229ab`)
      const result = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&distance=${distance}&polyline=${polyline}&maxresults=${maxResults}&key=AIzaSyCMnp0NR1KzbU5BYQP_MY8CIhBa9CigoGE`)
      const data = await result.json()
      console.log(data)
      data.forEach(point => console.log(point.UsageType))
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
      setPlaces(null)
    }
    fetchChargePoints()
    return () => {

    };

  }, [values.response])


  let searchBox

  const onLoad = ref => {
    searchBox = ref
  }
  const onPlacesChanged = () => {
    console.log("Place changed");
  
  }



 return ( isLoaded? 

    <>
      <NavBar />
      <LoadScript googleMapsApiKey="AIzaSyAkT9l74nNgW3KmQ6nmiLJ1V0h4SuCE5AQ" libraries={["places"]} >
        <div className="maps__container">
          <div className="info__holder">
            <div className="profile__holder anim" style={{ animationDelay: '-0.3s' }}>
              <Profile />
            </div>
            <div className="options__holder anim" style={{ animationDelay: '-0.2s' }}>
              <MapOptions handleSubmit={handleSubmit} handleChange={handleChange} values={values} setValues={setValues} />
            </div>
            <div className="directions__holder anim" style={{ animationDelay: '-0.1s' }}>
              <Directions />
            </div>
          </div>

        </div>
        <div className="maps__holder">
          

            <GoogleMap
              id="dashboard-map"
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              options={options}
              onLoad={onMapLoad}
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
              onClick = { async () => {
                console.log(marker)
                setSelected(marker)
                
                let request = {
                  location: new window.google.maps.LatLng(marker.lat,marker.lng),
                  radius: 1604,
                }
                service.nearbySearch(request, (results, status) => {
                  
                  if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                    setPlaces(results.map((place)=> {return {
                        ...place, lat: place.geometry.location.lat(), lng:place.geometry.location.lng()
                    }}));
                  }
                  console.log(places)
                });
              }}
              
              
              />)
              
              } 
              {places ? places.map((place,index) => <Marker 
              className = "places__marker"
              key = {place.id}
              position = {{lat: place.lat,lng: place.lng}}
              icon ={{
                backgroundColor: place.icon_background_color,
                url: place.icon,
                scaledSize: new window.google.maps.Size(30,30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(10,10)
              }}
              options={{
                styles: {backgroundColor: place.icon_background_color}
              }}
              />
              )
              
              
              
              
              
              : <h1>NO PLACES</h1>}

              {
                selected && 
                <div className = 'maps__infoWindow'>
                <InfoWindow 
                
                position ={{lat: selected.lat, lng: selected.lng}}
                onCloseClick={() => setSelected(null)}

                >
                  <div>
                    <h1 className = 'gradient__text'>{selected.name}</h1>
                    <h4>Cost: {selected.usageCost ? selected.usageCost : 'not specified'}</h4>
                    <h4>Payment info: {selected.usageType.Title}</h4>
                    {selected.usageType.IsMembershipRequired ? <h4>Membership required</h4> : ''}
                    <br/>
                    {selected.connections.map((connection, index) => (

                      <ul key={index}>
                    <h3>Connection #{index +1}</h3>
                    <li>Power: {connection.power} kW </li>
                    <li>Operational: {connection.statusType.IsOperational ? 'true' : 'false'}</li>
                    <li></li>
                      </ul>
                    
                    ))}
                  </div>

                </InfoWindow></div>}
              
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

          

        </div>
      </LoadScript>
    </>
  : 'loading');
}
