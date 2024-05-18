import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className='navigation-container'>
      <div className='logo-container'>
        <img src='../../public/babbl-logo.png' />
      </div>
      <div className='login-signup-container'>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
