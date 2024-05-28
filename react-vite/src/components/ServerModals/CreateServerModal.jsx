import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFSModal } from "../../context/FullScreenModal";
import { createServerThunk } from "../../redux/servers";
import { joinServerThunk } from "../../redux/memberships";
import './CreateServerModal.css'

function CreateServerModal({ onNewServer }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const [imageError, setImageError] = useState(false);

    const { closeModal } = useFSModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //DESTRUCTURE USER DATA TO COMPLETE SERVER OBJECT
        //validates user and sign in and token and all good thins

        const serverData = { name, description, imageUrl, creatorId: user.id };

        const newServer = await dispatch(createServerThunk(serverData));
        if (newServer.errors) {
            setErrors(newServer.errors);
        } else {
            onNewServer(newServer);
            // auto join server that a user creates
            dispatch(joinServerThunk(newServer.id))
            closeModal();
        }
    };

    const isSubmitDisabled = name.length === 0 || description.length === 0 || imageUrl.length === 0;

    // Handle image error by setting the imageError state
    const handleImageError = () => {
        setImageError(true);
    };

    // Handle image load by resetting the imageError state
    const handleImageLoad = () => {
        setImageError(false);
    };

    return (
        <div className="create-server-fs-modal">
            {/* <div className="exit-button">
                <i className="fa-solid fa-xmark" onClick={closeModal}></i>
            </div> */}
            <div className="header">
                <div className="close-button">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div className="title">
                    <h1>Create your server</h1>
                    <span>Your server is where you and your friends hang out.</span>
                    <span>Make yours and start talking.</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>

                <label className="server-image">
                    <div className="current-pic">
                        <img
                            src={imageUrl}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            className={imageError ? 'hidden' : ''}
                        />
                    </div>
                    <div className="image-url-input">
                        <h5>IMAGE URL {errors.imageUrl && <p>{errors.imageUrl}</p>}</h5>
                        <span></span>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                </label>


                <label className="server-name">
                    <h5>SERVER NAME {errors.name && <p>{errors.name}</p>}</h5>
                    <span></span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label className="server-description">
                    <h5>DESCRIPTION {errors.description && <p>{errors.description}</p>}</h5>
                    <span></span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <div className="submit-container">
                    <button type="submit" disabled={isSubmitDisabled}>Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreateServerModal;
