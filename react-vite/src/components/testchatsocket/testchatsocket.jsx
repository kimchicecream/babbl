import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./testchatsocket.css";
let socket;

const reduceReactions = (reactions) => {
    const counts = reactions.reduce((counts, reaction) => {
        counts[reaction.emojiId.toString()] =
            (counts[reaction.emojiId.toString()] || 0) + 1;
        return counts;
    }, {});

    console.log("COUNTS", counts);
    const buttons = [];
    for (const [key, value] of Object.entries(counts)) {
        buttons.push(
            <button className="reaction-button">
                {/* TODO: change this to render emoji with emoji id "key" */}
                id {key}: {value}
            </button>
        );
    }

    return buttons;
};

const Chat = ({ initMessages, channelId }) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState(initMessages);
    const user = useSelector((state) => state.session.user);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        let socket_url = "http://127.0.0.1:8000";
        if (import.meta.env.MODE === "production") {
            socket_url = "https://babbl.onrender.com";
        }

        socket = io(socket_url);

        // does this happen on sending or receiving a message?
        socket.on("chat", (message) => {
            if (message.channelId === channelId) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        channelId,
                        message: message["msg"],
                        user: {
                            username: user.username,
                            id: user.id,
                            imageUrl: user.imageUrl,
                        },
                    },
                ]);
            }
        });

        return () => {
            socket.emit("leave", { channelId });
            socket.disconnect();
        };
    }, [channelId, user]);

    useEffect(() => {
        // loads messages from props if props change
        setMessages(initMessages);
    }, [initMessages]);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", {
            user: {
                username: user.username,
                id: user.id, // maybe this is not needed
                imageUrl: user.imageUrl,
            },
            msg: chatInput,
            channelId,
        });
        setChatInput("");
    };

    return (
        user && (
            <div className="chat-socket-container">
                <div
                    className="socket-messages-scroll"
                    ref={messagesContainerRef}
                >
                    <div className="messages-wrapper">
                        {messages.map((message, ind) => (
                            <div className="message-container" key={ind}>
                                {console.log(message)}
                                <div className="profile-pic-container">
                                    {message?.user?.imageUrl && (
                                        <img
                                            src={message.user.imageUrl}
                                            alt={"profile pic"}
                                        />
                                    )}
                                </div>
                                <div className="username-message-container">
                                    <div className="username-time-container">
                                        <span className="username">
                                            {message.user.username}
                                        </span>
                                        <span className="time"></span>
                                    </div>
                                    <div className="message-text">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                                <div className="message-mamangement-container">
                                    <div className="reactions">
                                        {message.reactions.length > 0 &&
                                            reduceReactions(message.reactions)}
                                    </div>
                                    <button className="edit"></button>
                                    <button className="delete"></button>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>

                <form className="input-field" onSubmit={sendChat}>
                    <input value={chatInput} onChange={updateChatInput} />
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    );
};

export default Chat;
