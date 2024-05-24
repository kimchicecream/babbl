const GET_CHANNELS_BY_SERVER = "channels/getChannelsByServer";
const CREATE_CHANNEL = "channels/createChannel";
const DELETE_CHANNEL = "channels/deleteChannel";
const EDIT_CHANNEL = "channels/editChannel";

const deleteChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  payload: channelId,
});

const createChannel = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  payload: channel,
});

const getChannelsByServer = (channels) => ({
  type: GET_CHANNELS_BY_SERVER,
  payload: channels,
});

export const deleteChannelThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/delete`);
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteChannel(channelId));
    return data;
  } else {
    const error = await response.json();
    return error;
  }
};

export const editChannelThunk = (channelObj) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelObj.id}/edit`, {
    method: "POST",
    body: JSON.stringify(channelObj),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editChannel(data));
  } else {
    const error = await response.json();
    return error;
  }
};

export const createChannelThunk = (channelObj) => async (dispatch) => {
  const response = await fetch("/api/channels/new", {
    method: "POST",
    body: JSON.stringify(channelObj),
    headers: { "Content-Type": "application/json" },
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(createChannel(data));
    return 'success'
  } else {
    const error = await response.json();
    return error;
  }
};

export const getChannelsByServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`api/channels/${serverId}/all`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getChannelsByServer(data));
  } else {
    const error = await response.json();
    return error;
  }
};

const channelsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CHANNELS_BY_SERVER: {
      newState = {};
      action.payload.forEach((channel) => {
        newState[channel.id] = channel
      })
      return newState;
    }
    case CREATE_CHANNEL: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_CHANNEL: {
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case EDIT_CHANNEL: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
