import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import serversReducer from "./servers";
import channelsReducer from "./channels";
import messagesReducer from "./messages";
import membershipsReducer from "./memberships";

const rootReducer = combineReducers({
  memberships: membershipsReducer,
  messages: messagesReducer,
  servers: serversReducer,
  channels: channelsReducer,
  session: sessionReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
