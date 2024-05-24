import "./reactionsList.css";
import { emojiList } from "../../../public/emojis";
import { createReactionThunk } from "../../redux/messages";
import { useSelector, useDispatch } from "react-redux";

export const ReactionsList = ({ message }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const emojis = [];
    for (let i = 0; i < 80; i++) {
        emojis.push(
            <button
                className="react-button"
                key={i}
                onClick={() => {
                    dispatch(
                        createReactionThunk({
                            emojiId: i,
                            messageId: message.id,
                            userId: user.id,
                        })
                    );
                }}
            >
                {emojiList(i)}
            </button>
        );
    }

    return <div id="reactions-list">{emojis}</div>;
};
