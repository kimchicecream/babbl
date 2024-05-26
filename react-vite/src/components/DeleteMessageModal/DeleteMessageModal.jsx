import { useDispatch } from "react-redux";
import { deleteMessageThunk } from "../../redux/messages";
import { useModal } from "../../context/Modal";
import './DeleteMessageModal.css'

function DeleteMessageModal({ messageId, socket}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteMessageThunk(messageId))
            .then(() => {
                socket.emit('delete_message', messageId)
            })
        closeModal();
        return;
    }

    const cancelDelete = (e) => {
        e.preventDefault();
        dispatch(closeModal());
    }

    return (
        <div className="delete-message-modal">
            <h2>Delete Message</h2>
            <p> Are you sure you want to delete this message?</p>
            <div className="message-getting-deleted">
                <span></span>
            </div>
            <div className="delete-button">
                <button className='cancel-button' onClick={cancelDelete}>Cancel</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteMessageModal;
