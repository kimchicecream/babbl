import "./Message.css";

export default function Message({ message }) {
    // write code here
    return (
        <div className="message-container">
            <div className="profile-pic-container">
                <img ref={ message.user.imageUrl } alt={ "profile pic" }></img>
            </div>
            <div className="username-message-container">
                <div className="username-time-container">
                    <span className="username"></span>
                    <span className="time"></span>
                </div>
                <div className="message-text">
                    <p>{/* get message contents from redux store */}</p>
                </div>
            </div>
            <div className="message-mamangement-container">
                <button className="reactions"></button>
                <button className="edit"></button>
                <button className="delete"></button>
            </div>
        </div>
    );
}
