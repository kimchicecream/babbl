import "./ServerList.css"
import CreateServerModal from '../ServerModals/CreateServerModal';
import OpenModalButton from '../OpenModalButton';
import ServerIndexModal from '../ServerModals/ServerIndexModal';

export default function ServerList() {
    // Write Code Here
    return (
        <div className="server-list-container">
            <button className="logo-button">Logo</button>
            <div className="divider"></div>
            <div className="servers">
                {/* get servers + map into html */}
            </div>
            <div id="join-create-container">
                <button className="join-button">Join</button>
                <OpenModalButton
                    buttonText="Explore"
                    modalComponent={<ServerIndexModal />}
                    className='create-button'
                />
                <OpenModalButton
                    buttonText="Create server"
                    modalComponent={<CreateServerModal />}
                    className='create-button'
                />
            </div>
        </div>
    )
}
