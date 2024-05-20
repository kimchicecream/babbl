import "./UserList.css";

export default function UserList() {
    // write code here
    return (
        <div className="user-list-container">
            <div className="online">
                <span>Online</span>
                {/* map profile pic and username if online */}
            </div>
            <div className="offline">
                <span>Offline</span>
                {/* map profile pic and username if offline */}
            </div>
        </div>
    );
}
