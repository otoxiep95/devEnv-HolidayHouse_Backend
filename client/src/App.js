import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Properties from "./pages/Properties/Properties";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.css";
import CreateProperty from "./pages/CreateProperty/CreateProperty";

class App extends Component {
  state = {
    isAuth: false
  }

  componentDidMount() {
    fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        this.setState({
          isAuth: true
        });
      }
    })
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isAuth={this.state.isAuth} />
          <main>
            <Switch>
              <Route 
                exact path="/" 
                component={Home}
              />
              <Route 
                path="/properties" 
                component={Properties} 
              />
              <Route 
                path="/login" 
                render={() => <Login isAuth={this.state.isAuth}/>} 
              />
              <Route 
                path="/signup" 
                component={Signup} 
              />
              <Route 
                path="/create-property" 
                component={CreateProperty} 
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
