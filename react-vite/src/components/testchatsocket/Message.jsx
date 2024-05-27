import { ReactionsList } from "./reactionsList";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emojiList } from "./emojis";
import OpenModalButton from "../OpenModalButton";
import DeleteMessageModal from "../DeleteMessageModal/DeleteMessageModal";
import {
  editMessageThunk,
  deleteReactionThunk,
  createReactionFromSocket,
} from "../../redux/messages";

const reduceReactions = (reactions, userId, socket, messageId) => {
  const consolidatedReactions = {};
  const reactionsArr = Object.values(reactions);
  const dispatch = useDispatch();
  /*
    an entry in consolidatedReactions will have a key of an emojiId
    and a value of an array that contains all the reactions with that
    emojiId associated with this particular message. this allows us
    to pass in reaction data for reaction deletion
    */
  reactionsArr.forEach((reaction) => {
    if (consolidatedReactions[reaction.emojiId]) {
      consolidatedReactions[reaction.emojiId].push(reaction);
    } else consolidatedReactions[reaction.emojiId] = [reaction];
  });

  let reactId;
  const removeReaction = (reactionsById) => {
    if (
      reactionsById.find((reaction) => {
        if (reaction.userId === userId) {
          reactId = reaction.id;
          return true;
        }
      })
    ) {
      dispatch(deleteReactionThunk(reactId)).then(() => {
        socket.emit("delete_reaction", { id: reactId, messageId });
      });
    }
  };

  // map counts to actual reaction buttons
  const buttons = [];
  for (const [emojiId, reactionsById] of Object.entries(
    consolidatedReactions
  )) {
    buttons.push(
      <button
        className="reaction-button"
        onClick={() => removeReaction(reactionsById)}
      >
        <span key={emojiId}>{emojiList(parseInt(emojiId))}</span>{" "}
        {reactionsById.length || 0}
      </button>
    );
  }

  return buttons;
};

export const Message = ({ message, index, socket }) => {
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

    socket.on("create_reaction", (reaction) => {
      dispatch(createReactionFromSocket(reaction));
    });

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isOwner =
    currentUser.id === message["user"]["id"] ||
    currentUser.id === message.userId;

  const handleEditSubmit = (e) => {
    console.log(
      message,
      "MESSAGE IN THE HANDLE SUBMIT EDIT MESSAGE FORM THINGY !$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    );
    if (e.key === "Enter") {
      dispatch(
        editMessageThunk(
          { ...message, message: editedMessage, userId: message.userId },
          currentUser.username,
          message.reactions,
          currentUser.imageUrl
        )
      )
        .then((response) => {
          console.log(
            "RESPONMSE FROM THE EDIT MESSAGE THUNK IN THE MESSAGE JSX %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
            response
          );
          setIsEditing(false);
        })
        .then(() => {
          socket.emit("edit_message", { ...message, message: editedMessage });
        });
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditedMessage(message.message);
    }
  };

  return (
    <div className="message-container" key={index}>
      <div className="profile-pic-container">
        {message?.user?.imageUrl && <img src={message.user.imageUrl} />}
      </div>

      <div className="username-message-container">
        <div className="username-time-container">
          <span className="username">{message.user.username}</span>
          <span className="time"></span>
        </div>
        <div className="message-text">
          {isEditing ? (
            <input
              type="text"
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
            {reduceReactions(
              message.reactions,
              currentUser.id,
              socket,
              message.id
            )}
          </div>
        )}
      </div>

      <div
        className={`message-management-container ${
          isOwner ? "owner" : "not-owner"
        }`}
      >
        <i
          class="fa-solid fa-face-kiss-beam"
          onClick={() => setShowMenu(!showReactionsMenu)}
        ></i>
        {isOwner && (
          <>
            <i class="fa-solid fa-pen" onClick={() => setIsEditing(true)}></i>
            <OpenModalButton
              buttonText={<i className="fa-solid fa-trash-can"></i>}
              modalComponent={
                <DeleteMessageModal messageId={message.id} socket={socket} />
              }
              className="delete-message-button"
            />
          </>
        )}
      </div>

      {showReactionsMenu && (
        <ReactionsList
          message={message}
          socket={socket}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};
