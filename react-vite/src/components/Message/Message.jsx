import "./Message.css";

export default function Message({ message }) {
    // write code here
    console.log("message: ", message);
    return (
        <div className="message-container">
            <div className="profile-pic-container">
                {message?.user?.imageUrl && (
                    <img ref={message.user.imageUrl} alt={"profile pic"}></img>
                )}
            </div>
            <div className="username-message-container">
                <div className="username-time-container">
                    <span className="username">{message.username}</span>
                    <span className="time"></span>
                </div>
                <div className="message-text">
                    <p>{message.message}</p>
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
