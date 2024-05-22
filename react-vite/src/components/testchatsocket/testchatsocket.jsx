import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./testchatsocket.css";
let socket;

const Chat = ({ initMessages, channelId }) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState(initMessages);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        // open socket connection
        // create websockets
        let socket_url = "http://127.0.0.1:8000";

        if (import.meta.env.MODE === "production") {
            socket_url = "https://babbl.onrender.com";
        }

        socket = io(socket_url);

        socket.on("chat", (chat) => {
            setMessages((messages) => [...messages, chat]);
        });
        // when component unmounts, disconnect
        // return () => {
        //   socket.disconnect();
        // };
    }, []);

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
            <div>
                <div className="socket-messages-scroll">
                    {messages.map((message, ind) => (
                        <div
                            key={ind}
                        >{`${message.user.name}: ${message.msg}`}</div>
                    ))}
                    <h1>ABOVE THIS WE GON SEE MESSAGES</h1>
                </div>
                <form onSubmit={sendChat}>
                    <input value={chatInput} onChange={updateChatInput} />
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    );
};

export default Chat;
