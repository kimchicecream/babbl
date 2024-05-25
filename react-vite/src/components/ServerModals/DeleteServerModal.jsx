import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteServerThunk } from "../../redux/servers";
// import { deleteServerThunk } from "../../store/servers";
// import "./DeleteServerModal.css";

function DeleteServerModal({ serverId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteServerThunk(serverId));
    closeModal();
    return;
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  return (
    <div className="delete-modal-container">
      <div className="form-container">
        <h1 id="modaltitles">Are You Sure?</h1>

        <button type="submit" onClick={handleSubmit} className="delete">
          yes, delete
        </button>
        <button type="submit" onClick={cancelDelete} className="cancel">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default DeleteServerModal;
