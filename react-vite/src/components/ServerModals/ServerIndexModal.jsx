import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFSModal } from "../../context/FullScreenModal";
import { loadAllServersThunk } from "../../redux/servers";
import { joinServerThunk } from "../../redux/memberships";
import "./ServerIndexModal.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ServerIndexModal() {
  const dispatch = useDispatch();
  const { closeModal } = useFSModal();
  const [joinClick, setJoinClick] = useState(false); // THIS IS JANK
  // a quick and extremely dirty way of triggering refresh to update the "join server" button visibility
  // note: triggers twice because the useEffect() modifies joinClick, thus the jank

  const servers = useSelector((state) => state.servers.allServers);
  // const members = useSelector((state) => state.servers.allServers[])
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadAllServersThunk());
    if (joinClick) setJoinClick(false); // JANK JANK JANK JANK JANK
  }, [dispatch, joinClick]);

  //       Hover FOR ALL SERVER, JOIN OR observe, redirecr when clicked, AND closeModal();
  //       closeModal();

  return (
    <div className="load-all-servers-container">
      <div className="header">
        <button className="close-button" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="header-image">
          <h1>Explore</h1>
          <img src="../../../explore-image.png" />
        </div>
      </div>
      <div className="all-servers-container">
        {servers.map((server) => (
          <div className="server-card" key={server.id}>
            <img src={server.imageUrl} />
            <div className="server-info">
              <div className="server-title">{server.name}</div>
              <div className="server-desc">{server.description}</div>
              {/* {console.log("server ", server, " userId: ", user.id, " creatorId: ", server.creatorId)} */}
              {!server.users.includes(user.id) && (
                <button
                  className="join-server-button"
                  onClick={() => {
                    dispatch(joinServerThunk(server.id));
                    closeModal();
                    console.log("SERVER CREATE THUNK CALLED IN CLICK");
                    setJoinClick(true); // SO FRICKEN JANK
                  }}
                >
                  Join Server
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServerIndexModal;
