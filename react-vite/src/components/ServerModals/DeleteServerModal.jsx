import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteServerThunk } from "../../redux/servers";
import "./DeleteServerModal.css";

function DeleteServerModal({
    serverId,
    onSelectServer,
    onSelectChannel,
    socket,
}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

// <<<<<<< frontend-alex
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteServerThunk(serverId)).then((response) => {
            socket.emit("delete_server", serverId);
        });
    closeModal();
    onSelectChannel();
    onSelectServer();
    return;
  };

  return (
    <div className="delete-server-modal">



      <div className="top">
        <h2>Delete server</h2>
        <p>Are you sure you want to delete this server?</p>
        <div className="server-display">
          <div className="image-server">
            <img src={server.imageUrl}/>
            <h2>{server.name}</h2>
          </div>
        </div>
        <p>Once you delete, it will be gone forever.</p>
      </div>


      <div className="button-container">
          <button onClick={closeModal} className="cancel-button">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="delete-button">Delete</button>
      </div>



    </div>
  );
// =======
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await dispatch(deleteServerThunk(serverId)).then((response) => {
//             socket.emit("delete_server", serverId);
//         });
//         closeModal();
//         onSelectChannel();
//         onSelectServer();
//         return;
//     };

//     const cancelDelete = (e) => {
//         e.preventDefault();
//         dispatch(closeModal());
//     };

//     return (
//         <div className="delete-modal-container">
//             <div className="form-container">
//                 <h1 id="modaltitles">Are You Sure?</h1>

//                 <button type="submit" onClick={handleSubmit} className="delete">
//                     yes, delete
//                 </button>
//                 <button type="submit" onClick={cancelDelete} className="cancel">
//                     Go Back
//                 </button>
//             </div>
//         </div>
//     );
// >>>>>>> sunday-morning-official
}

export default DeleteServerModal;
