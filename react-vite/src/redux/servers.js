const LOAD_ALL_SERVERS = "servers/getAllServers";
const LOAD_SERVERS_BY_USER = "servers/getServersByUser";
const CREATE_SERVER = "servers/createNew";
const DELETE_SERVER = "servers/delete";
const EDIT_SERVER = "servers/edit";

const deleteServer = (serverId) => ({
  type: DELETE_SERVER,
  payload: serverId,
});

// const editServer = (server)

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

export const deleteServerThunk = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverId}/delete`);
  if (response.ok) {
    dispatch(deleteServer(serverId));
    return "successfully deleted";
  } else {
    const error = await response.json();
    return error;
  }
};

export const createServerThunk = (serverObj) => async (dispatch) => {
  const response = await fetch("api/servers/create", {
    method: "POST",
    body: serverObj,
  });
  if (response.ok) {
    data = await response.json();
    dispatch(createServer(data));
    return data;
  } else {
    const error = await response.json();
    return error;
  }
};

export const loadAllServersThunk = () => async (dispatch) => {
  const allServers = await fetch("api/servers/all");
  const data = await allServers.json();
  console.log("ALL SERVERS: ", data);
  dispatch(loadAllServers(data));
};

export const loadServersByUserThunk = (userId) => async (dispatch) => {
  const usersServers = await fetch(`api/servers/:${userId}`);
  dispatch(loadServersByUser(usersServers));
};

const initialState = {
  allServers: [],
  myServers: [],
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
      newState.allServers = { ...newState.allServers, ...action.payload };
      newState.myServers = { ...newState.allServers, ...action.payload };
    }
    case DELETE_SERVER: {
      newState = { ...state };
      delete newState.allServers[action.payload];
      delete newState.myServers[action.payload];
    }

    default:
      return state;
  }
};

export default serversReducer;
