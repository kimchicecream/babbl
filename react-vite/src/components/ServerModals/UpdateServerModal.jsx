import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editServerThunk } from "../../redux/servers";
import "./UpdateServerModal.css";

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
  const [imageError, setImageError] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const isFormUnchanged = () =>
    name === server.name &&
    description === server.description &&
    imageUrl === server.imageUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormUnchanged()) {
      closeModal();
      return;
    }

    //DESTRUCTURE USER DATA TO COMPLETE SERVER OBJECT
    //validates user and sign in and token and all good thins

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

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="update-server-modal">
      <div className="header">
        <div className="close-button">
          <i className="fa-solid fa-xmark" onClick={closeModal}></i>
        </div>
        <div className="title">
          <h1>Server Overview</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="server-image">
          <div className="current-pic">
            <img src={imageUrl || "/blank-pic.png"} />
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
          <h5>
            DESCRIPTION {errors.description && <p>{errors.description}</p>}
          </h5>
          <span></span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <div className="submit-cancel-container">
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="submit-button"
            type="submit"
            disabled={isFormUnchanged()}
          >
            Confirm changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateServerModal;
