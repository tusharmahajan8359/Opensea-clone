import React from "react";
import "./App.css";
import Navbar from "./Components/Nav-Bar/NavBar";
import { Switch, Router, Route, Link } from "react-router-dom";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/footer/Footer";
import { Features } from "./Components/createNftSection/Features";
import { useEffect, useState } from "react";
import {Provider} from "react-redux"
import store from "./store"
function App() {
  const [state, setState] = useState({ isConnected: false });

  return (
    <React.Fragment>
      <Provider store={store}>
      <Navbar stateData={state} setStateData={setState} />

      <Switch>
        <Route path="/" exact>
          <Hero />
          <Features />
        </Route>
      </Switch>

      <footer className="footer">
        <Footer />
      </footer>
      </Provider>
    </React.Fragment>
  );
}

export default App;
