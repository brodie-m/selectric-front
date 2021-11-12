import { Button, Container, Dialog, Modal } from "@mui/material";
import React, { useState } from "react";
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
    <Container sx={{m: 2, p:2, display: "flex"}}>

      <Button sx={{m: 1, p:1}} variant="contained" onClick = {() => {handleOpen(); setFormToDisplay(<Login/>)}}>Login</Button>
      <Button sx={{m: 1, p:1}} variant="contained" onClick = {() => {handleOpen(); setFormToDisplay(<Register/>)}}>Register</Button>
      <Dialog open={open} onClose = {handleClose}>
          {formToDisplay}
      </Dialog>
    </Container>
    </>
    
  );
}
