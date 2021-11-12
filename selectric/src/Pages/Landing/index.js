import { Button, Container, Dialog, Modal } from "@mui/material";
import React, { useState } from "react";
import Login from "../../Components/Login";
import Register from "../../Components/Register";

export default function Landing() {
  const [formToDisplay, setFormToDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Container>

      <Button variant="contained" onClick = {() => {handleOpen(); setFormToDisplay(<Login/>)}}>Login</Button>
      <Button variant="contained" onClick = {() => {handleOpen(); setFormToDisplay(<Register/>)}}>Register</Button>
      <Dialog open={open} onClose = {handleClose}>
          {formToDisplay}
      </Dialog>
    </Container>
    
  );
}
