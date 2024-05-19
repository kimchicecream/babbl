import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// Import thunk/action creator
// import { thunkCreateServer } from "../../redux/server";
// import "./CreateServerModal.css";

function CreateServerModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverObj = { name, description, imageUrl };

    const serverResponse = await dispatch(thunkCreateServer(serverObj));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Create Server</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          {errors.imageUrl && <p>{errors.imageUrl}</p>}
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateServerModal;
