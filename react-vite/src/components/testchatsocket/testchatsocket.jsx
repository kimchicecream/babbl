import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./testchatsocket.css";
let socket;

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

        socket.on("chat", (message) => {
            if (message.channelId === channelId) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        channelId,
                        message: message["msg"],
                        user: {
                            name: user.username,
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
        console.log("MESSAGES: ", messages);
    }, [messages]);

    useEffect(() => {
        console.log("init changed: ", messages);
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
            user: { name: user.username, id: user.id, imageUrl: user.imageUrl },
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
                                <div className="profile-pic-container">
                                    {message?.user?.imageUrl && (
                                        <img
                                            src={message.user.imageUrl}
                                            alt={"profile pic"}
                                        ></img>
                                    )}
                                </div>
                                <div className="username-message-container">
                                    <div className="username-time-container">
                                        <span className="username">
                                            {/* {message.username} */}username
                                        </span>
                                        <span className="time"></span>
                                    </div>
                                    <div className="message-text">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                                <div className="message-mamangement-container">
                                    <button className="reactions"></button>
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
