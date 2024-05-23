import "./ProfileManagement.css"

export default function ProfileManagement() {
    // write code here
    return (
        <div className="profile-management-container">
            <div className="user-info">
                <img src='example.png' />
                <div className="username-status-container">
                    <span id="username">{/* user.name */}(demo)</span>
                    <span id="status">{/* web socket online status */}Online</span>
                </div>
            </div>
            <button className="settings-button"></button>
        </div>
    )
}
