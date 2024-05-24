import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Message } from "./Message";
import "./testchatsocket.css";
let socket;

const Chat = ({ initMessages, channelId }) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState(Object.values(initMessages));
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
                        reactions: {},
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
        setMessages(Object.values(initMessages));
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
            reactions: {},
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
                            <Message message={message} index={ind} />
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
