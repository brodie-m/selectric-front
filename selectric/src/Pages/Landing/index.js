import { Button, Container, Dialog, Modal } from "@mui/material";
import React, { useState } from "react";
import Header from "../../Components/Header";
import Login from "../../Components/Login";
import NavBar from "../../Components/NavBar";
import Register from "../../Components/Register";

export default function Landing() {
  const [formToDisplay, setFormToDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
      <>
      <NavBar/>
      <Header/>
    </>
    
  );
}
