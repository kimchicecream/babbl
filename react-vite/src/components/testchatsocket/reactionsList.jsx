import "./reactionsList.css";
import { emojiList } from "../../../public/emojis";
import { createReactionThunk } from "../../redux/messages";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export const ReactionsList = ({ message, onClose }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const emojis = [];
    const reactionsListRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (reactionsListRef.current && !reactionsListRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    for (let i = 0; i < 80; i++) {
        emojis.push(
            <button
                className="react-button"
                key={i}
                onClick={() => {
                    const reactionsArr = Object.values(message.reactions)
                    if (!reactionsArr.find((reaction) => reaction.emojiId === i && reaction.userId === userId)) {
                        dispatch(
                            createReactionThunk({
                                emojiId: i,
                                messageId: message.id,
                                userId
                            })
                        );
                    }
                }}
            >
                {emojiList(i)}
            </button>
        );
    }

    return <div id="reactions-list" ref={reactionsListRef}>{emojis}</div>;
};
