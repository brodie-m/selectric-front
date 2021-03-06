import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import { Container, Rating } from "@mui/material";
import NavBar from "../../Components/NavBar";
import "./dashboard.css";
import Profile from "../../Components/Profile";
import MapOptions from "../../Components/MapOptions";
import mapStyles from "./mapStyles";
import Directions from "../../Components/Directions";
import { letterSpacing } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  TextField,
  Slider
} from "@mui/material";
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";

require("dotenv").config();



const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];




function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const key = process.env.REACT_APP_GOOGLE_API_KEY;
const openChargeKey = process.env.REACT_APP_OPEN_API;
const libraries = ["places"];
export default function Dashboard() {
  const Url = localStorage.getItem("url");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  const [service, setService] = useState(null);
  const [selected, setSelected] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [connections, setConnections] = useState([]);

  const mapRef = useRef();

  const [userData, setUserData] = useState(null);
  useLayoutEffect(() => {

    const token = localStorage.getItem("token");

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

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setService(new window.google.maps.places.PlacesService(mapRef.current));
  }, []);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({
    lat: 51.5012,
    lng: -0.1354,
  });

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

  const [waypoints, setWaypoints] = useState([]);

  const handleChange = (a, event) => {
    setEndpoints({ ...endpoints, [a]: event });
  };

  function handleGo() {
    setWaypoints([]);
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
    setWaypoints(
      selectedArray.map((connection) => {
        return {
          location: new window.google.maps.LatLng(
            connection.lat,
            connection.lng
          ),
        };
      })
    );
    handleSubmit();
  };

  // const waypoints = connections.map((connection) => {
  //   return {
  //     location: new window.google.maps.LatLng(connection.lat, connection.lng),
  //   };
  // });

  const [places, setPlaces] = useState(null);

  const [values, setValues] = useState({
    //origin: 'London',
    //destination: 'Edinburgh',
    origin: "",
    destination: "",
    travelMode: "DRIVING",
    response: null,
  });

  const containerStyle = {
    minWidth: "320px",
    width: "50vw",

    minHeight: "320px",
    height: "50vw",
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
    if (!mapRef.current) return;
    setZoom(mapRef.current.getZoom());
  }

  function onCenterChanged() {
    if (!mapRef.current) return;
    setCenter(mapRef.current.getCenter());
  }

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const placesTypeData = ['all', 'bar', 'cafe', 'library', 'museum', 'park', 'pharmacy', 'restaurant', 'supermarket',]


  const [expanded, setExpanded] = useState(false);

  const [distance, setDistance] = useState(1);
  const [placesType, setPlacesType] = useState("");

  const handleDistanceChange = (event) => {


    setDistance(event.target.value)
  }
  const handlePlacesTypeChange = (event) => {
    setPlacesType(event.target.innerText)
    // setDistance(event.target.value)
  };

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
      //const distance = 1;
      const maxResults = 500;

      let connectionID = ''
      if (userData.cars.plugType === 'Type 2 (Socket Only)') {
        connectionID = '25'
      }

      if (userData.cars.plugType === "CCS (Type 2)") {
        connectionID = "25,33";
      }


      const result = await fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&distance=${distance}&polyline=${polyline}&maxresults=${maxResults}&connectiontypeid=${connectionID}&key=${openChargeKey}`
      );
      const data = await result.json();

      const markers = data.map((point) => {

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
            };
          }),

          usageCost: point.UsageCost,
          usageType: point.UsageType,
          operational: point.Connections.filter((connection) => {
            if (connection.StatusType) {
              return connection.StatusType.IsOperational;
            }
          }).length
            ? true
            : false,
        };
        //  }
      });

      const shuffled = markers.sort(() => 0.5 - Math.random());
      let markers2 = shuffled.slice(0, 100);
      setMarkers(markers2);
    }
    fetchChargePoints();
    return () => {};
  }, [values.response]);

  const [formToDisplay, setFormToDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return isLoaded ? (
    <>
      <NavBar isLoggedIn={true} />
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
              handleOpen={handleOpen}
              handleSubmit={handleSubmit}
              handleGo={handleGo}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
            />
            <div
              className="directions__holder anim directions__holder__mobile"
              style={{ animationDelay: "-0.1s" }}
            >

              <Directions
                route={
                  values.response
                    ? [
                        values.response.routes[0].legs[0].distance.text,
                        values.response.routes[0].legs[0].duration.text,
                        values.response.routes[0].summary,
                        values.response.routes[0].legs,
                      ]
                    : null
                }
              />

            </div>
          </div>
          <br />
          <div>

            <Container sx={{ m: 2, p: 2, display: "flex" }}>
              <Dialog open={open} onClose={handleClose}>

              <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >

                    <Typography>Choose the type of place you want to visit nearby whilst your car is charging</Typography>
                  </AccordionSummary>
                  <AccordionDetails>

                    <Autocomplete
                      disablePortal
                      name="cars"
                      id="combo-box-demo"
                      options={placesTypeData.map(place => {
                        return `${capitalizeFirstLetter(place)}`
                      })}
                      sx={{ m: 1, width: '90%' }}
                      value={values.placesTypeData}
                      onChange={(event) => handlePlacesTypeChange(event)}
                      isOptionEqualToValue={(option, value) => option.code === value}
                      renderInput={(params) => <TextField {...params} label="Type of place" />}
                    />
                  </AccordionDetails>
                </Accordion>
                

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >

                    <Typography>Choose how far away from your route you want charging points to show up for ( miles )</Typography>
                  </AccordionSummary>
                  <AccordionDetails>

                    {/* <FormControl sx={{ m: 1 }} variant="outlined" className='options__item-a'> */}
                    {/* <InputLabel htmlFor="accordion-distance">Distance</InputLabel> */}
                    {/* <OutlinedInput
                        // type="number"
                        // id="accordion-distance"
                        //value={values.from}
                        // onChange={(event) => handleDistanceChange(event)}
                        // label="Distance"
                      ></OutlinedInput> */}
                    {/* <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        // getAriaValueText={valuetext}
                        // valueLabelDisplay="auto"
                        step={1}
                        // marks
                        min={1}
                        max={10}
                        // id="accordion-distance"
                        onChange={(event) => handleDistanceChange(event)}
                      // label="Distance"
                      /> */}
                    {/* <Slider
                        aria-label="Temperature"
                        defaultValue={30}
                        // getAriaValueText={valuetext}
                        color="secondary"
                      /> */}
                    {/* </FormControl> */}
                    <div id="accordion-distance-div">
                      <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        // getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={10}
                        id="accordion-distance"
                        onChange={(event) => handleDistanceChange(event)}
                        label="Distance"
                      />
                    </div>
                  </AccordionDetails>

                </Accordion>

                
              </Dialog>
            </Container>




          </div>

          <div
            className="directions__holder anim directions__holder__desktop"
            style={{ animationDelay: "-0.1s" }}
          >
            <Directions
              route={
                values.response
                  ? [
                      values.response.routes[0].legs[0].distance.text,
                      values.response.routes[0].legs[0].duration.text,
                      values.response.routes[0].summary,
                      values.response.routes[0].legs,
                    ]
                  : null
              }
            />
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
                    onClick={async () => {
                      setSelected(marker);
                      if (placesType =='all') {
                        setPlacesType('')
                      }
                      let request = {
                        location: new window.google.maps.LatLng(
                          marker.lat,
                          marker.lng
                        ),
                        radius: 1604,
                        type: placesType.toLowerCase(),
                      };
                      service.nearbySearch(request, (results, status) => {
                        if (
                          status ===
                            window.google.maps.places.PlacesServiceStatus.OK &&
                          results
                        ) {
                          const initialPlaces = results.map((place) => {
                            return {
                              ...place,
                              lat: place.geometry.location.lat(),
                              lng: place.geometry.location.lng(),
                            };
                          });

                          initialPlaces.shift();
                          initialPlaces.pop();

                          setPlaces(initialPlaces);
                        }
                      });
                    }}
                  />
                ))
            }

            {places ? (
              places.map((place, index) => (
                <Marker
                  className="places__marker"
                  key={place.id}
                  position={{ lat: place.lat, lng: place.lng }}
                  icon={{
                    backgroundColor: place.icon_background_color,
                    url: place.icon,
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(10, 10),
                  }}
                />
              ))
            ) : (
              <h1></h1>
            )}

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
                        <li>
                          Connector Type: {connection.connectionType.Title}
                        </li>

                        <li>
                          Operational:{" "}
                          {connection.statusType.IsOperational
                            ? "true"
                            : "false"}
                        </li>
                        <li></li>
                      </ul>
                    ))}

                    <h3 id='places-nearby-1'> Places nearby </h3>
                    {places ? (
                      places.map((place, index) => (
                        <div id='places-div2'>
                        <ul key={index}>
                          <li id='places-nearby-2'>
                            {" "}
                            {place.name}{" "}
                            
                            
                          </li>
                          <li><Rating
                              readOnly
                              value={place.rating}
                              precision={0.5}
                              size="small"
                            /></li>
                            <li>{place.user_ratings_total}{" "}
                            {place.user_ratings_total ? "ratings" : ""}</li>
                            <br/>
                        </ul>
                        </div>
                      ))
                    ) : (
                      <h1></h1>
                    )}

                    <button
                      onClick={() => handleSelect(selected)}
                      id="addWayPointButton"
                    >
                      Add charging point to route
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
                directionsCallback(response);
              }}
            />
            <DirectionsRenderer
              options={{
                map: mapRef.current,
                directions: values.response,
                zoom: mapRef.current && mapRef.current.getZoom(),
                center: mapRef.current && mapRef.current.getCenter(),
                preserveViewport: true,
              }}
            />
          </GoogleMap>
        </div>
      </div>
    </>
  ) : (
    "loading"
  );
}
