import { Button, Container, Dialog, Modal } from "@mui/material";
import React, { useState } from "react";

import Header from "../../Components/Header";
import Login from "../../Components/Login";
import NavBar from "../../Components/NavBar";
import Register from "../../Components/Register";

export default function Landing() {


  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true: false

  const [formToDisplay, setFormToDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
      <>
      <NavBar isLoggedIn={isLoggedIn}/>
      <Header handleOpen={handleOpen} handleClose={handleClose}/>
      
    </>
    
  );
}
