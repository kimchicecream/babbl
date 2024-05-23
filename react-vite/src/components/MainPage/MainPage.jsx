import "./MainPage.css";
import ServerList from "../ServerList";
import ChannelList from "../ChannelList";
import MessageFeed from "../MessageFeed";
import ProfileManagement from "../ProfileManagement";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

function MainPage() {
    // const channels = useSelector((state) => state.channels?.serverChannels);
    const [selectedServer, setSelectedServer] = useState({});
    const [selectedChannel, setSelectedChannel] = useState({});
    // useEffect to keep the page from scrolling

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // useEffect(() => {
    //     if (channels.length) setSelectedServer(channels[0])
    // }, [channels])

    // useEffect(() => {
    //     if (!channels.length)
    // })

    return (
        <div className="main-page-container">
            <div className="server-column">
                <ServerList onSelectServer={setSelectedServer} />
            </div>
            <div className="channel-column">
                {Object.keys(selectedServer).length !== 0 && (
                    <ChannelList
                        server={selectedServer}
                        onSelectChannel={setSelectedChannel}
                    />
                )}
                <ProfileManagement />
            </div>
            <div className="message-feed-column">
                {Object.keys(selectedChannel).length !== 0 && (
                    <MessageFeed channel={selectedChannel} />
                )}
            </div>
        </div>
    );
}

export default MainPage;
