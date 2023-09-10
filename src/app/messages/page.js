"use client"
import React, { useState } from 'react';

// Sample user data
const users = [
    { id: 1, name: 'User 1', profilePic: '/avatar/profile.png' },
    { id: 2, name: 'User 2', profilePic: '/avatar/profile.png' },
    // Add more user data
];

function Sidebar({ users }) {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="w-1/5 p-4 bg-gradient-to-r from-black to-yellow-600 text-white">
            <div className="mb-4">
                <input
                    className="w-full p-2 rounded border border-gray-300 text-black"
                    type="text"
                    placeholder="Search Users"
                />
            </div>
            <div className="space-y-2">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`flex items-center p-2 cursor-pointer hover:bg-gray-300 ${selectedUser === user ? 'bg-gray-300' : ''
                            }`}
                        onClick={() => handleUserSelect(user)}
                    >
                        <img
                            className="w-8 h-8 rounded-full mr-2"
                            src={user.profilePic}
                            alt={`Profile of ${user.name}`}
                        />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
function MessageSection({ selectedUser }) {
    // State for storing and displaying messages
    const [messages, setMessages] = useState([]);

    // Function to send a message
    const sendMessage = (message) => {
        // Add message to the messages state
        setMessages([...messages, message]);
    };

    return (
        <div className="w-3/4 p-4 bg-white border-l border-gray-300 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                {selectedUser && (
                    <div className="flex items-center">
                        <img
                            className="w-8 h-8 rounded-full mr-2"
                            src={selectedUser.profilePic}
                            alt={`Profile of ${selectedUser.name}`}
                        />
                        <span className="text-xl font-bold">{selectedUser.name}</span>
                    </div>
                )}
                {/* Add message options/buttons */}
            </div>
            <div className="message-list flex-grow h-64 overflow-y-auto">
                {/* Display messages */}
                {messages.map((message, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded mb-2">
                        {message}
                    </div>
                ))}
            </div>
            <div className="message-input mt-4">
                {/* Input field for typing and sending messages */}
                <input
                    className="w-full p-2 rounded border border-gray-300"
                    type="text"
                    placeholder="Type a message..."
                />
                <button
                    className="px-4 py-2 bg-yellow-700 text-white rounded ml-2 hover:bg-yellow-600"
                    onClick={() => sendMessage('Sample message')}
                >
                    Send
                </button>

            </div>
        </div>
    );
}

function MessagingPage() {
    return (
        <div className="flex h-screen">
            <Sidebar users={users} />
            <MessageSection selectedUser={null} />
        </div>
    );
}

export default MessagingPage;
