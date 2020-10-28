import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import EmployeeMain from './components/EmployeeMain';
import CompanyMain from './components/CompanyMain';
import AdminMain from './components/AdminMain';
import Logout from './components/Logout';
import CompanyHome from './components/CompanyHome';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/companyHome/:id">
          <CompanyHome />
        </Route>
        <Route path="/company">
          <CompanyMain />
        </Route>
        <Route path="/employee">
          <EmployeeMain />
        </Route>
        <Route path="/admin">
          <AdminMain />
        </Route>
        <Route path="/companySignup" exact>
          <Signup type="company" />
        </Route>
        <Route path="/employeeSignup" exact>
          <Signup type="employee" />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

App.propTypes = {};
export default App;
