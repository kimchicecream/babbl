import './MainPage.css';
import ServerList from '../ServerList';
import ChannelList from '../ChannelList';
import MessageFeed from '../MessageFeed';
import Message from '../Message';
import UserList from '../UserList';
import ProfileManagement from '../ProfileManagement';



function MainPage() {
    return (
        <div className='main-page-container'>
            <div className='server-column'>
                <ServerList />
            </div>
            <div className='channel-column'>
                <ChannelList />
                <ProfileManagement />
            </div>
            <div className='message-feed-column'>
                <MessageFeed />
            </div>
        </div>
    )
}

export default MainPage;
