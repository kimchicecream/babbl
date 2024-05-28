import { useDispatch } from "react-redux";
import { deleteMessageThunk } from "../../redux/messages";
import { useModal } from "../../context/Modal";
import './DeleteMessageModal.css'

function DeleteMessageModal({ message, username, userImage, messageId, socket }) {
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

    return (
        <div className="delete-message-modal">
            <div className="top">
                <h2>Delete Message</h2>
                <p> Are you sure you want to delete this message?</p>
                <div className="message-display">
                    <img src={userImage}/>
                    <div className="username-message">
                        <p id='username'>{username}</p>
                        <p id='message'>{message}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className='cancel-button' onClick={closeModal}>Cancel</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteMessageModal;
