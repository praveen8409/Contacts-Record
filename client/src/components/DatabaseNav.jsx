// DatabaseNav.js
import React from 'react';
import LogoutButton from './LogoutButton';
import Logo from './Logo';

const DatabaseNav = ({ setSelectedDatabase, selectedDatabase }) => {
    console.log(selectedDatabase)
    return (
        <div className="fixed top-0 left-0 right-0 p-4 sm:px-8 z-10 shadow-md bg-gray-900">
            {/* Database tabs */}
            <div className="flex items-center justify-between mb-4">
                <Logo />
                <div className="flex space-x-4">
                    <button
                        onClick={() => setSelectedDatabase('database1')}
                        className={`px-4 py-2 rounded ${selectedDatabase === 'database1' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Database 1
                    </button>
                    <button
                        onClick={() => setSelectedDatabase('database2')}
                        className={`px-4 py-2 rounded ${selectedDatabase === 'database2' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Database 2
                    </button>
                    <button
                        onClick={() => setSelectedDatabase('database3')}
                        className={`px-4 py-2 rounded ${selectedDatabase === 'database3' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Database 3
                    </button>
                </div>
                <LogoutButton />
            </div>
        </div>
    );
}

export default DatabaseNav;
