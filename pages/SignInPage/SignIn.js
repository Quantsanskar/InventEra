import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('credentials'); // credentials -> otp
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Check if a user is already logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            router.push('/dashboard');
        }
    }, []);

    // Handle initial sign in with credentials
    const handleCredentialsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const usersResponse = await fetch('http://127.0.0.1:8000/login/');
            const users = await usersResponse.json();

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                const otpResponse = await fetch('/api/auth/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (otpResponse.ok) {
                    setStep('otp');
                } else {
                    setError('Failed to send verification code. Please try again.');
                }
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP and complete sign in
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok && data.verified) {
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                setError('Failed to resend verification code.');
            }
        } catch (err) {
            setError('Failed to resend verification code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('/images/signupgradient.png')] bg-center opacity-60"></div>
            <div className="relative z-10">
                <h1 className="text-6xl lg:text-8xl font-black text-center mb-4 animated-text uppercase stroke-text tracking-wide">
                    Sign In
                </h1>

                <div className="bg-black border border-[#495057] rounded-[24px] p-8 py-20 px-16 w-full max-w-xl backdrop-blur-sm shadow-[0_0_20px_rgba(162,210,255,0.10)]">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {step === 'credentials' && (
                        <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                            <input
                                type="email"
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"
                                required
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"
                                required
                            />
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full max-w-[60%] lg:max-w-[40%] bg-black/25 border-2 border-[#03045E] rounded-[53px] py-2 text-gray-300 
                                    focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                    hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                    hover:scale-105 hover:text-white
                                    transition-all duration-300 ease-in-out
                                    hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'CHECKING...' : 'SIGN IN'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div className="text-center text-gray-400 mb-4">
                                Verification code sent to {email}
                            </div>
                            <input
                                type="text"
                                placeholder="ENTER VERIFICATION CODE"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-black/25 border-2 border-[#3A0CA3] rounded-[53px] px-6 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50"
                                required
                            />
                            <div className="flex flex-col items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full max-w-[40%] bg-black/25 border-2 border-[#03045E] rounded-[53px] px-6 py-2 text-gray-300 
                                    focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]/50
                                    hover:border-[#3A0CA3] hover:shadow-[0_0_15px_rgba(58,12,163,0.5)] 
                                    hover:scale-105 hover:text-white
                                    transition-all duration-300 ease-in-out
                                    hover:bg-gradient-to-r hover:from-[#03045E]/30 hover:to-[#3A0CA3]/30
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'VERIFYING...' : 'VERIFY CODE'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={loading}
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    Resend verification code
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
