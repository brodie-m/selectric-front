import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from '@mui/material/styles'
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>

    <App />
  </ThemeProvider>,
  
  document.getElementById('root')
);

