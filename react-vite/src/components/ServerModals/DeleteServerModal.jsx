import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteServerThunk } from "../../redux/servers";
import "./DeleteServerModal.css";

function DeleteServerModal({
  server,
  onSelectServer,
  onSelectChannel
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(deleteServerThunk(server.id));
    closeModal();
    onSelectChannel();
    onSelectServer();
    return;
  };

  return (
    <div className="delete-server-modal">



      <div className="top">
        <h2>Delete server</h2>
        <p>Are you sure you want to delete this server?</p>
        <div className="server-display">
          <div className="image-server">
            <img src={server.imageUrl}/>
            <h2>{server.name}</h2>
          </div>
        </div>
        <p>Once you delete, it will be gone forever.</p>
      </div>


      <div className="button-container">
          <button onClick={closeModal} className="cancel-button">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="delete-button">Delete</button>
      </div>



    </div>
  );
}

export default DeleteServerModal;
