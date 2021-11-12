import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

export default function NavBar() {

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
        
    function handleClick(e) {
        e.preventDefault();
    }

    return (
        
        <AppBar position='static'>
            <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            key = 'menu'
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant='h5' component='div'>
                Selectric
            </Typography>
            </Toolbar>
        </AppBar>
        
    )
}
