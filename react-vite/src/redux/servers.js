const LOAD_ALL_SERVERS = "servers/getAllServers";
const LOAD_SERVERS_BY_USER = "servers/getServersByUser";

const loadAllServers = (servers) => ({
  type: LOAD_ALL_SERVERS,
  payload: servers,
});

const loadServersByUser = (servers) => ({
  type: LOAD_SERVERS_BY_USER,
  payload: servers,
});

export const loadAllServersThunk = () => async (dispatch) => {
  const allServers = await fetch("api/servers/all");
  dispatch(loadAllServers(allServers));
};

export const loadServersByUserThunk = (userId) => async (dispatch) => {
  const usersServers = await fetch(`api/servers/:${userId}`);
  dispatch(loadServersByUser(usersServers));
};

const serversReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL_SERVERS: {
      newState = { ...state };
      newState.servers = action.payload.servers;
      return newState;
    }
    case LOAD_SERVERS_BY_USER: {
      newState = { ...state };
      newState.myServers = action.payload.servers;
    }

    default:
      return state;
  }
};

export default serversReducer;
