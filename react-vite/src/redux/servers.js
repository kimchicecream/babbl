const LOAD_ALL_SERVERS = "servers/getAllServers";
const LOAD_SERVERS_BY_USER = "servers/getServersByUser";
const CREATE_SERVER = "servers/createNew";
const DELETE_SERVER = "servers/delete";
const EDIT_SERVER = "servers/edit";

const deleteServer = (serverId) => ({
  type: DELETE_SERVER,
  payload: serverId,
});

const editServer = (server) => ({
  type: EDIT_SERVER,
  payload: server,
});

const loadAllServers = (servers) => ({
  type: LOAD_ALL_SERVERS,
  payload: servers,
});

const createServer = (server) => ({
  type: CREATE_SERVER,
  payload: server,
});

const loadServersByUser = (servers) => ({
  type: LOAD_SERVERS_BY_USER,
  payload: servers,
});

// export const joinServerThunk = (serverid) => async (dispatch) => {
//   const response = await fetch(`api/servers/${serverid}/join`, {
//     method: "POST",
//   });
//   if (response.ok) {
//     dispatch(joinServer(serverid));
//   }
// };

export const editServerThunk = (serverObj) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverObj.id}/edit`, {
    method: "POST",
    body: JSON.stringify(serverObj),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editServer(data));
    return data;
  } else {
    const errors = await response.json();
    return { errors };
  }
};

export const deleteServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverId}/delete`);
  if (response.ok) {
    const data = await response.json();
    console.log(data, "data IN DELETE SDRVER THUNK");
    console.log(
      serverId,
      "serverID in DELETRE SERVERU THINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    );
    dispatch(deleteServer(serverId));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteServerFromSocket = (serverId) => async (dispatch) => {
    dispatch(deleteServer(serverId));
}

export const createServerThunk = (serverObj) => async (dispatch) => {
  const response = await fetch("api/servers/create", {
    method: "POST",
    body: JSON.stringify(serverObj),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createServer(data));
    return data;
  } else {
    const errors = await response.json();
    return { errors };
  }
};

export const loadAllServersThunk = () => async (dispatch) => {
  const response = await fetch("api/servers/all");

  if (response.ok) {
    const data = await response.json();

    console.log("DATA:", data);
    dispatch(loadAllServers(data));

    return data;
  } else {
    const errors = await response.json();
    return { errors };
  }
};

export const loadServersByUserThunk = (userId) => async (dispatch) => {
    console.log("loading servers by user with id ", userId)
  const response = await fetch(`api/servers/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadServersByUser(data));
  } else {
    const errors = await response.json();
    return { errors };
  }
};

const initialState = {
  allServers: {},
  myServers: {},
};

const serversReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL_SERVERS: {
      newState = { ...state, allServers: action.payload };
      return newState;
    }
    case LOAD_SERVERS_BY_USER: {
      newState = { ...state, myServers: action.payload };
      return newState;
    }
    case CREATE_SERVER: {
      newState = { ...state };
    //   console.log("%C newState LOG>", "COLOR:BLUE; FONT-SIZE: 26PX", newState);
    //   console.log(
    //     action.payload,
    //     "ACTION PAYLOAD IN THE SERVERS REDUCER CREATE SERVER ########################################################################"
    //   );
      newState.allServers = {
        ...newState.allServers,
        [action.payload.id]: { ...action.payload },
      };
      newState.myServers = {
        ...newState.myServers,
        [action.payload.id]: { ...action.payload },
      };
      return newState;
    }
    case DELETE_SERVER: {
      newState = { ...state };
      delete newState.allServers[action.payload];
      delete newState.myServers[action.payload];
    //   const ultranewstate = { ...newState };
    console.log("new state is: ", newState);
      return newState;
    }
    case EDIT_SERVER: {
      newState = { ...state };
      newState.allServers[action.payload.id] = action.payload;
      newState.myServers[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default serversReducer;
