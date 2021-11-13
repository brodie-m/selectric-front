import './App.css';
import * as React from 'react';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
  <Router>
    <Switch>
    <Route path = '/' exact> 


  
  

  <Landing className='gradient__bg'/>
    </Route>
    <Route path = '/dashboard'>
  <Dashboard/>
      </Route>
      </Switch>
  </Router>

  
  );
}

export default App;
