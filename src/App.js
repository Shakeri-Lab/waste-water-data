import React from 'react'
import './App.css';
//import * as ReactBootstrap from "react-bootstrap"; 
import Home from "./Components/Home"
import Reports from "./Components/Reports";
import Protocolsandstudies from "./Components/Protocolsandstudies";
import Team from "./Components/Team"; 
import Faqs from "./Components/Faqs";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
      <Router>
      <Navbar />
        <Switch>
          <Route path="/Faq" component={Faqs}>
            <Faqs />
          </Route>
          <Route path="/Team" component={Team}>
            <Team />
          </Route>
          <Route path="/Protocolsandstudies" component={Protocolsandstudies}>
            <Protocolsandstudies />
          </Route>
          <Route path="/Reports" component={Reports}>
            <Reports />
          </Route>
          <Route path="/" component={Home}>
            <Home />
          </Route>
        </Switch>
    </Router>
    </div>
    <Footer />
     </div>
  );
}

export default App;