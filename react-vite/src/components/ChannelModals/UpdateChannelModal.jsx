import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { selectUnknownFields } from "express-validator/src/field-selection";
// Import thunk/action creator
// import { thunkUpdateChannel } from "../../redux/c
// import "./UpdateChannelModal.css";
import { editChannelThunk } from "../../redux/channels";

function UpdateChannelModal({ channel, socket }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  // const channel = useSelector((state) => {
  //   state.channels[channelId];
  // });
  const { closeModal } = useModal();

  // useEffect(() => {
  //   setName(channel.name);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //DESTRUCTURE USER DATA TO COMPLETE OBJECT??
    //validates user and sign in and token and all good stuff,
    //DEFINITELY get another set of eyes on this hahaha
    if (name === channel.name) {
      closeModal();
      return;
    }

    const channelObj = {
      name,
      channelId: channel.id,
      serverId: channel.serverId,
      creatorId: sessionUser.id,
    };

    const serverResponse = await dispatch(editChannelThunk(channelObj));

    if (serverResponse.errors) {
      console.log(
        "%c serverResponse.errors log>",
        "color:red; font-size: 26px",
        serverResponse.errors
      );
      setErrors(serverResponse.errors);
    } else {
      console.log(
        "%c serverResponse log>",
        "color:blue; font-size: 26px",
        serverResponse
      );
      socket.emit("update_channel", serverResponse);
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
