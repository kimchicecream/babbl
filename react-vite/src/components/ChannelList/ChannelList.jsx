import {
    getChannelsByServerThunk,
    createChannelFromSocket,
    deleteChannelFromSocket,
    editChannelFromSocket,
} from "../../redux/channels";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteServerModal from "../ServerModals/DeleteServerModal";
import UpdateServerModal from "../ServerModals/UpdateServerModal";
import UpdateChannelModal from "../ChannelModals/UpdateChannelModal";
import DeleteChannelModal from "../ChannelModals/DeleteChannelModal";
import OpenFSModalButton from "../OpenFSModalButton";
import CreateChannelModal from "../ChannelModals/CreateChannelModal";
import io from "socket.io-client";
import "./ChannelList.css";
let socket;

export default function ChannelList({
    server,
    onSelectChannel,
    onSelectServer,
}) {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels || {});
    const user = useSelector((state) => state.session.user);
    const [selectedChannel, setSelectedChannel] = useState(null);

    useEffect(() => {
        dispatch(getChannelsByServerThunk(server.id));
    }, [dispatch, server.id]);

    useEffect(() => {
        if (Object.keys(channels).length > 0) {
            // onSelectServer(server);
            const firstChannel = channels[Object.keys(channels)[0]];
            setSelectedChannel(firstChannel.id);
            onSelectChannel(firstChannel);
        }
    }, [channels, onSelectChannel]);

    useEffect(() => {
        let socket_url = "http://127.0.0.1:8000";
        if (import.meta.env.MODE === "production") {
            socket_url = "https://babbl.onrender.com";
        }

        socket = io(socket_url);

        socket.on("create_channel", (channel) => {
            dispatch(createChannelFromSocket(channel));
        });

        socket.on("delete_channel", (channelId) => {
            dispatch(deleteChannelFromSocket(channelId));
        });

        socket.on("update_channel", (channel) => {
            dispatch(editChannelFromSocket(channel));
        });
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
                {server.creatorId === user.id && (
                    <>
                        <OpenModalButton
                            buttonText={"Edit a server"}
                            modalComponent={
                                <UpdateServerModal
                                    server={server}
                                    onSelectServer={onSelectServer}
                                    onSelectChannel={onSelectChannel}
                                    selectedChannel={selectedChannel}
                                />
                            }
                            className="edit-server-button"
                        />
                        <OpenModalButton
                            buttonText={"Delete a server"}
                            modalComponent={
                                <DeleteServerModal
                                    serverId={server.id}
                                    onSelectServer={onSelectServer}
                                    onSelectChannel={onSelectChannel}
                                    selectedChannel={selectedChannel}
                                />
                            }
                            className="delete-server-button"
                        />
                    </>
                )}
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
                            <span id="hash">#</span>{" "}
                            {formatChannelName(channel.name)}
                            {server.creatorId === user.id && (
                                <>
                                    <OpenModalButton
                                        buttonText={"Edit channel"}
                                        modalComponent={
                                            <UpdateChannelModal
                                                channel={channel}
                                                socket={socket}
                                            />
                                        }
                                        className="create-channel-button"
                                    />
                                    <OpenModalButton
                                        buttonText={"Delete channel"}
                                        modalComponent={
                                            <DeleteChannelModal
                                                channelId={channel.id}
                                                socket={socket}
                                            />
                                        }
                                        className="create-channel-button"
                                    />
                                </>
                            )}
                        </span>
                    </div>
                ))}
                {user.id === server.creatorId && (
                    <OpenFSModalButton
                        buttonText={"Create a Channel"}
                        modalComponent={
                            <CreateChannelModal
                                server={server}
                                socket={socket}
                            />
                        }
                        className="create-channel-button"
                    />
                )}
            </div>
        </div>
    );
}
