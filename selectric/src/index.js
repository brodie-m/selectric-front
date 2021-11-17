import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from '@mui/material/styles'
import { createTheme } from '@mui/material';
import './App.css'
const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>

    <App className='gradient__bg'/>
  </ThemeProvider>,
  
  document.getElementById('root')
);

