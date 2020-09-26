import React from 'react';
import { Route, Switch } from "react-router-dom";
import ListingPage from "./views/ListingPage";
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ListingPage} />
    </Switch>
  );
}

export default App;
