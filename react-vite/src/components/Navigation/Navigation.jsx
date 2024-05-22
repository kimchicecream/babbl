import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import { useLocation } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  if (location.pathname !== '/') {
    return null
  }

  return (
      <div className="navigation-container">
        <div className="logo-container">
          <img src="../../../public/babbl-logo.png" />
        </div>
        {sessionUser ? (
          <div className="logged-in">
            <ProfileButton user={sessionUser} />
          </div>
        ) : (
          <div className="signup-login-container">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            className="login-button"
          />
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            className="signup-button"
          />
        </div>

        )}
      </div>
  );
}

export default Navigation;
