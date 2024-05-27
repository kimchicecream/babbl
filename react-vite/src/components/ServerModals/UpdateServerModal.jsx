import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// Import thunk/action creator
// import { thunkUpdateServer } from "../../redux/server";
// import "./UpdateServerModal.css";
import { editServerThunk } from "../../redux/servers";

function UpdateServerModal({
  server,
  onSelectServer,
  onSelectChannel,
  selectedChannel,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(server.name);
  const [description, setDescription] = useState(server.description);
  const [imageUrl, setImageUrl] = useState(server.imageUrl);
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //DESTRUCTURE USER DATA TO COMPLETE SERVER OBJECT
    //validates user and sign in and token and all good thins
    console.log("%c server log>", "color:blue; font-size: 26px", server);

    if (
      name === server.name &&
      description === server.description &&
      imageUrl === server.imageUrl
    ) {
      closeModal();
      return;
    }

    const serverObj = {
      name,
      description,
      imageUrl,
      id: server.id,
      creatorId: sessionUser.id,
    };

    const serverResponse = await dispatch(editServerThunk(serverObj));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      onSelectServer(serverObj);
      onSelectChannel(selectedChannel);
      closeModal();
    }
  };

  return (
    <>
      <h1>Edit Your Server</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p>{errors.name}</p>}

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}

        <label>
          Image URL
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        {errors.imageUrl && <p>{errors.imageUrl}</p>}

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UpdateServerModal;
