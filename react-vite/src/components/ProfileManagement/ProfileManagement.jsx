import { useSelector } from 'react-redux';
import "./ProfileManagement.css"

export default function ProfileManagement() {
    const user = useSelector(state => state.session.user);

    return (
        <div className="profile-management-container">
            <div className="user-info">
                <img src={user.imageUrl} />
                <div className="username-status-container">
                    <span id="username">{user.username}</span>
                    <span id="status">{/* web socket online status */}Online</span>
                </div>
            </div>
            <button className="settings-button">
                <i className="fa-solid fa-gear"></i>
            </button>
        </div>
    )
}
