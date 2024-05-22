import "./MessageFeed.css";
import Message from "../Message";
import Chat from "../testchatsocket/testchatsocket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByChannelThunk } from "../../redux/messages";

export default function MessageFeed({ channel }) {
    // write code here
    const dispatch = useDispatch();
    const messages = useSelector(
        (state) => state.messages?.channelMessages || []
    );

    useEffect(() => {
        dispatch(getMessagesByChannelThunk(channel.id));
    }, [dispatch, channel]);

    return (
        <>
            <div className="message-feed-container">
                <Chat initMessages={messages} channelId={channel.id} />
                <div className="channel-header-container">
                    {/* <img ref={/* hash icon *\/}></img> */}
                    <span className="channel-name"></span>
                </div>
                <div className="message-feed">
                    {/* get message component + map */}
                    <Message />
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
            <button
                className="show-member-list"
                // onClick={() => (showUserList = !showUserList)}
            ></button>
            {/* {showUserList ? <UserList /> : ""} */}
        </>
    );
}
