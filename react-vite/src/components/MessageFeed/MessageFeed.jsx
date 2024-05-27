import "./MessageFeed.css";
import Chat from "../testchatsocket/testchatsocket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByChannelThunk } from "../../redux/messages";

export default function MessageFeed({ channel, socket }) {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages || {});

    useEffect(() => {
        if (channel && channel.id) {
            dispatch(getMessagesByChannelThunk(channel.id));
        }
    }, [dispatch, channel]);

    const formatChannelName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    if (!channel || !channel.name) {
        return null; // or a loading indicator
    }

    return (
        <>
            <div className="message-feed-container">
                <div className="channel-header-container">
                    <span className="channel-name">
                        <span id='hash'>#</span>
                        <span id='channel-name'> {formatChannelName(channel.name)}</span>
                    </span>
                </div>
                <div className="message-feed">
                    <Chat initMessages={messages} channelId={channel.id} socket={socket} />
                </div>
                {/* {isMember ? (
                    <div className="input-field">
                        <button className="attach-button">
                            {/* <img ref={/* attach image icon *\/}></img>
                        </button>
                        <input></input>
                        <button className="reaction-button">
                            {/* <img ref={/* hash icon *\/}></img>
                        </button>
                    </div>
                ) : (
                    <div className="input-field">
                        <button className="join-button">
                            <p>Join to send Message!</p>
                        </button>
                    </div>
                )} */}
            </div>
            {/* <button
                className="show-member-list"
                // onClick={() => (showUserList = !showUserList)}
            ></button> */}
            {/* {showUserList ? <UserList /> : ""} */}
        </>
    );
}
