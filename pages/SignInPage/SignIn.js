import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ArrowRight, CheckCircle, Mail, Lock, Key } from 'lucide-react';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('credentials'); // credentials -> otp
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    // Handle login & receive token
    const handleCredentialsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                Cookies.set('authToken', data.token, { expires: 1 }); // Store token for 1 day
                setStep('otp');
                await sendOtp();
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Request OTP from backend
    const sendOtp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/send-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                setError('Failed to send OTP. Try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    // Handle OTP verification
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/verify-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                router.push('/dashboard');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-950 text-white">
            {/* Animated background with gradient circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            </div>
            
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
            
            <div className="relative z-10 w-full max-w-md">
                {/* Logo and branding section */}
                <div className="mb-6 text-center">
                    <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        SIGN IN
                    </h1>
                    <p className="text-gray-400">Access your Builder Dashboard</p>
                </div>
                
                {/* Main card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-bl-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/10 to-purple-600/10 rounded-tr-3xl"></div>
                    
                    {/* Progress indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'credentials' ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'}`}>
                                <Mail size={16} />
                            </div>
                            <div className={`h-1 w-12 ${step === 'credentials' ? 'bg-gray-700' : 'bg-blue-500'}`}></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'credentials' ? 'bg-gray-700 text-gray-400' : 'bg-blue-500 text-white'}`}>
                                <Key size={16} />
                            </div>
                        </div>
                    </div>
                    
                    {error && (
                        <Alert variant="destructive" className="mb-6 bg-red-900/40 border border-red-800 text-red-200">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {step === 'credentials' && (
                        <form onSubmit={handleCredentialsSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={16} className="text-gray-500" />
                                    </div>
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 transition" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={16} className="text-gray-500" />
                                    </div>
                                    <input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 transition" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Authenticating...' : 'Sign In'} 
                                    {!loading && <ArrowRight size={16} />}
                                </button>
                            </div>
                            
                            
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleOtpSubmit} className="space-y-5">
                            <div className="text-center mb-4">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mb-3">
                                    <Mail size={20} />
                                </div>
                                <h3 className="text-lg font-medium">Verification Code</h3>
                                <p className="text-sm text-gray-400 mt-1">We've sent a code to <span className="text-blue-400">{email}</span></p>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Enter OTP</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter 6-digit code" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-100 text-center tracking-widest text-lg font-medium" 
                                    required 
                                    maxLength="6"
                                />
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Verifying...' : 'Verify Code'} 
                                    {!loading && <CheckCircle size={16} />}
                                </button>
                            </div>
                            
                            <div className="text-center mt-6">
                                <button 
                                    type="button"
                                    onClick={sendOtp}
                                    className="text-xs text-blue-400 hover:text-blue-300 transition"
                                >
                                    Didn't receive a code? Resend
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                
                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300 transition">Create Attendee Account</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;