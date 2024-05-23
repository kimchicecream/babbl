const GET_CHANNELS_BY_SERVER = "channels/getChannelsByServer";
const CREATE_CHANNEL = "channels/createChannel";

const createChannel = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel,
});

const getChannelsByServer = (channels) => ({
  type: GET_CHANNELS_BY_SERVER,
  payload: channels,
});

export const createChannelThunk = (channelObj) => async (dispatch) => {
  const newChannel = await fetch("/api/channels/new", {
    method: "POST",
    body: channelObj,
  });
  dispatch(createChannel(newChannel));
};

export const getChannelsByServerThunk = (serverId) => async (dispatch) => {
  const serversChannels = await fetch(`api/channels/${serverId}/all`);
  const data = await serversChannels.json()
  dispatch(getChannelsByServer(data));
};

const channelsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CHANNELS_BY_SERVER: {
      newState = { ...state, serverChannels: action.payload };
      return newState;
    }
    case CREATE_CHANNEL: {
      newState = { ...state };
      newState.channelId = action.payload.channel;
      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
