import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// Import thunk/action creator
// import { thunkCreateChannel } from "../../redux/channel";
// import "./CreateChannelModal.css";

function CreateChannelModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //DESTRUCTURE USER DATA TO COMPLETE OBJECT??
    //validates user and sign in and token and all good thins

    const newChannelObj = { nam };

    const serverResponse = await dispatch(thunkCreateChannel(newChannelObj));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Create Channel</h1>
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

        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateChannelModal;
