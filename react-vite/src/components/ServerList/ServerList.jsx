import "./ServerList.css";
import CreateServerModal from "../ServerModals/CreateServerModal";
import OpenFSModalButton from "../OpenFSModalButton";
import ServerIndexModal from "../ServerModals/ServerIndexModal";
import { useSelector, useDispatch } from "react-redux";
import {
  loadAllServersThunk,
  deleteServerFromSocket,
  loadServersByUserThunk,
} from "../../redux/servers";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
let socket;

const PreloadImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{ visibility: loaded ? "visible" : "hidden" }}
      className="server-icon"
    />
  );
};

export default function ServerList({ onSelectServer }) {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers?.myServers || {});
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [selectedServerId, setSelectedServerId] = useState(null);

  useEffect(() => {
    let socket_url = "http://127.0.0.1:8000";
    if (import.meta.env.MODE === "production") {
      socket_url = "https://babbl.onrender.com";
    }

    socket = io(socket_url);

    socket.on("delete_server", (serverId) => {
      dispatch(deleteServerFromSocket(serverId)).then(() => {
        dispatch(loadAllServersThunk());
        dispatch(loadServersByUserThunk(user.id));
      });
    });

    if (user) {
      dispatch(loadAllServersThunk());
      dispatch(loadServersByUserThunk(user.id));
    }

    return () => {
      socket.disconnect();
    };
  }, [dispatch, user]);

  //   // useEffect(() => {
  //   //   let socket_url = "http://127.0.0.1:8000";
  //   //   if (import.meta.env.MODE === "production") {
  //   //     socket_url = "https://babbl.onrender.com";
  //   //   }
  // <<<<<<< frontend-alex
  // =======

  // // <<<<<<< login_logout
  // //     let serverSocket = io(socket_url);
  // //     serverSocket.on("server", (a) => {
  // //       console.log(
  // //         "THIS IS ME CALLING THE LOAD ALL SERVERS THUNK IN THE SERVER LIST FILE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  // //       );
  // //       dispatch(loadAllServersThunk());
  // //     });
  // >>>>>>> weekendDEV

  //   //   serverSocket = io(socket_url);
  //   //   serverSocket.on("server", (a) => {
  //   //     console.log(
  //   //       "THIS IS ME CALLING THE LOAD ALL SERVERS THUNK IN THE SERVER LIST FILE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  //   //     );
  //   //     dispatch(loadAllServersThunk());
  //   //   });
  // <<<<<<< frontend-alex
  // =======
  // // >>>>>>> weekendDEV
  // >>>>>>> weekendDEV

  //   //   // socket.emit("server");

  // <<<<<<< frontend-alex
  //     // return () => {
  //     //   socket.disconnect();
  //     // };
  // =======
  //   //   // return () => {
  //   //   //   socket.disconnect();
  //   //   // };
  // >>>>>>> weekendDEV
  //   // });

  useEffect(() => {
    if (Object.values(servers).length > 0 && !selectedServerId) {
      const firstServer = servers[Object.keys(servers)[0]];
      setSelectedServerId(firstServer.id);
      onSelectServer(firstServer);
    }
    // if (servers.length > 0 && selectedServerId) {
    //     onSelectServer(servers[selectedServerId]);
    // }
    // else onSelectServer(servers[selectedServerId])
  }, [servers, selectedServerId, onSelectServer]);

  const handleServerClick = (server) => {
    setSelectedServerId(server.id);
    onSelectServer(server);
  };

  const handleNewServer = (newServer) => {
    setSelectedServerId(newServer.id);
    onSelectServer(newServer);
  };

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div className="server-list-container">
      <button className="logo-button">
        <img src="../../../babbl-logo.png" onClick={redirectHome} />
      </button>
      <div className="divider">{}</div>
      <div className="servers">
        {Object.values(servers).map((server) => (
          <div
            key={server.id}
            className={`server-item ${
              selectedServerId === server.id ? "selected" : ""
            }`}
            onClick={() => handleServerClick(server)}
          >
            {selectedServerId === server.id && (
              <div className="indicator"></div>
            )}
            <PreloadImage src={server.imageUrl} />
          </div>
        ))}
      </div>
      <div className="create-explore-container">
        <OpenFSModalButton
          buttonText={<i className="fa-solid fa-plus"></i>}
          modalComponent={<CreateServerModal onNewServer={handleNewServer} />}
          className="create-button"
        />
        <OpenFSModalButton
          buttonText={<i className="fa-solid fa-compass"></i>}
          modalComponent={<ServerIndexModal />}
          className="explore-button"
        />
      </div>
    </div>
  );
}
