const GET_CHANNELS_BY_SERVER = "channels/getChannelsByServer";

const getChannelsByServer = (channels) => ({
  type: GET_CHANNELS_BY_SERVER,
  payload: channels,
});

export const getChannelsByServerThunk = (serverId) => async (dispatch) => {
  const serversChannels = await fetch(`api/servers/:${serverId}/channels`);
  dispatch(getChannelsByServer(serversChannels));
};

const channelsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CHANNELS_BY_SERVER: {
      newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
