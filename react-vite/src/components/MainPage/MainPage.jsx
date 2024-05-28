import "./MainPage.css";
import ServerList from "../ServerList";
import ChannelList from "../ChannelList";
import MessageFeed from "../MessageFeed";
import ProfileManagement from "../ProfileManagement";
import LoadingPage from "../LoadingPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelsByServerThunk } from "../../redux/channels";
import { loadAllServersThunk } from "../../redux/servers";
let socket;

function MainPage() {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers.allServers || []);
  const channels = useSelector((state) => state.channels || []);
  const [selectedServer, setSelectedServer] = useState({});
  const [selectedChannel, setSelectedChannel] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect to keep the page from scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    dispatch(loadAllServersThunk());
    setLoading(false);
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

  if (loading) {
    return <LoadingPage />;
  }

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
