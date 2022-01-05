import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../Nav";
import "./ProfileScreen.css";
import PlansScreen from "./PlansScreen.js"

function ProfileScreen() {
  //get the user data for details
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      {/*reuse the nav component*/}
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <PlansScreen />

              <button
                onClick={() => auth.signOut()}
                className="pushable"              
              >
                <span className="profileScreen__logout">
                    Sign Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
