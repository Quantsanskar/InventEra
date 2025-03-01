import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SignInPage = () => {
    // State for user type selection
    const [userType, setUserType] = useState(''); // '' -> 'participant' -> 'attendee'
    
    // State for participant login
    const [participantEmail, setParticipantEmail] = useState('');
    const [participantPassword, setParticipantPassword] = useState('');
    
    // State for attendee login
    const [attendeeEmail, setAttendeeEmail] = useState('');
    const [attendeePassword, setAttendeePassword] = useState('');
    
    // State for attendee registration
    const [showRegistration, setShowRegistration] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [regPassword, setRegPassword] = useState('');
    
    // Shared states
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    // Check if a user is already logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.isAttendee) {
                router.push('/attendee-profile');
            } else {
                router.push('/Dashboard');
            }
        }
    }, [router]);

    // Handle participant sign in
    const handleParticipantSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://builderspace.onrender.com/api/user-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: participantEmail,
                    password: participantPassword,
                    isParticipant: true
                }),
            });

            const data = await response.json();

            if (response.ok && data.accessToken) {
                setSuccess(true);
                setTimeout(() => {
                    const user = { 
                        email: participantEmail, 
                        name: participantEmail.split('@')[0],
                        accessToken: data.accessToken,
                        isAttendee: false
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    router.push('/Dashboard');
                }, 1000);
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle attendee sign in
    const handleAttendeeSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://builderspace.onrender.com/api/user-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: attendeeEmail,
                    password: attendeePassword,
                    isAttendee: true
                }),
            });

            const data = await response.json();

            if (response.ok && data.accessToken) {
                setSuccess(true);
                setTimeout(() => {
                    const user = { 
                        email: attendeeEmail, 
                        name: attendeeEmail.split('@')[0],
                        accessToken: data.accessToken,
                        isAttendee: true
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    router.push('/attendee-profile');
                }, 1000);
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle attendee registration
    const handleAttendeeRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://builderspace.onrender.com/api/create-user-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: regEmail,
                    mobile_no: mobileNo,
                    password: regPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setShowRegistration(false);
                    setUserType('attendee');
                    setAttendeeEmail(regEmail);
                    // Reset registration form
                    setFirstName('');
                    setLastName('');
                    setRegEmail('');
                    setMobileNo('');
                    setRegPassword('');
                }, 1000);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Go back to user type selection
    const handleBackToSelection = () => {
        setUserType('');
        setError('');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Animated background with gradient elements */}
            <div className="absolute inset-0 bg-[url('/images/signupgradient.png')] bg-cover bg-center opacity-60 animate-pulse"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/10 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-20 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 right-20 w-80 h-80 bg-indigo-700/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full max-w-screen-sm px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black flex items-center justify-center text-center mb-8 animated-text uppercase stroke-text tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600"
                >
                    {showRegistration ? 'Register' : 'Sign In'}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-black/80 border border-[#495057] flex flex-col items-center justify-center rounded-[24px] p-6 sm:p-8 md:p-10 w-full backdrop-blur-sm shadow-[0_0_30px_rgba(162,210,255,0.15)] mx-auto"
                >
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Alert variant="destructive" className="mb-6 bg-red-900/30 border border-red-700">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500/20 backdrop-blur-sm rounded-full p-12 z-20"
                        >
                            <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {/* User Type Selection */}
                        {userType === '' && !showRegistration && (
                            <motion.div
                                key="user-type-selection"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full flex flex-col items-center space-y-6"
                            >
                                <div className="text-center text-gray-300 mb-4">
                                    <h2 className="text-xl font-bold mb-2">Select User Type</h2>
                                    <p className="text-gray-400">Choose how you want to sign in</p>
                                </div>
                                
                                <motion.button
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    onClick={() => setUserType('participant')}
                                    className="relative w-full max-w-[80%] py-4 bg-black/25 border-2 border-[#03045E] rounded-[16px] text-gray-300 
                                    focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                    hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                    hover:scale-105 hover:text-white
                                    transition-all duration-300 ease-in-out
                                    hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                    overflow-hidden group"
                                >
                                    <span className="relative z-10 text-lg font-medium">PARTICIPANT SIGN IN</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </motion.button>
                                
                                <motion.button
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    onClick={() => setUserType('attendee')}
                                    className="relative w-full max-w-[80%] py-4 bg-black/25 border-2 border-[#03045E] rounded-[16px] text-gray-300 
                                    focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                    hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                    hover:scale-105 hover:text-white
                                    transition-all duration-300 ease-in-out
                                    hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                    overflow-hidden group"
                                >
                                    <span className="relative z-10 text-lg font-medium">ATTENDEE SIGN IN</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Participant Sign In Form */}
                        {userType === 'participant' && !showRegistration && (
                            <motion.form
                                key="participant-login"
                                onSubmit={handleParticipantSignIn}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6 w-full"
                            >
                                <div className="text-center text-gray-300 mb-4">
                                    <h2 className="text-xl font-bold">Participant Sign In</h2>
                                </div>
                                
                                <div className="space-y-4 w-full">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <input
                                            type="email"
                                            placeholder="EMAIL"
                                            value={participantEmail}
                                            onChange={(e) => setParticipantEmail(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <input
                                            type="password"
                                            placeholder="PASSWORD"
                                            value={participantPassword}
                                            onChange={(e) => setParticipantPassword(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="flex justify-center mt-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full max-w-[60%] lg:max-w-[40%] bg-black/25 border-2 border-[#03045E] rounded-[53px] py-3 text-gray-300 
                                        focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                        hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                        hover:scale-105 hover:text-white
                                        transition-all duration-300 ease-in-out
                                        hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        overflow-hidden group"
                                    >
                                        <span className="relative z-10">{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center mt-4"
                                >
                                    <button
                                        type="button"
                                        onClick={handleBackToSelection}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
                                    >
                                        Back to selection
                                    </button>
                                </motion.div>
                            </motion.form>
                        )}

                        {/* Attendee Sign In Form */}
                        {userType === 'attendee' && !showRegistration && (
                            <motion.form
                                key="attendee-login"
                                onSubmit={handleAttendeeSignIn}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6 w-full"
                            >
                                <div className="text-center text-gray-300 mb-4">
                                    <h2 className="text-xl font-bold">Attendee Sign In</h2>
                                </div>
                                
                                <div className="space-y-4 w-full">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <input
                                            type="email"
                                            placeholder="EMAIL"
                                            value={attendeeEmail}
                                            onChange={(e) => setAttendeeEmail(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <input
                                            type="password"
                                            placeholder="PASSWORD"
                                            value={attendeePassword}
                                            onChange={(e) => setAttendeePassword(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="flex justify-center mt-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full max-w-[60%] lg:max-w-[40%] bg-black/25 border-2 border-[#03045E] rounded-[53px] py-3 text-gray-300 
                                        focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                        hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                        hover:scale-105 hover:text-white
                                        transition-all duration-300 ease-in-out
                                        hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        overflow-hidden group"
                                    >
                                        <span className="relative z-10">{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col items-center gap-3 mt-4"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setShowRegistration(true)}
                                        className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                                    >
                                        Create an Attendee Account
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleBackToSelection}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
                                    >
                                        Back to selection
                                    </button>
                                </motion.div>
                            </motion.form>
                        )}

                        {/* Attendee Registration Form */}
                        {showRegistration && (
                            <motion.form
                                key="attendee-registration"
                                onSubmit={handleAttendeeRegistration}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6 w-full"
                            >
                                <div className="text-center text-gray-300 mb-4">
                                    <h2 className="text-xl font-bold">Create Attendee Account</h2>
                                </div>
                                
                                <div className="space-y-4 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="FIRST NAME"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                                required
                                            />
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="LAST NAME"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                                required
                                            />
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <input
                                            type="email"
                                            placeholder="EMAIL"
                                            value={regEmail}
                                            onChange={(e) => setRegEmail(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <input
                                            type="tel"
                                            placeholder="MOBILE NUMBER"
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <input
                                            type="password"
                                            placeholder="PASSWORD"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50 focus:border-indigo-500 transition-all duration-300"
                                            required
                                        />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="flex justify-center mt-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative w-full max-w-[60%] lg:max-w-[40%] bg-black/25 border-2 border-[#03045E] rounded-[53px] py-3 text-gray-300 
                                        focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                        hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                        hover:scale-105 hover:text-white
                                        transition-all duration-300 ease-in-out
                                        hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        overflow-hidden group"
                                    >
                                        <span className="relative z-10">{loading ? 'REGISTERING...' : 'REGISTER'}</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-center mt-4"
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowRegistration(false);
                                            setUserType('attendee');
                                        }}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
                                    >
                                        Already have an account? Sign In
                                    </button>
                                </motion.div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default SignInPage;