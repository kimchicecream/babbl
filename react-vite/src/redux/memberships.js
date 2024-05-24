const JOIN_SERVER = "memberships/servers/join";
const LEAVE_SERVER = "memberships/servers/leave";
const JOIN_CHANNEL = "memberships/channels/join";
const LEAVE_CHANNEL = "memberships/channels/leave";
const LOAD_CHANNEL_MEMBERS = "memberships/channels/members";

const joinServer = (serverId) => ({
  type: JOIN_SERVER,
  payload: serverId,
});

const leaveServer = (serverId) => ({
  type: LEAVE_SERVER,
  payload: serverId,
});

const leaveChannel = (channelId) => ({
  type: LEAVE_CHANNEL,
  payload: channelId,
});

const joinChannel = (channelId) => ({
  type: JOIN_CHANNEL,
  payload: channelId,
});

const loadChannelMembers = (members_array) => ({
  type: LOAD_CHANNEL_MEMBERS,
  payload: members_array,
});

export const loadChannelMembersThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`api/channels/${channelId}/allMembers`);
  if (response.ok) {
    data = await response.json();
    dispatch(loadChannelMembers(data));
  } else {
    const error = await response.json();
    return error;
  }
};

export const joinServerThunk = (serverid) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverid}/join`, {
    method: "POST",
  });
  if (response.ok) {
    dispatch(joinServer(serverid));
  } else {
    const error = await response.json();
    return error;
  }
};

export const leaveServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverid}/join`, {
    method: "POST",
  });
  if (response.ok) {
    dispatch(joinServer(serverid));
  } else {
    const error = await response.json();
    return error;
  }
};

const membershipsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_CHANNEL_MEMBERS: {
      newState = {};
      return newState;
    }
    default:
      return state;
  }
};

export default membershipsReducer;
