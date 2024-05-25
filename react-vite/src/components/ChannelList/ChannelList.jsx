import { getChannelsByServerThunk } from "../../redux/channels";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteServerModal from "../ServerModals/DeleteServerModal";
import UpdateServerModal from "../ServerModals/UpdateServerModal";
import UpdateChannelModal from "../ChannelModals/UpdateChannelModal";
import DeleteChannelModal from "../ChannelModals/DeleteChannelModal";
import OpenFSModalButton from "../OpenFSModalButton";
import CreateChannelModal from "../ChannelModals/CreateChannelModal";
import io from 'socket.io-client';
import "./ChannelList.css";


let socket;

export default function ChannelList({ server, onSelectChannel }) {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels || {});
  const user = useSelector((state) => state.session.user);
  const [selectedChannel, setSelectedChannel] = useState(null);

  
//   BELOW IS WHQAT WAS THERE BEFORE I MERGED IN FRONTEND ALEX
  
  
// // <<<<<<< alex-work
// export default function ChannelList({ server, onSelectChannel }) {
//     const dispatch = useDispatch();
//     const channels = useSelector((state) => state.channels?.serverChannels || []);
//     const [selectedChannel, setSelectedChannel] = useState(null);
// // export default function ChannelList({
// //   server,
// //   onSelectChannel,
// //   onSelectServer,
// // }) {
// //   // write code here
// //   const dispatch = useDispatch();
// //   const channels = useSelector((state) => state.channels || {});
// //   const user = useSelector((state) => state.session.user);
// //   const [selectedChannel, setSelectedChannel] = useState(null); >>>>>>> weekendDEV


  useEffect(() => {
    dispatch(getChannelsByServerThunk(server.id));
  }, [dispatch, server]);

  useEffect(() => {
    if (Object.keys(channels).length > 0) {
      // onSelectServer(server);
      const firstChannel = channels[Object.keys(channels)[0]];
      setSelectedChannel(firstChannel.id);
      onSelectChannel(firstChannel);
    }
  }, [channels, onSelectChannel]);

  // socket listener
  useEffect(() => {
    let socket_url = "http://127.0.0.1:8000";
      if (import.meta.env.MODE === "production") {
        socket_url = "https://babbl.onrender.com";
      }
      socket = io(socket_url);

      socket.on('channel_created', (channel) => {
        dispatch(createChannel(channel));
      });

      socket.on('channel_updated', (channel) => {
        dispatch(editChannel(channel));
      });

      socket.on('channel_deleted', ({ id }) => {
        dispatch(deleteChannel(id));
      });

      return () => {
        socket.disconnect();
      };
  }, [dispatch]);

  const formatChannelName = (name) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    return formattedName.length > 20
      ? `${formattedName.substring(0, 20)}...`
      : formattedName;
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel.id);
    onSelectChannel(channel);
  };

  return (
    <div className="channel-list-container">
      <div className="server-header-container">
        <span className="server-name">{server.name}</span>
          <OpenModalButton
            buttonText={"Edit a server"}
            modalComponent={<UpdateServerModal server={server} />}
            className="edit-server-button"
          />
          <OpenModalButton
            buttonText={"Delete a server"}
            modalComponent={<DeleteServerModal serverId={server.id} />}
            className="delete-server-button"
          />
      </div>
      <div className="channels">
        {Object.values(channels).map((channel) => (
          <div
            key={channel.id}
            className={`channel-item ${
              selectedChannel === channel.id ? "selected" : ""
            }`}
            onClick={() => handleChannelClick(channel)}
          >
            <span>
              <span id="hash">#</span> {formatChannelName(channel.name)}
              <OpenModalButton
                buttonText={"Edit channel"}
                modalComponent={<UpdateChannelModal channel={channel} />}
                className="create-channel-button"
              />
              <OpenModalButton
                buttonText={"Delete channel"}
                modalComponent={<DeleteChannelModal channelId={channel.id} />}
                className="create-channel-button"
              />
            </span>
          </div>
        ))}
        {user.id === server.creatorId && (
          <OpenFSModalButton
            buttonText={"Create a Channel"}
            modalComponent={<CreateChannelModal server={server} />}
            className="create-channel-button"
          />
        )}
      </div>
    </div>
  );
}
