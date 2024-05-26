import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFSModal } from "../../context/FullScreenModal";
// Import thunk/action creator
// import { thunkCreateServer } from "../../redux/server";
// import "./CreateServerModal.css";
import { createServerThunk } from "../../redux/servers";

function CreateServerModal({ onNewServer }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    // const [serverData, setServerData] = useState({ name, description, imageUrl, creatorId: user.id })

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
            // onSelectServer(serverResponse);
            closeModal();
        }
    };

    return (
        <>
            <h1>Create Server</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}

                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}

                <label>
                    Image URL
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                {errors.imageUrl && <p>{errors.imageUrl}</p>}

                <button type="submit">Create</button>
            </form>
        </>
    );
}

export default CreateServerModal;
