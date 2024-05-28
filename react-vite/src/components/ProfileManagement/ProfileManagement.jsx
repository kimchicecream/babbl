import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./ProfileManagement.css";

export default function ProfileManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowUserMenu((prev) => !prev);
    };

    useEffect(() => {
    if (!showUserMenu) return;

    const closeMenu = (e) => {
        if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
        }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
    }, [showUserMenu]);

    const closeMenu = () => setShowUserMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
        navigate('/')
    };

    const featureComingSoon = () => {
        alert("Feature coming soon!");
    };

    const handleImageError = (e) => {
        e.target.src = '../../../blank-pic.png';
    };

    return (
        <div className="profile-management-container">
            <div className="user-info">
                <img src={user.imageUrl} onError={handleImageError}/>
                <div className="username-status-container">
                    <span id="username">{user.username}</span>
                    <span id="status">
                        {/* web socket online status */}Online
                    </span>
                </div>
            </div>
            {/* "user management" (read: logout button) window */}
            <div className="user-container">
                {showUserMenu && (
                    <div className={'user-dropdown'} ref={userRef}>
                        <div className="options">
                            <button className='button' onClick={featureComingSoon}>Manage Profile</button>
                            <div className="divider"></div>
                            <button className='button' onClick={featureComingSoon}>Profiles</button>
                            <div className="divider"></div>
                            <button className='button' onClick={featureComingSoon}>Privacy & Safety</button>
                            <div className="divider"></div>
                            <button className='delete-button' onClick={logout}>Log out</button>
                        </div>
                    </div>
                )}
            </div>
            <button className="settings-button">
                <i
                    className="fa-solid fa-gear"
                    onClick={toggleMenu}
                ></i>
            </button>
        </div>
    );
}
