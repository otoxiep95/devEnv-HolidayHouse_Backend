import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Properties from "./pages/Properties/Properties";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.css";
import CreateProperty from "./pages/CreateProperty/CreateProperty";
import Logout from "./pages/Logout/Logout";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/properties" component={Properties} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/create-property" component={CreateProperty} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
