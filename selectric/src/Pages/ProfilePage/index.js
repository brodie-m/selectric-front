import React from "react";
import NavBar from "../../Components/NavBar";
import Selections from "../../Components/Selections";

export default function Profile() {

    return(
        <>
        <NavBar isLoggedIn={true}/>
        <div>
            <Selections/>
        </div>
        </>
    )
}