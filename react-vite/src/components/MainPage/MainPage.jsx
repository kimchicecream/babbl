import "./MainPage.css";
import ServerList from "../ServerList";
import ChannelList from "../ChannelList";
import MessageFeed from "../MessageFeed";
import ProfileManagement from "../ProfileManagement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelsByServerThunk } from "../../redux/channels";
import { loadAllServersThunk } from "../../redux/servers";
import { io } from "socket.io-client";
let socket;

function MainPage() {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers.allServers || []);
  const channels = useSelector((state) => state.channels || []);
  const [selectedServer, setSelectedServer] = useState({});
  const [selectedChannel, setSelectedChannel] = useState({});

  // useEffect to keep the page from scrolling
  useEffect(() => {
    let socket_url = "http://127.0.0.1:8000";
    if (import.meta.env.MODE === "production") {
        socket_url = "https://babbl.onrender.com";
    }

    socket = io(socket_url);

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    dispatch(loadAllServersThunk());
  }, [dispatch]);

  // useEffect to select the first server on intial load of MainPage
  useEffect(() => {
    if (Object.values(servers).length > 0 && !selectedServer) {
      const firstServer = servers[Object.keys(servers)[0]];
      setSelectedServer(firstServer);
      dispatch(getChannelsByServerThunk(firstServer.id));
    }
  }, [servers, selectedServer, dispatch]);

  useEffect(() => {
    if (Object.keys(channels).length > 0) {
      setSelectedChannel(channels[Object.keys(channels)[0]]);
    }
  }, [channels]);

  const handleServerSelect = (server) => {
    setSelectedServer(server);
    dispatch(getChannelsByServerThunk(server.id));
  };

  return (
    <div className="main-page-container">
      <div className="server-column">
        <ServerList onSelectServer={handleServerSelect} />
      </div>
      <div className="channel-column">
        {selectedServer && (
          <ChannelList
            server={selectedServer}
            onSelectChannel={setSelectedChannel}
            onSelectServer={handleServerSelect}
          />
        )}
        <div className="profile-container">
          <ProfileManagement />
        </div>
      </div>
      <div className="message-feed-column">
        {selectedChannel && <MessageFeed channel={selectedChannel} socket={socket} />}
      </div>
    </div>
  );
}

export default MainPage;
