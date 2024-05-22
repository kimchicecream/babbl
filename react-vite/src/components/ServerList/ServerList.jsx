import "./ServerList.css";
import CreateServerModal from "../ServerModals/CreateServerModal";
import OpenModalButton from "../OpenModalButton";
import ServerIndexModal from "../ServerModals/ServerIndexModal";
import { useSelector, useDispatch } from "react-redux";
import { loadAllServersThunk } from "../../redux/servers";
import React, { useEffect } from "react";

export default function ServerList() {
    const dispatch = useDispatch();
    const servers = useSelector((state) => state.servers?.allServers || []);

    useEffect(() => {
        dispatch(loadAllServersThunk());
    }, [dispatch]);

    return (
        <div className="server-list-container">
            <button className="logo-button">Logo</button>
            <div className="divider"></div>
            <div className="servers">
                {servers.map((server) => (
                    <div key={server.id} className="server-item">
                        <img src={server.imageUrl} alt={`${server.name}`}/>
                    </div>
                ))}
            </div>
            <div id="join-create-container">
                <OpenModalButton
                    buttonText="Explore"
                    modalComponent={<ServerIndexModal />}
                    className="create-button"
                />
                <OpenModalButton
                    buttonText="Create server"
                    modalComponent={<CreateServerModal />}
                    className="create-button"
                />
            </div>
        </div>
    );
}
