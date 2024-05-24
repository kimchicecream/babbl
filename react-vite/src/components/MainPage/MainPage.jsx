import "./MainPage.css";
import ServerList from "../ServerList";
import ChannelList from "../ChannelList";
import MessageFeed from "../MessageFeed";
import ProfileManagement from "../ProfileManagement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelsByServerThunk } from "../../redux/channels";

function MainPage() {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels?.serverChannels || []);
    const [selectedServer, setSelectedServer] = useState({});
    const [selectedChannel, setSelectedChannel] = useState({});
    // const [isLoaded, setIsLoaded] = useState(false);

    // useEffect to keep the page from scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleServerSelect = (server) => {
        setSelectedServer(server);
        // setIsLoaded(false);
        dispatch(getChannelsByServerThunk(server.id));
    };

    useEffect(() => {
        if (channels.length > 0) {
            setSelectedChannel(channels[0]);
            // setIsLoaded(true);
        }
    }, [channels]);

    return (
        <div className="main-page-container">
            <div className="server-column">
                <ServerList onSelectServer={handleServerSelect} />
            </div>
            <div className="channel-column">
                {Object.keys(selectedServer).length !== 0 && (
                    <ChannelList
                        server={selectedServer}
                        onSelectChannel={setSelectedChannel}
                    />
                )}
                <div className="profile-container">
                    <ProfileManagement />
                </div>
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
