import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteChannelThunk } from "../../redux/channels";
import "./DeleteChannelModal.css";

function DeleteChannelModal({ channel, channelId, socket }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteChannelThunk(channel.id)).then(() => {
            socket.emit("delete_channel", channel.id);
        });
        closeModal();
        return;
    };

    return (
        <div className="delete-channel-modal">
            <div className="top">
                <h2>Delete channel</h2>
                <p>Are you sure you want to delete this channel?</p>
                <div className="channel-display">
                    <i className="fa-solid fa-hashtag"></i>
                    {channel.name}
                </div>
                <p>This cannot be undone.</p>
            </div>
            <div className="button-container">
                <button onClick={closeModal} className="cancel-button">Cancel</button>
                <button type="submit" onClick={handleSubmit} className="delete-button">Delete</button>
            </div>
        </div>
    );
}

export default DeleteChannelModal;
