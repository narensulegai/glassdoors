import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import EmployeeHome from './components/employee/Home';
import CompanyHome from './components/company/Home';
import Logout from './components/Logout';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/company">
          <CompanyHome />
        </Route>
        <Route path="/employee">
          <EmployeeHome />
        </Route>
        <Route path="/companySignup">
          <Signup type="company" />
        </Route>
        <Route path="/employeeSignup">
          <Signup type="employee" />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

App.propTypes = {};
export default App;
