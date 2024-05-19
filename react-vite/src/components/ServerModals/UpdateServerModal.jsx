import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// Import thunk/action creator
// import { thunkUpdateServer } from "../../redux/server";
// import "./UpdateServerModal.css";

function UpdateServerModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //DESTRUCTURE USER DATA TO COMPLETE SERVER OBJECT
    //validates user and sign in and token and all good thins

    const serverObj = { name, description, imageUrl };

    const serverResponse = await dispatch(thunkUpdateServer(serverObj));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
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
