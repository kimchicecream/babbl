import "./reactionsList.css";
import { emojiList } from "../../../public/emojis";
import { createReactionThunk } from "../../redux/messages";
import { useSelector, useDispatch } from "react-redux";

export const ReactionsList = ({ messageId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const emojis = [];
    for (let i = 0; i < 80; i++) {
        emojis.push(
            <button
                className="react-button"
                key={i}
                onClick={() => {
                    // console.log("emoji ", i, " pressed");
                    dispatch(
                        createReactionThunk({
                            emojiId: i,
                            messageId: messageId,
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
