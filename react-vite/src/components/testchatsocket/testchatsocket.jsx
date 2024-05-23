import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ReactionsList } from "./reactionsList";
import "./testchatsocket.css";
let socket;

const reduceReactions = (reactions) => {
    const counts = reactions.reduce((counts, reaction) => {
        counts[reaction.emojiId.toString()] =
            (counts[reaction.emojiId.toString()] || 0) + 1;
        return counts;
    }, {});

    const buttons = [];
    // map counts to actual reaction buttons
    for (const [key, count] of Object.entries(counts)) {
        buttons.push(
            <button className="reaction-button">
                {/* TODO: change this to render emoji with emoji id "key" */}
                {renderEmoji(key)} {count}
            </button>
        );
    }

    return buttons;
};

// TODO: refactor into a list in a diff file maybe
const renderEmoji = (id) => {
    return [
        <span key={0}>&#128512;</span>,
        <span key={1}>&#128513;</span>,
        <span key={2}>&#128514;</span>,
        <span key={3}>&#128515;</span>,
        <span key={4}>&#128516;</span>,
        <span key={5}>&#128517;</span>,
        <span key={6}>&#128518;</span>,
        <span key={7}>&#128519;</span>,
        <span key={8}>&#128520;</span>,
        <span key={9}>&#128521;</span>,
        <span key={10}>&#128522;</span>,
    ][id];
};

const Chat = ({ initMessages, channelId }) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState(initMessages);
    const [showReactionsMenu, setShowMenu] = useState(false);
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
                        reactions: [],
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
            reactions: [],
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
                                    {message.reactions.length > 0 && (
                                        <div className="reactions">
                                            {message.reactions.length > 0 &&
                                                reduceReactions(
                                                    message.reactions
                                                )}
                                        </div>
                                    )}
                                </div>
                                <div className="message-management-container">
                                    <button
                                        className="reactions"
                                        onClick={() =>
                                            setShowMenu(!showReactionsMenu)
                                        }
                                    ></button>
                                    <button className="edit"></button>
                                    <button className="delete"></button>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                        {/* TODO: make buttons add reactions CHRIS MORNING */}
                        {showReactionsMenu && <ReactionsList />}
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
