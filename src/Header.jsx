
import React from 'react';
import agoraLogo from './assets/agora-logo.svg'
import UserProfile from './UserProfile';

const Header = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#f0f0f0' }}>
            <img src={agoraLogo} alt="Logo" style={{ width: '200px' }} />
            <nav>
                <button>Create Session</button>
            </nav>
            <UserProfile />
        </header>
    );
};

export default Header;
