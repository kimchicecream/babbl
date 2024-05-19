import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteChannelThunk } from "../../store/channels";
// import "./DeleteChannelModal.css";

function DeleteChannelModal({ channelId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteChannelThunk(channelId));
    closeModal();
    return;
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  return (
    <div className="delete-modal-container">
      <h1 id="modaltitles">Are You Sure?</h1>
      <button type="submit" onClick={handleSubmit} className="delete">
        yes, delete
      </button>
      <button type="submit" onClick={cancelDelete} className="cancel">
        Go Back
      </button>
    </div>
  );
}

export default DeleteChannelModal;
