
import React from 'react';
import UserProfile from './UserProfile';

const Header = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#f0f0f0' }}>
            <img src="/path-to-your-logo.png" alt="Logo" style={{ width: '100px' }} />
            <nav>
                <button>Create Session</button>
            </nav>
            <UserProfile />
        </header>
    );
};

export default Header;
