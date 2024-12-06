import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        mobileNumber: ''
    });
    const [error, setError] = useState(null);
    // const navigate = useNavigate("");
    const router=useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', credentials);
            
            // Store user token and details in localStorage
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user));

            // Navigate to main user page
            router.push('/userPage');
        } catch (error) {
            // Handle login error
            setError('Invalid credentials. Please check and try again.');
        }
    };

    const pageVariants = {
        initial: { opacity: 0, scale: 0.95 },
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 1.05 }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen bg-gray-900 text-white flex flex-col"
        >
            <Header />

            <div className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl mt-8 font-light tracking-wide">
                        Login
                    </h1>
                    <p className="text-lg text-gray-400 mt-2">
                        Access your Builders' Space
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleLogin}
                    initial="hidden"
                    animate="visible"
                    className="max-w-xl mx-auto w-full space-y-6"
                >
                    {[
                        { name: 'name', label: 'Full Name', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'mobileNumber', label: 'Mobile Number', type: 'tel' }
                    ].map(({ name, label, type }) => (
                        <motion.div
                            key={name}
                            variants={inputVariants}
                            className="flex flex-col"
                        >
                            <label htmlFor={name} className="mb-2 text-gray-400">{label}</label>
                            <input
                                type={type}
                                id={name}
                                name={name}
                                value={credentials[name]}
                                onChange={handleInputChange}
                                className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </motion.div>
                    ))}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-center mb-4"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        variants={inputVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-medium py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300"
                    >
                        Enter Builders' Space
                    </motion.button>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default LoginPage;