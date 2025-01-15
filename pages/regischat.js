import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, Link, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';

const BuilderRegistrationPage = () => {
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
        instagramUrl: '',
        twitterUrl: '',
        topProjectLink: '',
        referralSource: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Basic validation
            const requiredFields = ['name', 'email', 'mobileNumber', 'address', 'city', 'pincode', 'country'];
            const missingFields = requiredFields.filter(field => !formData[field]);

            if (missingFields.length > 0) {
                alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Prepare EmailJS template parameters
            const templateParams = {
                to_name: "Sanskar",
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.mobileNumber,
                message: `New Registration.
                
                Address: ${formData.address}, ${formData.city}, ${formData.pincode}, ${formData.country}
                Social Links:
                GitHub: ${formData.githubUrl || 'Not provided'}
                LinkedIn: ${formData.linkedinUrl || 'Not provided'}
                Instagram: ${formData.instagramUrl || 'Not provided'}
                Twitter: ${formData.twitterUrl || 'Not provided'}
                Top Project: ${formData.topProjectLink || 'Not provided'}
                Referral Source: ${formData.referralSource || 'Not provided'}`,
                reply_to: formData.email
            };

            // Send email using EmailJS
            await emailjs.send(
                'service_btwf50p', // Your EmailJS service ID
                'template_jfai29o', // Your EmailJS template ID
                templateParams,
                '39GutgomRT0mW-frk' // Your EmailJS public key
            );

            // Make the API call to your backend
            const response = await fetch('https://sanskar065.pythonanywhere.com/api/builders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            // Handle successful registration
            alert('Registration successful!');

            // Reset the form data
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

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed: ' + (error.message || 'Please try again later'));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Basic validation
            const requiredFields = ['name', 'email', 'mobileNumber', 'address', 'city', 'pincode', 'country'];
            const missingFields = requiredFields.filter(field => !formData[field]);

            if (missingFields.length > 0) {
                alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Prepare EmailJS template parameters
            const templateParams = {
                to_name: "Sanskar",
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.mobileNumber,
                message: `New Registration.
                
                Address: ${formData.address}, ${formData.city}, ${formData.pincode}, ${formData.country}
                Social Links:
                GitHub: ${formData.githubUrl || 'Not provided'}
                LinkedIn: ${formData.linkedinUrl || 'Not provided'}
                Instagram: ${formData.instagramUrl || 'Not provided'}
                Twitter: ${formData.twitterUrl || 'Not provided'}
                Top Project: ${formData.topProjectLink || 'Not provided'}
                Referral Source: ${formData.referralSource || 'Not provided'}`,
                reply_to: formData.email
            };

            // Send email using EmailJS
            await emailjs.send(
                'service_btwf50p', // Your EmailJS service ID
                'template_jfai29o', // Your EmailJS template ID
                templateParams,
                '39GutgomRT0mW-frk' // Your EmailJS public key
            );

            // Make the API call to your backend
            const response = await fetch('https://sanskar065.pythonanywhere.com/api/builders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            // Handle successful registration
            alert('Registration successful!');


            // Clear the form
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

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed: ' + (error.message || 'Please try again later'));
        }
    };

    return (
        <div className="min-h-screen bg-purple-900 relative">
            {/* Background Image with Opacity */}
            <div
                className="absolute inset-0 z-0 opacity-90"
                style={{
                    backgroundImage: "url('/reference/wp14028114-alone-at-night-wallpapers.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <div className="absolute top-4 right-4">
                <div className="w-20 h-20 bg-white dark:bg-white rounded-full flex items-center justify-center">
                    <img src="/reference/Logo_transparent.jpg" alt="Custom Logo" className="w-14 h-14" />
                </div>
            </div>
            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 pt-8">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-2">Builder's</h1>
                        <h2 className="text-4xl font-bold text-white mb-4">Space</h2>
                        <p className="text-orange-500 font-bold text-xl">BUILD COOL STUFF, WITH COOLER PEOPLE.</p>
                    </div>
                </div>

                {/* <h2 className="text-4xl text-white text-center mb-8">pls introduce yourself</h2> */}

                {/* Browser Window Form */}
                <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                    {/* Browser Bar */}
                    <div className="bg-black p-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <User className="text-purple-400" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <Mail className="text-purple-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <Phone className="text-purple-400" />
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    placeholder="Mobile Number"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <MapPin className="text-purple-400" />
                                <textarea
                                    name="address"
                                    placeholder="Address"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                    rows="2"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Github className="text-purple-400" />
                                <input
                                    type="url"
                                    name="githubUrl"
                                    placeholder="GitHub URL"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <Linkedin className="text-purple-400" />
                                <input
                                    type="url"
                                    name="linkedinUrl"
                                    placeholder="LinkedIn URL"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <Instagram className="text-purple-400" />
                                <input
                                    type="url"
                                    name="instagramUrl"
                                    placeholder="Instagram URL"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <Twitter className="text-purple-400" />
                                <input
                                    type="url"
                                    name="twitterUrl"
                                    placeholder="Twitter URL"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Additional Fields */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Link className="text-purple-400" />
                                <input
                                    type="url"
                                    name="topProjectLink"
                                    placeholder="Top Project Link"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <Info className="text-purple-400" />
                                <input
                                    type="text"
                                    name="referralSource"
                                    placeholder="How did you hear about us?"
                                    className="w-full bg-transparent border-b-2 border-purple-500/50 px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
                            >
                                Join Builder's Space
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuilderRegistrationPage;