import { getChannelsByServerThunk } from "../../redux/channels";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./ChannelList.css";

export default function ChannelList({ server, onSelectChannel }) {
    // write code here
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels?.serverChannels || []);
    const [selectedChannel, setSelectedChannel] = useState(null);

    useEffect(() => {
        dispatch(getChannelsByServerThunk(server.id));
    }, [dispatch, server]);

    useEffect(() => {
        if (channels.length > 0) {
            const firstChannel = channels[0];
            setSelectedChannel(firstChannel.id);
            onSelectChannel(firstChannel);
        }
    }, [channels, onSelectChannel]);

    const formatChannelName = (name) => {
        const formattedName = name.toLowerCase().replace(/\s+/g, '-');
        return formattedName.length > 20 ? `${formattedName.substring(0, 20)}...` : formattedName;
    };

    const handleChannelClick = (channel) => {
        setSelectedChannel(channel.id);
        onSelectChannel(channel);
    };

    return (
        <div className="channel-list-container">
            <div className="server-header-container">
                <span className="server-name">
                    {server.name}
                </span>
                <span className="dropdown"></span>
            </div>
            <div className="channels">
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        className={`channel-item ${selectedChannel === channel.id ? 'selected' : ''}`}
                        onClick={() => handleChannelClick(channel)}
                    >
                        <span>
                            <span id='hash'>#</span> {formatChannelName(channel.name)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
