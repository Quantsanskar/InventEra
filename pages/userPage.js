import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Video } from 'lucide-react';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve user details from localStorage
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const userToken = localStorage.getItem('userToken');

        if (!userDetails || !userToken) {
            // Redirect to login if no user details
            window.location.href = '/login';
            return;
        }

        setCurrentUser(userDetails);

        // Fetch all users except current user
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                // Filter out current user
                const filteredUsers = response.data.filter(
                    user => user.id !== userDetails.id
                );

                setUsers(filteredUsers);
            } catch (err) {
                setError('Unable to fetch users');
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const handleVideoCall = (user) => {
        // Placeholder for video call functionality
        alert(`Initiating video call with ${user.name}`);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                {error}
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-900 text-white p-8"
        >
            <div className="container mx-auto">
                <h1 className="text-4xl font-light mb-8 text-center">
                    Builders Connected
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <motion.div
                            key={user.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800 rounded-xl p-6 flex items-center justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-gray-400">{user.email}</p>
                            </div>
                            <button 
                                onClick={() => handleVideoCall(user)}
                                className="text-blue-400 hover:text-blue-300"
                            >
                                <Video size={28} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {users.length === 0 && (
                    <p className="text-center text-gray-500 mt-16">
                        No other users to display
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default UsersPage;