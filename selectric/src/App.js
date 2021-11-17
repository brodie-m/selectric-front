import './App.css';
import * as React from 'react';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/ProfilePage';
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
  <Landing />
    </Route>
    <Route path = '/dashboard'>
  <Dashboard/>
      </Route>
    <Route path = '/profile'>
      <ProfilePage/>
    </Route>
      </Switch>
  </Router>

  
  );
}

export default App;
