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

const loadChannelMembers = (membersobj) => ({
  type: LOAD_CHANNEL_MEMBERS,
  payload: membersobj,
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

export const joinServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverId}/join`, {
    method: "POST",
  });
//   const data = await response.json()
//   console.log("RES:", data);

  if (response.ok) {
    dispatch(joinServer(serverId));
  } else {
    const error = await response.json();
    return error;
  }
};

export const leaveServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverId}/join`, {
    method: "POST",
  });
  if (response.ok) {
    dispatch(joinServer(serverId));
  } else {
    const error = await response.json();
    return error;
  }
};

const membershipsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_CHANNEL_MEMBERS: {
      newState = { ...action.payload };
      return newState;
    }
    default:
      return state;
  }
};

export default membershipsReducer;
