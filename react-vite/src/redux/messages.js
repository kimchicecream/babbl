const GET_MESSAGES_BY_CHANNEL = "channels/getMessagesByChannel";

const getMessagesByChannel = (messages) => ({
  type: GET_MESSAGES_BY_CHANNEL,
  payload: messages,
});

export const getMessagesByChannelThunk = (channelId) => async (dispatch) => {
  const messages = await fetch(`/api/messages${channelId}`);
  dispatch(getMessagesByChannel(messages));
};

const messagesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_MESSAGES_BY_CHANNEL: {
      newState = { ...state };
      newState.messages = action.payload.messages;

      return newState;
    }

    default:
      return state;
  }
};

export default messagesReducer;
