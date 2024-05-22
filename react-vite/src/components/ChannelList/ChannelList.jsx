import { getChannelsByServerThunk } from "../../redux/channels";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./ChannelList.css";

export default function ChannelList({ server }) {
    // write code here
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels?.serverChannels || []);

    useEffect(() => {
        dispatch(getChannelsByServerThunk(server.id));
    }, [dispatch, server]);

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
                    <div key={channel.id} className="channel-item">
                        <span>{channel.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
