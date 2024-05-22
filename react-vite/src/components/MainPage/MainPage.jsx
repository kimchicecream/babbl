import './MainPage.css';
import ServerList from '../ServerList';
import ChannelList from '../ChannelList';
import MessageFeed from '../MessageFeed';
import ProfileManagement from '../ProfileManagement';
import React, { useEffect } from 'react';



function MainPage() {
    // useEffect to keep the page from scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

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
