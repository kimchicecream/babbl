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
  const newChannel = await fetch("/api/channels/", {
    method: "POST",
    body: channelObj,
  });
  dispatch(createChannel(newChannel));
};

export const getChannelsByServerThunk = (serverId) => async (dispatch) => {
  const serversChannels = await fetch(`api/servers/:${serverId}/channels`);
  dispatch(getChannelsByServer(serversChannels));
};

const channelsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CHANNELS_BY_SERVER: {
      newState = { ...state };
      newState.channels = action.payload.channels;
      return newState;
    }
    case CREATE_CHANNEL: {
      newState = { ...state };
      newState.channels.channelId = action.payload.channel;
      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
