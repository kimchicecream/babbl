import { getChannelsByServerThunk } from "../../redux/channels";
import { useSelector, useDispatch } from "react-redux";
import OpenFSModalButton from "../OpenFSModalButton";
import CreateChannelModal from "../ChannelModals/CreateChannelModal";
import { useEffect, useState } from "react";
import "./ChannelList.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteServerModal from "../ServerModals/DeleteServerModal";
import UpdateServerModal from "../ServerModals/UpdateServerModal";

export default function ChannelList({
  server,
  onSelectChannel,
  onSelectServer,
}) {
  // write code here
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels || {});
  const user = useSelector((state) => state.session.user);
  const [selectedChannel, setSelectedChannel] = useState(null);

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
        {/* <span className="dropdown"></span> */}

        <OpenModalButton
          buttonText={"Edit a server"}
          modalComponent={<UpdateServerModal server={server} />}
          className="create-channel-button"
        />
        <OpenModalButton
          buttonText={"Delete a server"}
          modalComponent={<DeleteServerModal serverId={server.id} />}
          className="create-channel-button"
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
