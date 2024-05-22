import "./MainPage.css";
import ServerList from "../ServerList";
import ChannelList from "../ChannelList";
import MessageFeed from "../MessageFeed";
import ProfileManagement from "../ProfileManagement";
import React, { useEffect, useState } from "react";

function MainPage() {
    const [selectedServer, setSelectedServer] = useState({});
    const [selectedChannel, setSelectedChannel] = useState(null)
    // useEffect to keep the page from scrolling

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="main-page-container">
            <div className="server-column">
                <ServerList onSelectServer={setSelectedServer} />
            </div>
            <div className="channel-column">
                <ChannelList server={selectedServer} onSelectChannel={setSelectedChannel} />
                <ProfileManagement />
            </div>
            <div className="message-feed-column">
                <MessageFeed channel={selectedChannel} />
            </div>
        </div>
    );
}

export default MainPage;
