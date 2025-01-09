import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '../components/Header'; // Assuming you have a Header component

const BuilderLogin = () => {
    // State Management
    // We'll use React's useState hook to manage different aspects of the form and login process
    const [formData, setFormData] = useState({
        name: '',          // Builder's full name
        email: '',         // Builder's email address
        mobileNumber: ''   // Builder's mobile number
    });

    // State to store existing builders fetched from the backend
    const [existingBuilders, setExistingBuilders] = useState([]);

    // State to manage form validation errors
    const [errors, setErrors] = useState({});

    // State to manage submission process and prevent multiple submissions
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Local Storage and Initial Data Fetching
    // This useEffect runs when the component mounts and handles initial checks
    useEffect(() => {
        // First, check if builder profile already exists in local storage
        const storedBuilderProfile = localStorage.getItem('builderProfile');

        if (storedBuilderProfile) {
            // If credentials exist, immediately redirect to user page
            window.location.href = '/userPage';
            return;
        }

        // If no stored profile, fetch existing builders from the backend
        const fetchBuilders = async () => {
            try {
                const response = await axios.get('https://sanskar065.pythonanywhere.com/api/builders/');
                setExistingBuilders(response.data);
            } catch (error) {
                console.error('Error fetching builders:', error);
                setErrors(prev => ({
                    ...prev,
                    fetch: 'Could not load builder profiles. Please try again later.'
                }));
            }
        };

        fetchBuilders();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Input Change Handler
    // Manages input changes with special handling for mobile number
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special processing for mobile number: allow only digits and limit to 10
        const processedValue = name === 'mobileNumber'
            ? value.replace(/\D/g, '').slice(0, 10)  // Remove non-digits, limit to 10 chars
            : value;

        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear any previous errors for this field
        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    // Form Validation Function
    // Performs comprehensive validation on form inputs
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Mobile number validation
        const phoneRegex = /^\d{10}$/;
        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!phoneRegex.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Mobile number must be 10 digits';
        }

        // Update errors state and return validation status
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form Submission Handler
    // Manages the login process, validation, and authentication
    const handleSubmit = async (e) => {
        e.preventDefault();

        // First, validate the form
        if (!validateForm()) {
            return;
        }

        // Set submitting state to prevent multiple submissions
        setIsSubmitting(true);

        try {
            // Find a matching builder profile
            const matchedBuilder = existingBuilders.find(builder =>
                builder.name === formData.name &&
                builder.email === formData.email &&
                builder.mobileNumber === `+91${formData.mobileNumber}`
            );

            if (matchedBuilder) {
                // Store user details in localStorage for persistence
                localStorage.setItem('builderProfile', JSON.stringify(matchedBuilder));

                // Navigate to next page
                window.location.href = '/userPage';
            } else {
                // If no matching profile is found
                setErrors({
                    submit: 'No matching builder profile found. Please check your details.'
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
                submit: 'Login failed. Please try again.'
            });
        } finally {
            // Reset submitting state
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a1a2e] text-[#e0e0e0] font-mono">
            {/* Header Component */}
            <Header />

            {/* Main Content Container */}
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mt-20 mx-auto bg-[#16213e] rounded-xl shadow-2xl p-8"
                >
                    {/* Page Title */}
                    <h1 className="text-4xl font-bold mb-4 text-center text-[#0f3460]">
                        Builder's Space
                    </h1>
                    <p className="text-center text-[#e94560] mb-8 tracking-wider">
                        Welcome, innovative builder. Your journey starts here.
                    </p>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input Field */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Full Name"
                                className={`w-full p-3 bg-transparent border-b-2 
                                    ${errors.name ? 'border-red-500' : 'border-[#0f3460]'} 
                                    text-[#e0e0e0] placeholder-[#6b6b6b] focus:outline-none`}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Input Field */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className={`w-full p-3 bg-transparent border-b-2 
                                    ${errors.email ? 'border-red-500' : 'border-[#0f3460]'} 
                                    text-[#e0e0e0] placeholder-[#6b6b6b] focus:outline-none`}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Mobile Number Input Field */}
                        <div>
                            <div className="flex items-center">
                                <span className="text-[#6b6b6b] mr-2">+91</span>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    maxLength="10"
                                    placeholder="Mobile Number"
                                    className={`w-full p-3 bg-transparent border-b-2 
                                        ${errors.mobileNumber ? 'border-red-500' : 'border-[#0f3460]'} 
                                        text-[#e0e0e0] placeholder-[#6b6b6b] focus:outline-none`}
                                />
                            </div>
                            {errors.mobileNumber && (
                                <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>
                            )}
                        </div>

                        {/* Submission Error Message */}
                        {errors.submit && (
                            <div className="bg-[#4a4e69] text-[#e94560] p-3 rounded-lg text-center">
                                {errors.submit}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full p-3 rounded-lg text-[#e0e0e0] font-bold 
                                transition-all duration-300 ease-in-out
                                ${isSubmitting
                                    ? 'bg-[#4a4e69] cursor-not-allowed'
                                    : 'bg-[#0f3460] hover:bg-[#e94560] hover:text-white'}`}
                        >
                            {isSubmitting ? 'Verifying...' : 'Enter Builder Space'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default BuilderLogin;