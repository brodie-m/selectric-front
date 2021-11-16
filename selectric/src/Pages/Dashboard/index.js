


import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, InfoWindow, LoadScript, Marker, useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";


import { Container } from "@mui/material";
import NavBar from "../../Components/NavBar";
import "./dashboard.css";
import Profile from "../../Components/Profile";
import MapOptions from "../../Components/MapOptions";
import mapStyles from "./mapStyles";
import Directions from "../../Components/Directions";
import { letterSpacing } from "@mui/system";


require("dotenv").config();


const libraries = ["places"];
export default function Dashboard() {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCMnp0NR1KzbU5BYQP_MY8CIhBa9CigoGE",
    libraries,
  });
  const [service, setService] = useState(null)
  const [selected, setSelected] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [connections, setConnections] = useState([]);

  const mapRef = useRef()




  const [userData, setUserData] = useState(null)
  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    async function fetchUserData() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      }
      const result = await fetch(`https://selectric.herokuapp.com/user`, options)

      const data = await result.json()
      setUserData(data)


    }
    fetchUserData()
    return () => {

    };
  }, [])


  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map
      setService(new window.google.maps.places.PlacesService(mapRef.current))
    },
    [],
  )
  const [zoom, setZoom] = useState(10)
  const [center, setCenter] = useState({
    lat: 51.5012,
    lng: -0.1354,
  })
  

  // const handleChange = (prop) => (event) => {
  //   console.log(event, event.target.value)
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  function directionsCallback(response) {

    if (response !== null) {
      if (response.status === "OK") {
        setValues(() => ({
          response,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  }



  const [endpoints, setEndpoints] = useState({
    from: "",
    to: "",
  });

  const [waypoints, setWaypoints] = useState([])

  const handleChange = (a, event) => {

    setEndpoints({ ...endpoints, [a]: event });
    

  };

  function handleGo() {
    setWaypoints([])
    setValues({
      ...values,
      origin: endpoints.from,
      destination: endpoints.to,
      travelMode: "DRIVING",
    });
  }

  function handleSubmit(event) {

    setValues({
      ...values,
      origin: endpoints.from,
      destination: endpoints.to,
      waypoints: waypoints,
      travelMode: "DRIVING",
    });
    
  }


  const handleSelect = (selected) => {
    const selectedArray = [...connections];
    selectedArray.push(selected);

    
    setConnections(selectedArray);
    setWaypoints(selectedArray.map((connection) => {
      return {
        location: new window.google.maps.LatLng(connection.lat, connection.lng),
      }
    }))
    handleSubmit()
  }



  // const waypoints = connections.map((connection) => {
  //   return {
  //     location: new window.google.maps.LatLng(connection.lat, connection.lng),
  //   };
  // });

  const [places, setPlaces] = useState(null)


  const [values, setValues] = useState({
    //origin: 'London',
    //destination: 'Edinburgh',
    origin: "",
    destination: "",
    travelMode: "DRIVING",
    response: null,
  });

  const containerStyle = {
    minWidth: '500px',
    width: "40vw",
   
    minHeight: '500px',
    height: "40vw",
  };

  // const center = {
  //   lat: 51.5012,
  //   lng: -0.1354,
  // };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const infoWindowOptions = {
    styles: mapStyles,
  };


  function onZoomChanged() {
    if (!mapRef.current) return
    setZoom(mapRef.current.getZoom())
  }

  function onCenterChanged() {
    if (!mapRef.current) return
    setCenter(mapRef.current.getCenter())
  }
  
  

  useLayoutEffect(() => {

    const titles = document.querySelectorAll(".anim");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    });
    titles.forEach((title) => {
      observer.observe(title);
    });
    async function fetchChargePoints() {
      if (!values.response) {
        return;
      }
      const polyline =
        values.response && values.response.routes[0].overview_polyline;
      const distance = 1;
      const maxResults = 500;
      console.log(userData.connectionType)
      let connectionID
      if (userData.connectionType === 'Type 2 (Socket Only)'){
        connectionID = '25'
        //console.log(connectionID)
      } 
      
      if (userData.connectionType === 'CCS (Type 2)'){
        connectionID = '25,33'
        
      }

      console.log(connectionID)
      //const result = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&maxresults=100?key=0c36b6d2-3cf6-4f4d-9bf9-fc72140229ab`)
      const result = await fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&distance=${distance}&polyline=${polyline}&maxresults=${maxResults}&connectiontypeid=${connectionID}&key=0c36b6d2-3cf6-4f4d-9bf9-fc72140229ab`
      );
      const data = await result.json();

      

      const markers = data.map((point) => {
        // console.log('HEREE')
       
        // console.log('HEREE')
        //  if (userData.connectionType && point.Connections[0].ConnectionType.Title == userData.connectionType) {
        
        
        // let countConnector = 0
        
        // for (let i = 0; i < point.Connections.length; i++) {
        //   if ( userData.connectionType && point.Connections[i].ConnectionType.Title == userData.connectionType) {
        //     countConnector++
        //   }
        // }
        
       // if (countConnector > 0) {
          return {
            name: point.AddressInfo.Title,
            lat: point.AddressInfo.Latitude,
            lng: point.AddressInfo.Longitude,
            powerLevel: point.Connections[0] && point.Connections[0].LevelID,
            connections: point.Connections.map((connection) => {

              return {
                connectionType: connection.ConnectionType,
                power: connection.PowerKW,
                statusType: connection.StatusType,
              }

            }),

            usageCost: point.UsageCost,
            usageType: point.UsageType,
            operational: point.Connections.filter((connection) => {
              if (connection.StatusType){
                return connection.StatusType.IsOperational;
              }
              
            }).length
              ? true
              : false,
          };
      //  }

      });
      console.log(markers)
      // let markers2 = markers.filter(e => e != null);
      // let markers3 = markers2.splice(150,200)
      // console.log(markers3);
     // console.log(markers)
     const shuffled = markers.sort(() => 0.5 - Math.random());
     let markers2 = shuffled.slice(0, 100);
      setMarkers(markers2);


      // console.log(markers)
      console.log("checking type ", markers[0])
    }
    fetchChargePoints();
    return () => { };
  }, [values.response]);

  return isLoaded ? (
    <>
      <NavBar isLoggedIn={true}/>
      <div className="maps__container">
        <div className="info__holder">
          <div
            className="profile__holder anim"
            style={{ animationDelay: "-0.3s" }}
          >
            <Profile userData={userData} />
          </div>
          <div
            className="options__holder anim"
            style={{ animationDelay: "-0.2s" }}
          >
            <MapOptions
              handleSubmit={handleSubmit}
              handleGo={handleGo}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
            />
          </div>
          <div
            className="directions__holder anim"
            style={{ animationDelay: "-0.1s" }}
          >
            <Directions route={values.response ? [values.response.routes[0].legs[0].distance.text, values.response.routes[0].legs[0].duration.text, values.response.routes[0].summary, values.response.routes[0].legs] : null}/>
          </div>
        </div>
        <div className="maps__holder">
          <GoogleMap
            id="dashboard-map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            options={options}
            onLoad={onMapLoad}
            onZoomChanged={onZoomChanged}
            onCenterChanged={onCenterChanged}
          >
            {
              /* Child components, such as markers, info windows, etc. */
              markers &&

                markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    icon={{
                      url: marker.operational
                        ? `bolt${marker.powerLevel}.svg`
                        : `bad-bolt.svg`,
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(10, 10),
                    }}
                    onClick = { async () => {
                      
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
                        
                      });
                    }}
                    
                    
                    />))}
                    
                     
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

            {selected && (
              <div className="maps__infoWindow">
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => setSelected(null)}

                >
                  <div>
                    <h1 className="gradient__text">{selected.name}</h1>
                    <h4>
                      Cost:{" "}
                      {selected.usageCost
                        ? selected.usageCost
                        : "not specified"}
                    </h4>
                    <h4>Payment info: {selected.usageType.Title}</h4>
                    {selected.usageType.IsMembershipRequired ? (
                      <h4>Membership required</h4>
                    ) : (
                      ""
                    )}
                    <br />
                    {selected.connections.map((connection, index) => (
                      <ul key={index}>
                        <h3>Connection #{index + 1}</h3>
                        <li>Power: {connection.power} kW </li>
                        <li>Connector Type: {connection.connectionType.Title}</li>

                        <li>
                          Operational:{" "}
                          {connection.statusType.IsOperational
                            ? "true"
                            : "false"}
                        </li>
                        <li></li>
                      
                      </ul>
                    ))}

                    <h3> Places info </h3>

                    <button onClick={() => handleSelect(selected)}>
                      Select
                    </button>
                  </div>

                </InfoWindow>
              </div>
            )}
            <DirectionsService
              options={{
                destination: values.destination,
                origin: values.origin,
                travelMode: values.travelMode,
                waypoints: waypoints,
              }}
              callback={(response) => {
                
                directionsCallback(response)
              }}
            />
            <DirectionsRenderer
              options={{ map: mapRef.current, directions: values.response, zoom: mapRef.current && mapRef.current.getZoom(), center: mapRef.current && mapRef.current.getCenter(), preserveViewport: true}}
            />
          </GoogleMap>

        </div>
      </div>
    </>
  ) : (
    "loading"
  );
}
