import './MainPage.css';
import ServerList from '../ServerList';
import ChannelList from '../ChannelList';
import MessageFeed from '../MessageFeed';
import Message from '../Message';
import UserList from '../UserList';
import ProfileManagement from '../ProfileManagement';
import { ModalProvider } from '../../context/Modal';
import React, { useEffect } from 'react';



function MainPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <ModalProvider>
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
            </ModalProvider>
        </>

    )
}

export default MainPage;
