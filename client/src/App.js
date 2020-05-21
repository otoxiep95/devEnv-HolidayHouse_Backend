import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Properties from "./pages/Properties/Properties";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateProperty from "./pages/CreateProperty/CreateProperty";
import Profile from "./pages/Profile/Profile";
import "./App.css";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  function handleAuthentication() {
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
        setIsAuth(true);
      }
    })
  }

  useEffect(() => {
    handleAuthentication();
  }, [isAuth]);

  return (
    <Router>
      <div className="App">
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
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
              path="/profile" 
              render={() => <Profile setIsAuth={setIsAuth}/>}
            />
            <Route 
              path="/login" 
              render={() => <Login setIsAuth={setIsAuth}/>} 
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


