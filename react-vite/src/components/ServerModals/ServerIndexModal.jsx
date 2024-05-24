import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFSModal } from "../../context/FullScreenModal";
import { loadAllServersThunk } from "../../redux/servers";
import './ServerIndexModal.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ServerIndexModal() {
  const dispatch = useDispatch();
  const { closeModal } = useFSModal();

  const servers = useSelector((state) => state.servers.allServers);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
      dispatch(loadAllServersThunk());
  }, [dispatch]);

  //       Hover FOR ALL SERVER, JOIN OR observe, redirecr when clicked, AND closeModal();
  //       closeModal();

  return (
    <div className="load-all-servers-container">
      <div className="header">
        <button className='close-button' onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="header-image">
          <h1>Explore</h1>
          <img src='../../../public/explore-image.png' />
        </div>

      </div>
      <div className="all-servers-container">
        {servers.map((server) => (
          <div className='server-card' key={server.id}>
            <img src={server.imageUrl} />
              <div className="server-info">
                <div className="server-title">
                  {server.name}
                </div>
                <div className="server-desc">
                  {server.description}
                </div>
                {user.id !== server.creatorId && (
                    <button className="join-server-button">Join Server</button>
                )}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServerIndexModal;
