import "./MainPage.css";
import ServerList from "../ServerList";
import ChannelList from "../ChannelList";
import MessageFeed from "../MessageFeed";
import ProfileManagement from "../ProfileManagement";
import React, { useEffect, useState } from "react";

function MainPage() {
    const [selectedServer, setSelectedServer] = useState({});
    console.log("SELECTED SERVER: ", selectedServer)
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
                <ChannelList server={selectedServer} />
                <ProfileManagement />
            </div>
            <div className="message-feed-column">
                <MessageFeed />
            </div>
        </div>
    );
}

export default MainPage;
