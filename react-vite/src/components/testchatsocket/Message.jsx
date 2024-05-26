import { ReactionsList } from "./reactionsList";
import { useState , useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emojiList } from "../../../public/emojis";
import OpenModalButton from "../OpenModalButton";
import DeleteMessageModal from "../DeleteMessageModal/DeleteMessageModal";
import { editMessageThunk } from "../../redux/messages";

const reduceReactions = (reactions) => {
    const reactionsArr = Object.values(reactions);

    const counts = reactionsArr.reduce((counts, reaction) => {
        counts[reaction.emojiId.toString()] =
            (counts[reaction.emojiId.toString()] || 0) + 1;
        return counts;
    }, {});

    // map counts to actual reaction buttons
    const buttons = [];
    for (const [emojiId, count] of Object.entries(counts)) {
        buttons.push(
            <button className="reaction-button">
                <span key={emojiId}>{emojiList(parseInt(emojiId))}</span>{" "}
                {count}
            </button>
        );
    }

    return buttons;
};

export const Message = ({ message, index }) => {
    const [showReactionsMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message.message);
    const messageRef = useRef(null);
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (messageRef.current && !messageRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isOwner = currentUser && message && currentUser.id === message.userId;

    const handleEditSubmit = (e) => {
        if (e.key === 'Enter') {
            dispatch(editMessageThunk({ ...message, message: editedMessage}, currentUser.username, message.reactions))
                .then(() => {
                    setIsEditing(false);
                })
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditedMessage(message.message);
        }
    };

    return (
        <div className="message-container" key={index}>


            <div className="profile-pic-container">
                {message?.user?.imageUrl && (
                    <img src={message.user.imageUrl} />
                )}
            </div>


            <div className="username-message-container">
                <div className="username-time-container">
                    <span className="username">{message.user.username}</span>
                    <span className="time"></span>
                </div>
                <div className="message-text">
                    {isEditing ? (
                        <input
                            type='text'
                            value={editedMessage}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            onKeyDown={handleEditSubmit}
                            onBlur={() => setIsEditing(false)}
                            autoFocus
                        />
                    ) : (
                        <p>{message.message}</p>
                    )}
                </div>
                {Object.keys(message.reactions).length > 0 && (
                    <div className="reactions">
                        {reduceReactions(message.reactions)}
                    </div>
                )}
            </div>


            <div className={`message-management-container ${isOwner ? 'owner' : 'not-owner'}`}>
                <i
                    class="fa-solid fa-face-kiss-beam"
                    onClick={() => setShowMenu(!showReactionsMenu)}
                ></i>
                {isOwner && (
                    <>
                        <i
                            class="fa-solid fa-pen"
                            onClick={() => setIsEditing(true)}
                        ></i>
                        <OpenModalButton
                            buttonText={<i className="fa-solid fa-trash-can"></i>}
                            modalComponent={<DeleteMessageModal messageId={message.id} />}
                            className='delete-message-button'
                        />
                    </>
                )}
            </div>


            {showReactionsMenu && (
                <ReactionsList message={message} onClose={() => setShowMenu(false)} />
            )}
        </div>
    );
};
