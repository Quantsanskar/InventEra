import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import axios from 'axios';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        city: '',
        pincode: '',
        country: '',
        githubUrl: '',
        linkedinUrl: '',
        instaUrl: '',
        twitterUrl: '',
        topProjectLink: '',
        referralSource: ''
    });

    const [typedText, setTypedText] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const communityDescription = "Join a tribe of creators who turn ideas into reality. No limits, just pure potential.";

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < communityDescription.length) {
                setTypedText(prev => prev + communityDescription[index]);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/builders/', formData);
            // Show success popup instead of alert
            setShowSuccessPopup(true);
        } catch (error) {
            // Handle registration error
            alert('Registration Failed. Please try again.');
        }
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        // Reset form data after closing popup
        setFormData({
            name: '',
            email: '',
            mobileNumber: '',
            address: '',
            city: '',
            pincode: '',
            country: '',
            githubUrl: '',
            linkedinUrl: '',
            instagramUrl: '',
            twitterUrl: '',
            topProjectLink: '',
            referralSource: ''
        });
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

    const popupVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="min-h-screen bg-gray-900 text-white flex flex-col"
            >
                <Header />

                <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl mt-8 font-light tracking-wide">
                            Builders' Space
                        </h1>
                        <p className="text-lg text-gray-400 mt-2">
                            where creators meet possibility
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto w-full mb-8"
                    >
                        <p className="text-xl md:text-2xl text-gray-300 text-center">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl mx-auto w-full space-y-6"
                    >
                        {[
                            { name: 'name', label: 'Full Name', type: 'text' },
                            { name: 'email', label: 'Email', type: 'email' },
                            { name: 'mobileNumber', label: 'Mobile Number', type: 'tel' },
                            { name: 'address', label: 'Address', type: 'text' },
                            { name: 'city', label: 'City', type: 'text' },
                            { name: 'pincode', label: 'Pincode', type: 'text' },
                            { name: 'country', label: 'Country', type: 'text' },
                            { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
                            { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'url' },
                            { name: 'instagramUrl', label: 'Instagram URL', type: 'url' },
                            { name: 'twitterUrl', label: 'Twitter URL', type: 'url' },
                            { name: 'topProjectLink', label: 'Top Project Link (Optional)', type: 'url' },
                            { name: 'referralSource', label: 'How did you hear about us?', type: 'text' }
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
                                    value={formData[name]}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required={name !== 'topProjectLink'}
                                />
                            </motion.div>
                        ))}

                        <motion.button
                            variants={inputVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-medium py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300"
                        >
                            Join Builders' Space
                        </motion.button>
                    </motion.form>

                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-gray-500 mt-8 py-4"
                    >
                        <p>© 2024 Builders' Space</p>
                    </motion.footer>
                </div>
            </motion.div>

            <AnimatePresence>
                {showSuccessPopup && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={popupVariants}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 max-w-md w-full">
                            <button
                                onClick={handleClosePopup}
                                className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors text-2xl"
                            >
                                ✕
                            </button>
                            <div className="font-['Caveat'] text-3xl text-white tracking-wide leading-relaxed">
                                You're now part of something extraordinary.
                                Welcome to a community where ideas transform into reality.
                            </div>
                            <div className="mt-6 text-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleClosePopup}
                                    className="bg-transparent border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all"
                                >
                                    Continue
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default RegistrationPage;