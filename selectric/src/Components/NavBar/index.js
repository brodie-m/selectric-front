import { AppBar, Button, Container, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import "./navbar.css";
import Register from "../Register";
import Login from "../Login";
import logo from '../../assets/logo.svg'
import MobileMenu from "../MobileMenu";
export default function NavBar(props) {
  const isLoggedIn = props.isLoggedIn
  const token = localStorage.getItem('token')
  
  // const toggleDrawer = (anchor, open) => (event) => {
  //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //       return;
  //     }

  //     setState({ ...state, [anchor]: open });
  //   };
  /* {/* <Drawer
            anchor={menu}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {menuList}
          </Drawer>
        </> */

  function handleLogout(e) {
    e.preventDefault();
    console.log('clicked')
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  function handleClick(e) {
    e.preventDefault();
  }
  const [formToDisplay, setFormToDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
      <>
    <div className="selectric__navbar">
      <div className="selectric__navbar-links">
        <div className="selectric__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
      
      <div className="selectric__navbar-links_container">
        
        <p>
          <a href="http://localhost:3000/">Home</a>
        </p>
        <p>
          <a href="http://localhost:3000/">About</a>
        </p>
        { window.location.href == "http://localhost:3000/profile" || window.location.href == "http://localhost:3000/dashboard" ? 
          <p>
          <a href="http://localhost:3000/profile">Profile</a>
        </p> : null}
        
        <div className = 'selectric__mobile-menu'>

        <MobileMenu />
        </div>
      </div>
      
      <div className="selectric__navbar-sign">
        {!isLoggedIn ? <><Button
          sx={{ m: 1, px: 4, py: 1, backgroundColor: 'transparent', color: 'white', '&:hover': {
            backgroundColor: '#ff4820' }}}
          variant="contained"
          onClick={() => {
            handleOpen();
            setFormToDisplay(<Login />);
          }}
        >
          Login
        </Button>
        <Button
          sx={{ m: 1, px: 4, py: 1, backgroundColor: '#ff4820', color: 'white', '&:hover': {
              backgroundColor: '#ff4820'
          } }}
          variant="contained"
          onClick={() => {
            handleOpen();
            setFormToDisplay(<Register />);
          }}
        >
          Register
        </Button></> : <Button
          sx={{ m: 1, px: 4, py: 1, backgroundColor: '#ff4820', color: 'white', '&:hover': {
              backgroundColor: '#ff4820'
          } }}
          variant="contained"
          onClick={(e) => {
            handleLogout(e);
          }}
        >Logout</Button>}
        </div>
        
      
    </div>
    </div>
    <Container sx={{m: 2, p:2, display: "flex"}}>

      
    <Dialog open={open} onClose = {handleClose}>
    {formToDisplay}
</Dialog>
</Container>
</>
    // <AppBar  position='static' className="selectric__navbar">
    //     <Toolbar className="selectric__links">
    //     <IconButton
    //     size="large"
    //     edge="start"
    //     color="inherit"
    //     aria-label="menu"
    //     key = 'menu'
    //     onClick={handleClick}
    //     sx={{ mr: 2 }}
    //   >
    //     <MenuIcon />
    //   </IconButton>
    //     {/* <img src={logo} alt='logo'/> */}
    //     <Typography variant='h5' component='div'>
    //         Selectric
    //     </Typography>
    //     </Toolbar>
    // </AppBar>
  );
}
