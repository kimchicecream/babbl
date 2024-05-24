import { ReactionsList } from "./reactionsList";
import { useState } from "react";
import { emojiList } from "../../../public/emojis";

const reduceReactions = (reactions) => {
    const reactionsArr = Object.values(reactions);

    console.log("reactions:", reactionsArr);
    const counts = reactionsArr.reduce((counts, reaction) => {
        counts[reaction.emojiId.toString()] =
            (counts[reaction.emojiId.toString()] || 0) + 1;
        return counts;
    }, {});

    const buttons = [];
    // map counts to actual reaction buttons
    for (const [emojiId, count] of Object.entries(counts)) {
        buttons.push(
            <button className="reaction-button">
                <span key={emojiId}>{emojiList(parseInt(emojiId))}</span>{" "}
                {count}
            </button>
        );
    }

    console.log("BUTTONS:", buttons);

    return buttons;
};

export const Message = ({ message, index }) => {
    const [showReactionsMenu, setShowMenu] = useState(false);

    return (
        <div className="message-container">
            <div className="profile-pic-container">
                {message?.user?.imageUrl && (
                    <img src={message.user.imageUrl} alt={"profile pic"} />
                )}
            </div>
            <div className="username-message-container">
                <div className="username-time-container">
                    <span className="username">{message.user.username}</span>
                    <span className="time"></span>
                </div>
                <div className="message-text">
                    <p>{message.message}</p>
                </div>
                {Object.keys(message.reactions).length > 0 && (
                    <div className="reactions">
                        {/* {reduceReactions(message.reactions)} */}
                        {Object.values(message.reactions).map((reaction) => {
                            return (
                                <button className="reaction-button">
                                    <span>
                                        {emojiList(parseInt(reaction.emojiId))}
                                    </span>{" "}
                                    {/* {count} */}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="message-management-container">
                <button
                    className="reactions"
                    onClick={() => {
                        setShowMenu(true);
                        // console.log(message.message);
                    }}
                ></button>
                <button className="edit"></button>
                <button className="delete" onClick={() => setShowMenu(false)}>
                    d
                </button>
            </div>
            {showReactionsMenu && <ReactionsList messageId={message.id} />}
        </div>
    );
};
