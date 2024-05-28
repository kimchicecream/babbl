import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { Link, useNavigate } from 'react-router-dom';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const noFeature = (e) => {
    e.preventDefault();
    alert('Feature coming soon!');
  }

  return (
    <>
      <div className='icon-container'>
        <button onClick={toggleMenu} className='profile-button-shape'>
            <div className='lines'>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <i className="fas fa-user-circle" />
        </button>
      </div>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
            <div className='username-and-email'>
              <h4>Hello, {user.username}</h4>
              <p>{user.email}</p>
            </div>

            <div className='divider'></div>

            <div className='account'>
              <Link to='/account' onClick={(e) => noFeature(e)}>
                <p>Account</p>
              </Link>
            </div>

            <div className='divider'></div>

            <div className='bottom'>
              <Link to='/help' onClick={(e) => noFeature(e)}>
                <p>Help</p>
              </Link>
              <button onClick={logout}>
                <p>Log Out</p>
              </button>
            </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
