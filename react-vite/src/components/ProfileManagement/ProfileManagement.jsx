import "./ProfileManagement"

export default function ProfileManagement() {
    // write code here 
    return (
        <div className="profile-management-container">
            <div className="user-info"></div>
            {/* <img ref={/* image url of profile *\/}></img> */}
            <div className="user-name-status-container">
                <span id="user-name">{/* user.name */}</span>
                <span id="status">{/* web stocket online status */}</span>
            </div>
            <button className="settings-button"></button>
        </div>
    )
}