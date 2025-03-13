import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AdminSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Refs for GSAP animations
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const buttonRef = useRef(null);
    const errorRef = useRef(null);

    const CLIENT_ID = 'qwerty@buildersspace9999Revant';
    const CLIENT_SECRET = 'asdfghjkwertyuicvbnmrevantsdfghjk2345678fghjrpeavaarnttkh';
    const BASE_URL = 'https://builderspace.onrender.com/api';

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('adminAccessToken');
            if (accessToken) {
                try {
                    const response = await fetch(
                        `${BASE_URL}/verify-token/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ token: accessToken }),
                        }
                    );

                    if (response.ok) {
                        // Token is valid, redirect to admin portal
                        window.location.href = '/admin/admin-portal';
                    } else {
                        // Token is invalid, try refreshing
                        const refreshToken = localStorage.getItem('adminRefreshToken');
                        if (refreshToken) {
                            await refreshAccessToken(refreshToken);
                        }
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                }
            }
        };

        checkAuth();

        // Initialize animations when component mounts
        const tl = gsap.timeline();

        tl.from(formRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        tl.from(titleRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        }, "-=0.4");

        tl.from([emailRef.current, passwordRef.current], {
            x: -30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");

        tl.from(buttonRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.7)"
        }, "-=0.2");

    }, []);

    // Animation for error message
    useEffect(() => {
        if (error && errorRef.current) {
            gsap.fromTo(
                errorRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [error]);

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/admin/token/refresh/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('adminAccessToken', data.access);

                // Verify the new token
                const verifyResponse = await fetch(
                    `${BASE_URL}/verify-token/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: data.access }),
                    }
                );

                if (verifyResponse.ok) {
                    window.location.href = '/admin/admin-portal';
                } else {
                    // If verification fails, clear tokens
                    localStorage.removeItem('adminAccessToken');
                    localStorage.removeItem('adminRefreshToken');
                }
            } else {
                // If refresh fails, clear tokens
                localStorage.removeItem('adminAccessToken');
                localStorage.removeItem('adminRefreshToken');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('adminAccessToken');
            localStorage.removeItem('adminRefreshToken');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Button loading animation
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.2,
            ease: "power1.inOut"
        });

        try {
            const response = await fetch(
                `${BASE_URL}/api/admin/token/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('adminAccessToken', data.access);
                localStorage.setItem('adminRefreshToken', data.refresh);

                // Success animation before redirect
                gsap.to(formRef.current, {
                    y: -20,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        // Redirect to admin portal
                        window.location.href = '/admin/admin-portal';
                    }
                });
            } else {
                // Reset button animation
                gsap.to(buttonRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1.2, 0.5)"
                });

                const errorData = await response.json();
                setError(errorData.detail || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            // Reset button animation
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "elastic.out(1.2, 0.5)"
            });

            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div ref={formRef} style={styles.formContainer}>
                <div style={styles.logoContainer}>
                    <div style={styles.logo}></div>
                </div>
                <h1 ref={titleRef} style={styles.title}>Admin Sign In</h1>

                {error && <div ref={errorRef} style={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div ref={emailRef} style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <div style={styles.inputWrapper}>
                            <i style={styles.inputIcon}>✉️</i>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div ref={passwordRef} style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <i style={styles.inputIcon}>🔒</i>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button
                        ref={buttonRef}
                        type="submit"
                       
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={styles.decorationBottom}></div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 0%, #2d2d2d 100%)',
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        borderRadius: '12px',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
    },
    decorationBottom: {
        position: 'absolute',
        bottom: '-50px',
        right: '-50px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(140, 82, 255, 0.6) 0%, rgba(140, 82, 255, 0) 70%)',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    logo: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #8c52ff 0%, #5e35b1 100%)',
        boxShadow: '0 4px 10px rgba(94, 53, 177, 0.5)',
        position: 'relative',
    },
    title: {
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '26px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        color: '#e0e0e0',
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '0.5px',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '16px',
        fontSize: '16px',
        color: '#8c52ff',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '14px 16px 14px 40px',
        borderRadius: '8px',
        border: '1px solid #444',
        backgroundColor: 'rgba(45, 45, 45, 0.8)',
        color: '#ffffff',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.3s',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)',
    },
    button: {
        padding: '14px',
        backgroundColor: '#8c52ff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        marginTop: '10px',
        boxShadow: '0 4px 10px rgba(140, 82, 255, 0.5)',
        letterSpacing: '0.5px',
    },
    buttonDisabled: {
        backgroundColor: '#5e35b1',
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    errorMessage: {
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
        color: '#ff6b6b',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        border: '1px solid rgba(220, 53, 69, 0.3)',
        boxShadow: '0 2px 6px rgba(220, 53, 69, 0.15)',
    },
};

export default AdminSignIn;