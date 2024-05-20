import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { selectUnknownFields } from "express-validator/src/field-selection";
// Import thunk/action creator
// import { thunkUpdateChannel } from "../../redux/channel";
// import "./UpdateChannelModal.css";

function UpdateChannelModal({ channelId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const channel = useSelector((state) => {
    state.channel[channelId];
  });
  const { closeModal } = useModal();

  useEffect(() => {
    setName(channel.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //DESTRUCTURE USER DATA TO COMPLETE OBJECT??
    //validates user and sign in and token and all good stuff,
    //DEFINITELY get another set of eyes on this hahaha

    const channelObj = { name };

    const serverResponse = await dispatch(thunkUpdateChnnel(channelObj));

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Update your Channel</h1>
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

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UpdateChannelModal;
