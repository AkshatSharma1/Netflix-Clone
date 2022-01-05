/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";

function Nav() {

  //useHistory to get the profile section updated when clicked
  const history = useHistory();

  /*Functionality to hide navbar bg when scrolled*/
  const [showNav, setHandleShow] = useState(false);

  const navbarTransistion = () => {
        if (window.scrollY > 100)
        {
            setHandleShow(true);
        }
        else
        {
            setHandleShow(false);
        }
  }

    /*useEffect*/
    useEffect(() => {
        window.addEventListener("scroll", navbarTransistion);
        //Cleaning process
        return () => window.removeEventListener("scroll", navbarTransistion);
    }, []);

    return (
      //Show nav when scrollY > 100(showNav is true)
      <div className={`nav ${showNav && 'nav__black'}`}>
      <div className="nav__content">
          <img
            onClick={()=>history.push("/")}
          className="nav__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="nav"
        />
          <img
            onClick={()=> history.push("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
