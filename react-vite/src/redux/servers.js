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
    const data = await allServers.json()
    console.log("ALL SERVERS: ", data)
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
        default:
            return state;
    }
};

export default serversReducer;
