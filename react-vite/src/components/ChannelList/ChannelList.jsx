import {
    getChannelsByServerThunk,
    createChannelFromSocket,
    deleteChannelFromSocket,
    editChannelFromSocket,
} from "../../redux/channels";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteServerModal from "../ServerModals/DeleteServerModal";
import UpdateServerModal from "../ServerModals/UpdateServerModal";
import UpdateChannelModal from "../ChannelModals/UpdateChannelModal";
import DeleteChannelModal from "../ChannelModals/DeleteChannelModal";
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
    const [showServerMenu, setShowServerMenu] = useState(false);
    const [showChannelMenu, setShowChannelMenu] = useState(false);
    const serverMenuRef = useRef();
    const channelMenuRef = useRef();

    useEffect(() => {
        if (server?.id) dispatch(getChannelsByServerThunk(server.id));
    }, [dispatch, server.id]);

    useEffect(() => {
        if (
            selectedChannel?.serverId !== server?.id &&
            Object.keys(channels).length > 0
        ) {
            const firstChannel = channels[Object.keys(channels)[0]];
            setSelectedChannel(firstChannel);
            onSelectChannel(firstChannel);
        }
    }, [channels, onSelectChannel, selectedChannel, server]);

    useEffect(() => {
        let socket_url = "http://127.0.0.1:8000";
        if (import.meta.env.MODE === "production") {
            socket_url = "https://babbl.onrender.com";
        }

        socket = io(socket_url);

        socket.on("create_channel", (channel) => {
            console.log("THE CHANNEL IS", channel);
            if (channel?.serverId === server?.id) {
                dispatch(createChannelFromSocket(channel));
            }
        });

        socket.on("delete_channel", (channelId) => {
            dispatch(deleteChannelFromSocket(channelId));
        });

        socket.on("update_channel", (channel) => {
            if (channel?.serverId === server?.id) {
                dispatch(editChannelFromSocket(channel));
            }
        });

        return () => socket.disconnect();
    }, [dispatch]);

    const formatChannelName = (name) => {
        const formattedName = name.toLowerCase().replace(/\s+/g, "-");
        return formattedName.length > 15
            ? `${formattedName.substring(0, 15)}...`
            : formattedName;
    };

    const handleChannelClick = (channel) => {
        setSelectedChannel(channel);
        onSelectChannel(channel);
        setShowChannelMenu(false);
    };

    // SERVER MENU
    const toggleServerMenu = (e) => {
        e.stopPropagation();
        setShowServerMenu(!showServerMenu);
    };

    useEffect(() => {
        if (!showServerMenu) return;

        const closeMenu = (e) => {
            if (
                serverMenuRef.current &&
                !serverMenuRef.current.contains(e.target)
            ) {
                setShowServerMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showServerMenu]);

    // CHANNEL MENU
    const toggleChannelMenu = (channelId, e) => {
        e.stopPropagation();
        setShowChannelMenu((prev) => (prev === channelId ? null : channelId));
    };

    useEffect(() => {
        if (!showChannelMenu) return;

        const closeMenu = (e) => {
            if (
                channelMenuRef.current &&
                !channelMenuRef.current.contains(e.target)
            ) {
                setShowChannelMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showChannelMenu]);

    const featureComingSoon = () => {
        alert("Feature coming soon!");
    };

    return (
        <div className="channel-list-container">
            <div
                className={`server-header-container ${
                    showServerMenu ? "active" : ""
                }`}
                onClick={toggleServerMenu}
            >
                <span className="server-name">{server.name}</span>
                {/* <<<<<<< frontend-alex */}
                <i className="fa-solid fa-caret-down"></i>
                {showServerMenu && (
                    <div className="server-dropdown" ref={serverMenuRef}>
                        {server.creatorId === user.id ? (
                            <div className="options">
                                <OpenModalButton
                                    buttonText={"Create Channel"}
                                    modalComponent={
                                        <CreateChannelModal
                                            server={server}
                                            socket={socket}
                                        />
                                    }
                                    className="create-channel-button"
                                />
                                <div className="divider"></div>
                                <OpenModalButton
                                    buttonText={"Edit Server"}
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
                                <div className="divider"></div>
                                <OpenModalButton
                                    buttonText={"Delete Server"}
                                    modalComponent={
                                        <DeleteServerModal
                                            serverId={server.id}
                                            server={server}
                                            socket={socket}
                                            onSelectServer={onSelectServer}
                                            onSelectChannel={onSelectChannel}
                                            selectedChannel={selectedChannel}
                                        />
                                    }
                                    className="delete-server-button"
                                />
                            </div>
                        ) : (
                            <div className="options">
                                <button className="leave-server-button" onClick={featureComingSoon}>
                                    Leave Server
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="channels">
                {Object.values(channels).map((channel) => (
                    <div
                        key={channel.id}
                        // <<<<<<< frontend-alex
                        className={`channel-item ${
                            selectedChannel?.id === channel.id ? "selected" : ""
                        }`}
                        onClick={() => handleChannelClick(channel)}
                    >
                        <div className="individual-channels">
                            <div className="hash-name">
                                <span id="hash">#</span>{" "}
                                <div className="channel-name">
                                    {formatChannelName(channel.name)}
                                </div>
                            </div>
                            {server.creatorId === user.id && (
                                <>
                                    <i
                                        className={`fa-solid fa-gear ${
                                            selectedChannel === channel.id
                                                ? "visible"
                                                : ""
                                        }`}
                                        onClick={(e) =>
                                            toggleChannelMenu(channel.id, e)
                                        }
                                    />
                                    <div
                                        className="channel-dropdown"
                                        ref={channelMenuRef}
                                    >
                                        {showChannelMenu === channel.id && (
                                            <div className="options">
                                                <OpenModalButton
                                                    buttonText={"Edit channel"}
                                                    modalComponent={
                                                        <UpdateChannelModal
                                                            channel={channel}
                                                            socket={socket}
                                                        />
                                                    }
                                                    className="edit-channel-button"
                                                />
                                                <div className="divider"></div>
                                                {channel.id !==
                                                    Object.values(channels)[0]
                                                        .id && (
                                                    <OpenModalButton
                                                        buttonText={
                                                            "Delete channel"
                                                        }
                                                        modalComponent={
                                                            <DeleteChannelModal
                                                                channelId={channel.id}
                                                                channel={channel}
                                                                socket={socket}
                                                            />
                                                        }
                                                        className="delete-channel-button"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
