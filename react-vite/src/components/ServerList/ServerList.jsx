import "./ServerList.css";
import CreateServerModal from "../ServerModals/CreateServerModal";
import OpenFSModalButton from "../OpenFSModalButton";
import ServerIndexModal from "../ServerModals/ServerIndexModal";
import { useSelector, useDispatch } from "react-redux";
import { loadAllServersThunk } from "../../redux/servers";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
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
  const servers = useSelector((state) => state.servers?.allServers || []);
  const [selectedServerId, setSelectedServerId] = useState(null);

  useEffect(() => {
    dispatch(loadAllServersThunk());
  }, [dispatch]);

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
    if (servers.length > 0 && !selectedServerId) {
      const firstServer = servers[0];
      setSelectedServerId(firstServer.id);
      onSelectServer(firstServer);
    }
    // if (servers.length > 0 && selectedServerId) {
    //     onSelectServer(servers[selectedServerId]);
    // }
    // else onSelectServer(servers[selectedServerId])
    // console.log('in the use effect: ', selectedServerId)
  }, [servers, selectedServerId, onSelectServer]);

  const handleServerClick = (server) => {
    setSelectedServerId(server.id);
    onSelectServer(server);
  };

  return (
    <div className="server-list-container">
      <button className="logo-button">
        <img src="../../../babbl-logo.png" />
      </button>
      <div className="divider"></div>
      <div className="servers">
        {servers.map((server) => (
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
            <PreloadImage src={server.imageUrl} alt={`${server.name}`} />
          </div>
        ))}
      </div>
      <div className="create-explore-container">
        <OpenFSModalButton
          buttonText={<i className="fa-solid fa-plus"></i>}
          modalComponent={
            <CreateServerModal
              setSelectedServerId={setSelectedServerId}
              onSelectServer={onSelectServer}
            />
          }
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
