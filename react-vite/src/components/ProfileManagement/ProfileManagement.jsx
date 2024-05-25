import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./ProfileManagement.css";

export default function ProfileManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <div className="profile-management-container">
            <div className="user-info">
                <img src={user.imageUrl} />
                <div className="username-status-container">
                    <span id="username">{user.username}</span>
                    <span id="status">
                        {/* web socket online status */}Online
                    </span>
                </div>
            </div>
            {/* "user management" (read: logout button) window */}
            {openProfile === true && (
                <div>
                    <button
                        id="user-mgmt-logout-button"
                        onClick={() => {
                            console.log("HI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                            dispatch(thunkLogout());
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
            <button className="settings-button">
                <i
                    className="fa-solid fa-gear"
                    onClick={() => setOpenProfile(!openProfile)}
                ></i>
            </button>
        </div>
    );
}
