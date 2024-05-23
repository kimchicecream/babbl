import "./reactionsList.css";
import { emojiList } from "../../../public/emojis";

export const ReactionsList = ({ messageId }) => {
    const emojis = []
    for (let i = 0; i < 80; i++) {
        emojis.push((
            <button className="react-button"
            onClick={() => {}}
            >{emojiList(i)}</button>
        ))
    }

    return (
        <div id="reactions-list">
            {emojis}
        </div>
    );
};
