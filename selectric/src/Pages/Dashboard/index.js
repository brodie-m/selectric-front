import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Container } from "@mui/material";
import NavBar from "../../Components/NavBar";

require('dotenv').config();

export default function Dashboard() {


    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 51.5012,
        lng: -0.1354
    };
    return (
        <>
            <NavBar />
            <Container sx={{ m: 2, p: 2, display: "flex" }}>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}

                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        { /* Child components, such as markers, info windows, etc. */}
                        <></>
                    </GoogleMap>
                </LoadScript>

            </Container>
        </>

    );
}
