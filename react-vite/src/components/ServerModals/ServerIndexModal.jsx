import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// Import thunk/action creator
// import { thunkServerIndex } from "../../redux/server";

function ServerIndexModal() {
  const dispatch = useDispatch();
  const [allServers, setAllServers] = useState([]);

  const { closeModal } = useModal();

  useEffect(() => {
    //call a thunk for get all servers, setServerArray with return
  }, []);

  //       Hover FOR ALL SERVER, JOIN OR observe, redirecr when clicked, AND closeModal();
  //       closeModal();

  return (
    <>
      <h1>all the servers bro, totally pick one</h1>s
      <ul>
        {allServers.map((server) => (
          <li key={server.id}>{server.name}</li>
        ))}
      </ul>
    </>
  );
}

export default ServerIndexModal;
