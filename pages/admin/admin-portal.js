import React, { useState, useEffect } from 'react';

const AdminPortal = () => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Notification/Email form state
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [house, setHouse] = useState('');
    const [sendEmail, setSendEmail] = useState(false);
    const [sendNotification, setSendNotification] = useState(true);
    const [htmlFile, setHtmlFile] = useState(null);
    const [htmlContext, setHtmlContext] = useState('{}');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [messageResponse, setMessageResponse] = useState({ type: '', text: '' });

    // Project stats state
    const [activeTab, setActiveTab] = useState('notifications');
    const [voteData, setVoteData] = useState([]);
    const [likeData, setLikeData] = useState([]);
    const [statsLoading, setStatsLoading] = useState(false);

    // Constants
    const CLIENT_ID = 'qwerty@buildersspace9999Revant';
    const CLIENT_SECRET = 'asdfghjkwertyuicvbnmrevantsdfghjk2345678fghjrpeavaarnttkh';
    const BASE_URL = 'https://builderspace.onrender.com/api';

    useEffect(() => {
        verifyAuthentication();
    }, []);

    const verifyAuthentication = async () => {
        const accessToken = localStorage.getItem('adminAccessToken');

        if (!accessToken) {
            setIsAuthenticated(false);
            setLoading(false);
            window.location.href = '/admin/adminsignin';
            return;
        }

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
                setIsAuthenticated(true);
                setLoading(false);
            } else {
                // Try to refresh the token
                const refreshToken = localStorage.getItem('adminRefreshToken');
                if (refreshToken) {
                    await refreshAccessToken(refreshToken);
                } else {
                    handleSignOut();
                }
            }
        } catch (error) {
            console.error('Error verifying authentication:', error);
            handleSignOut();
        }
    };

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
                    setIsAuthenticated(true);
                    setLoading(false);
                } else {
                    handleSignOut();
                }
            } else {
                handleSignOut();
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            handleSignOut();
        }
    };

    const handleSignOut = async () => {
        const refreshToken = localStorage.getItem('adminRefreshToken');

        if (refreshToken) {
            try {
                await fetch(
                    `${BASE_URL}/token/blacklist/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refresh: refreshToken }),
                    }
                );
            } catch (error) {
                console.error('Error blacklisting token:', error);
            }
        }

        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        setIsAuthenticated(false);
        window.location.href = '/admin/adminsignin';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!title || !message) {
            setMessageResponse({
                type: 'error',
                text: 'Title and message are required.'
            });
            return;
        }

        setSendingMessage(true);
        setMessageResponse({ type: '', text: '' });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('message', message);
        formData.append('email_send', sendEmail);
        formData.append('notification_send', sendNotification);

        if (email) formData.append('email', email);
        if (house) formData.append('house', house);

        if (sendEmail && htmlFile) {
            formData.append('html_file', htmlFile);
            formData.append('html_context', htmlContext);
        }

        try {
            const accessToken = localStorage.getItem('adminAccessToken');
            const response = await fetch(
                `${BASE_URL}/send-notifications-and-emails/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                setMessageResponse({
                    type: 'success',
                    text: data.message
                });

                // Reset form
                setTitle('');
                setMessage('');
                setEmail('');
                setHouse('');
                setHtmlFile(null);
                setHtmlContext('{}');
            } else {
                const errorData = await response.json();
                setMessageResponse({
                    type: 'error',
                    text: errorData.error || 'Failed to send message.'
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessageResponse({
                type: 'error',
                text: 'An error occurred while sending the message.'
            });
        } finally {
            setSendingMessage(false);
        }
    };

    const fetchProjectStats = async (type) => {
        setStatsLoading(true);

        try {
            const accessToken = localStorage.getItem('adminAccessToken');
            const endpoint = type === 'votes'
                ? 'get-vote-count-for-all-projects'
                : 'get-like-count-for-all-projects';

            const response = await fetch(
                `${BASE_URL}/${endpoint}/?CLIENT_ID=${CLIENT_ID}&CLIENT_SECRET=${CLIENT_SECRET}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (type === 'votes') {
                    setVoteData(data);
                } else {
                    setLikeData(data);
                }
            } else {
                console.error('Failed to fetch project stats');
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        } finally {
            setStatsLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === 'votes' && voteData.length === 0) {
            fetchProjectStats('votes');
        } else if (tab === 'likes' && likeData.length === 0) {
            fetchProjectStats('likes');
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={styles.loadingText}>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Admin Portal</h1>
                <button onClick={handleSignOut} style={styles.signOutButton}>
                    Sign Out
                </button>
            </header>

            <div style={styles.tabsContainer}>
                <button
                    style={activeTab === 'notifications' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
                    onClick={() => handleTabChange('notifications')}
                >
                    Send Notifications
                </button>
                <button
                    style={activeTab === 'votes' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
                    onClick={() => handleTabChange('votes')}
                >
                    Project Votes
                </button>
                <button
                    style={activeTab === 'likes' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
                    onClick={() => handleTabChange('likes')}
                >
                    Project Likes
                </button>
            </div>

            <div style={styles.contentContainer}>
                {activeTab === 'notifications' && (
                    <div style={styles.formSection}>
                        <h2 style={styles.sectionTitle}>Send Notifications & Emails</h2>

                        {messageResponse.text && (
                            <div style={messageResponse.type === 'success' ? styles.successMessage : styles.errorMessage}>
                                {messageResponse.text}
                            </div>
                        )}

                        <form onSubmit={handleSendMessage} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Title*</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={styles.input}
                                    placeholder="Notification title"
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Message*</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{ ...styles.input, ...styles.textarea }}
                                    placeholder="Notification message"
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Target (leave empty to send to all)</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={styles.input}
                                    placeholder="Specific user email (optional)"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>House</label>
                                <input
                                    type="text"
                                    value={house}
                                    onChange={(e) => setHouse(e.target.value)}
                                    style={styles.input}
                                    placeholder="House name (optional)"
                                />
                            </div>

                            <div style={styles.checkboxGroup}>
                                <div style={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        id="sendNotification"
                                        checked={sendNotification}
                                        onChange={(e) => setSendNotification(e.target.checked)}
                                    />
                                    <label htmlFor="sendNotification" style={styles.checkboxLabel}>
                                        Send as notification
                                    </label>
                                </div>

                                <div style={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        id="sendEmail"
                                        checked={sendEmail}
                                        onChange={(e) => setSendEmail(e.target.checked)}
                                    />
                                    <label htmlFor="sendEmail" style={styles.checkboxLabel}>
                                        Send as email
                                    </label>
                                </div>
                            </div>

                            {sendEmail && (
                                <>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>HTML Template</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setHtmlFile(e.target.files[0])}
                                            style={styles.fileInput}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>HTML Context (JSON)</label>
                                        <textarea
                                            value={htmlContext}
                                            onChange={(e) => setHtmlContext(e.target.value)}
                                            style={{ ...styles.input, ...styles.textarea }}
                                            placeholder='{"key": "value"}'
                                        />
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                style={sendingMessage ? { ...styles.submitButton, ...styles.buttonDisabled } : styles.submitButton}
                                disabled={sendingMessage}
                            >
                                {sendingMessage ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'votes' && (
                    <div style={styles.statsSection}>
                        <h2 style={styles.sectionTitle}>Project Votes</h2>
                        <button
                            onClick={() => fetchProjectStats('votes')}
                            style={styles.refreshButton}
                            disabled={statsLoading}
                        >
                            {statsLoading ? 'Loading...' : 'Refresh Data'}
                        </button>

                        {statsLoading ? (
                            <div style={styles.loadingContainer}>
                                <div style={styles.loadingSpinner}></div>
                                <p style={styles.loadingText}>Loading vote data...</p>
                            </div>
                        ) : (
                            <div style={styles.tableContainer}>
                                {voteData.length > 0 ? (
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.tableHeader}>Participant</th>
                                                <th style={styles.tableHeader}>Email</th>
                                                <th style={styles.tableHeader}>Project Title</th>
                                                <th style={styles.tableHeader}>Votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voteData.map((item, index) => (
                                                <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                                    <td style={styles.tableCell}>{item.participant_name}</td>
                                                    <td style={styles.tableCell}>{item.participant_email}</td>
                                                    <td style={styles.tableCell}>{item.project_idea_title}</td>
                                                    <td style={styles.tableCell}>{item.vote_counts}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p style={styles.noDataMessage}>No vote data available</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'likes' && (
                    <div style={styles.statsSection}>
                        <h2 style={styles.sectionTitle}>Project Likes</h2>
                        <button
                            onClick={() => fetchProjectStats('likes')}
                            style={styles.refreshButton}
                            disabled={statsLoading}
                        >
                            {statsLoading ? 'Loading...' : 'Refresh Data'}
                        </button>

                        {statsLoading ? (
                            <div style={styles.loadingContainer}>
                                <div style={styles.loadingSpinner}></div>
                                <p style={styles.loadingText}>Loading like data...</p>
                            </div>
                        ) : (
                            <div style={styles.tableContainer}>
                                {likeData.length > 0 ? (
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.tableHeader}>Participant</th>
                                                <th style={styles.tableHeader}>Email</th>
                                                <th style={styles.tableHeader}>Project Title</th>
                                                <th style={styles.tableHeader}>Likes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {likeData.map((item, index) => (
                                                <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                                    <td style={styles.tableCell}>{item.participant_name}</td>
                                                    <td style={styles.tableCell}>{item.participant_email}</td>
                                                    <td style={styles.tableCell}>{item.project_idea_title}</td>
                                                    <td style={styles.tableCell}>{item.like_counts}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p style={styles.noDataMessage}>No like data available</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#e0e0e0',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #333',
    },
    headerTitle: {
        color: '#ffffff',
        margin: 0,
        fontSize: '24px',
    },
    signOutButton: {
        padding: '8px 16px',
        backgroundColor: '#ff4757',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    tabsContainer: {
        display: 'flex',
        borderBottom: '1px solid #333',
        backgroundColor: '#1a1a1a',
    },
    tabButton: {
        padding: '15px 20px',
        backgroundColor: 'transparent',
        color: '#b0b0b0',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.3s',
    },
    activeTab: {
        color: '#8c52ff',
        borderBottom: '3px solid #8c52ff',
        backgroundColor: '#222222',
    },
    contentContainer: {
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    formSection: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    statsSection: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
        color: '#ffffff',
        marginTop: 0,
        marginBottom: '25px',
        fontSize: '20px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        color: '#e0e0e0',
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '12px 16px',
        borderRadius: '4px',
        border: '1px solid #333',
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        fontSize: '16px',
        outline: 'none',
    },
    textarea: {
        minHeight: '100px',
        resize: 'vertical',
    },
    checkboxGroup: {
        display: 'flex',
        gap: '20px',
        marginTop: '10px',
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    checkboxLabel: {
        color: '#e0e0e0',
        fontSize: '14px',
    },
    fileInput: {
        padding: '10px',
        backgroundColor: '#2d2d2d',
        borderRadius: '4px',
        border: '1px solid #333',
        color: '#e0e0e0',
    },
    submitButton: {
        padding: '14px',
        backgroundColor: '#8c52ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
    },
    buttonDisabled: {
        backgroundColor: '#5e35b1',
        cursor: 'not-allowed',
    },
    successMessage: {
        backgroundColor: 'rgba(46, 213, 115, 0.2)',
        color: '#2ed573',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    errorMessage: {
        backgroundColor: 'rgba(255, 71, 87, 0.2)',
        color: '#ff4757',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
    },
    loadingSpinner: {
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #8c52ff',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: '#b0b0b0',
        marginTop: '15px',
        fontSize: '16px',
    },
    tableContainer: {
        overflowX: 'auto',
        marginTop: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    tableHeader: {
        padding: '12px 15px',
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        fontWeight: '600',
        borderBottom: '2px solid #333',
    },
    tableRowEven: {
        backgroundColor: '#1e1e1e',
    },
    tableRowOdd: {
        backgroundColor: '#252525',
    },
    tableCell: {
        padding: '12px 15px',
        borderBottom: '1px solid #333',
    },
    noDataMessage: {
        textAlign: 'center',
        padding: '30px',
        color: '#b0b0b0',
        fontSize: '16px',
    },
    refreshButton: {
        padding: '8px 16px',
        backgroundColor: '#2d2d2d',
        color: '#e0e0e0',
        border: '1px solid #444',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
};

export default AdminPortal;