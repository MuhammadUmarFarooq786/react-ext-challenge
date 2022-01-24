import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from "./modules/auth/components/SignIn";
import { Redirect, Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/store";

function App() {
  return (
    /* Provide Redux store */
    <Provider store={store}>

      <BrowserRouter>
        <Switch>
          {
            /* Redirect from root URL to /login. */
            <Redirect exact from="/" to="/login" />
          }
          <Route path="/login" component={SignIn} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
