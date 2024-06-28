const GET_MESSAGES_BY_CHANNEL = "messages/getMessagesByChannel";
const CREATE_NEW_MESSAGE = "messages/createNewMessage";
const EDIT_MESSAGE = "messages/editMessage";
const DELETE_MESSAGE = "messages/delete";
const CREATE_REACTION = "messages/reactions/create";
const DELETE_REACTION = "messages/reactions/delete";

const deleteReaction = (reaction) => ({
  type: DELETE_REACTION,
  payload: reaction,
});

const getMessagesByChannel = (messages) => ({
  type: GET_MESSAGES_BY_CHANNEL,
  payload: messages,
});

const createReaction = (reaction) => ({
  type: CREATE_REACTION,
  payload: reaction,
});

const deleteMessage = (messageId) => ({
  type: DELETE_MESSAGE,
  payload: messageId,
});

const createNewMessage = (message) => ({
  type: CREATE_NEW_MESSAGE,
  payload: message,
});

const editMessage = (message) => ({
  type: EDIT_MESSAGE,
  payload: message,
});

export const deleteReactionThunk = (reactionId) => async (dispatch) => {
  const response = await fetch(`api/reactions/${reactionId}/delete`);
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReaction(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createReactionThunk = (reactionObj) => async (dispatch) => {
  const response = await fetch(
    `api/messages/${reactionObj.messageId}/reactions`,
    {
      method: "POST",
      body: JSON.stringify(reactionObj),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.ok) {
    const data = await response.json();

    dispatch(createReaction(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createReactionFromSocket = (reaction) => async (dispatch) => {
  dispatch(createReaction(reaction));
  return reaction;
};

export const editMessageThunk =
  (messageObj, username, reactions, imageUrl) => async (dispatch) => {
    const response = await fetch(`api/messages/${messageObj.id}/edit`, {
      method: "POST",
      body: JSON.stringify(messageObj),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      data.user = { username, imageUrl };
      data.reactions = reactions;
      dispatch(editMessage(data));
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const deleteMessageThunk = (messageId) => async (dispatch) => {
  const response = await fetch(`api/messages/${messageId}/delete`);
  if (response.ok) {
    // const data = await response.json();
    dispatch(deleteMessage(messageId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createMessageFromSocket = (message) => async (dispatch) => {
  dispatch(createNewMessage(message));
  return message;
};

export const getMessagesByChannelThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${channelId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getMessagesByChannel(data));
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const editMessageFromSocketThunk = (message) => async (dispatch) => {
  dispatch(editMessage(message));
  return message;
};

export const deleteMessageFromSocketThunk = (messageId) => async (dispatch) => {
  dispatch(deleteMessage(messageId));
  return messageId;
};

export const deleteReactionFromSocketThunk = (reaction) => async (dispatch) => {
  dispatch(deleteReaction(reaction));
};

const messagesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_MESSAGES_BY_CHANNEL: {
      newState = {};
      action.payload.forEach((message) => {
        newState[message.id] = message;
      });
      return newState;
    }
    case CREATE_REACTION: {
      newState = { ...state };
      newState[action.payload.messageId]["reactions"][action.payload.id] =
        action.payload;
      return newState;
    }
    case DELETE_REACTION: {
      newState = { ...state };
      delete newState[action.payload.messageId]["reactions"][action.payload.id];
      return newState;
    }
    case CREATE_NEW_MESSAGE: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_MESSAGE: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_MESSAGE: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default messagesReducer;
