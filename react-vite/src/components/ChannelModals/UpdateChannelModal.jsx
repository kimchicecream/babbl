import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editChannelThunk } from "../../redux/channels";
import './UpdateChannelModal.css';

function UpdateChannelModal({ channel, socket }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

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
      socket.emit("update_channel", serverResponse);
      closeModal();
    }
  };

  const isFormUnchanged = () => (
    name === channel.name
  );

  return (
    <div className="update-channel-modal">
      <div className="title">
        <h1>Update your Channel</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="channel-name">
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
          <button className='submit-button' type="submit" disabled={isFormUnchanged()}>Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateChannelModal;
