import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screen/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import ProfileScreen from "./screen/ProfileScreen";

function App() {
  //user logged in. useSelector selects user from the userSLice user
  const user = useSelector(selectUser);

  //Dispatch data into the logged in
  const dispatch = useDispatch();

  useEffect(() => {
    //checking the state of user
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //Stay Logged in
        console.log(userAuth)
        //userAuth has many keys and values 
        //Now dispatch the login details
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        //Log out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {/*If not logged in then render the login page else show HomeScreen */}
        {!user ? (
          <LoginScreen />
        ) : (
            <Switch>
              <Route path='/profile'>
                <ProfileScreen />
              </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
