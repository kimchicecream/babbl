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

        socket.on("chat", (message) => {
            console.log("message contents: ", messages);
            setMessages([...messages, {
                channelId,
                message: message["msg"],
                user: { name: user.username, id: user.id, imageUrl: user.imageUrl }
            }]);
            // setMessages([...messages, message])
        });

        // socket.on("chat", (chat) => {
        //     setMessages((messages) => [...messages, chat]);
        // });

        // console.log(messages);
        // when component unmounts, disconnect
        // return () => {
        //   socket.disconnect();
        // };
    }, []);

    useEffect(() => {
        console.log("MESSAGES: ", messages);
    }, [messages])

    useEffect(() => {
        console.log("init changed: ", messages);
        setMessages(initMessages);
    }, [initMessages]);

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
                        <div className="message-container" key={ind}>
                            <div className="profile-pic-container">
                                {message?.user?.imageUrl && (
                                    <img
                                        ref={message.user.imageUrl}
                                        alt={"profile pic"}
                                    ></img>
                                )}
                            </div>
                            <div className="username-message-container">
                                <div className="username-time-container">
                                    <span className="username">
                                        {message.username}
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
