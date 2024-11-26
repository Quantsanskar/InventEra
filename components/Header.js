import React from 'react';

const Header = () => {
    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            backgroundColor: 'rgb(10 9 9)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Roboto Mono", monospace',
            letterSpacing: '1px',
        },
        logo: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
        },
        login: {
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            color: '#c0c0c0',
        },
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>Inventra</div>
            <div style={styles.login}>login to sage</div>
        </header>
    );
};

export default Header;