import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createChannelThunk } from "../../redux/channels";
import './CreateChannelModal.css';

function CreateChannelModal({ server, socket }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector((state) => state.session.user);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //DESTRUCTURE USER DATA TO COMPLETE OBJECT??
        //validates user and sign in and token and all good thins

        const newChannelObj = {
            name,
            serverId: server.id,
            creatorId: sessionUser.id,
        };

        const serverResponse = await dispatch(
            createChannelThunk(newChannelObj)
        ).then((data) => socket.emit("create_channel", data))

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
        }
    };

    const isFormUnchanged = () => (
        name === server.name
      );

    return (
        <div className="create-channel-modal">
            <div className="header">
                {/* <div className="close-button">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div> */}
                <div className="title">
                    <h1>Create a channel</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label className='channel-name'>
                    <h5>CHANNEL NAME {errors.name && <p>{errors.name}</p>}</h5>
                    <div className="input-container">
                        <i className="fa-solid fa-hashtag"></i>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="channel-name"
                        />
                    </div>
                </label>
                <div className="submit-container">
                    <button className="cancel-button" onClick={closeModal}>Cancel</button>
                    <button className='submit-button' type="submit" disabled={isFormUnchanged()}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreateChannelModal;
