'use client';
import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation'; // For redirection
import Image from 'next/image';
import styles from './loginScreen.module.css';

const LoginScreen = () => {
    const [ldapAuthenticated, setLdapAuthenticated] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Helper function to format the username
    const formatUsername = (username) => {
        const lowerCaseUsername = username.toLowerCase();
        if (!lowerCaseUsername.endsWith('@safaricom.co.ke')) {
            return `${username}@safaricom.co.ke`;
        }
        return username;
    };

    // Handle Login button click
    const handleLogin = async () => {
        if (!ldapAuthenticated) {
            // LDAP Authentication
            try {
                const formattedUsername = formatUsername(username);
                const ldapResponse = await fetch('http://10.184.7.96:10000/v1/ldap/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: formattedUsername, password })
                });

                const ldapData = await ldapResponse.json();

                if (ldapData.ResponseStatus === 'success') {
                    // Save LDAP user data to localStorage
                    const { FullName, Email } = ldapData.Data;
                    localStorage.setItem('FullName', FullName);
                    localStorage.setItem('Email', Email);

                    localStorage.setItem('ldapUserData', JSON.stringify(ldapData.Data));
                    setLdapAuthenticated(true); // Move to SMS Gateway authentication
                    setErrorMsg('');
                    setUsername('');
                    setPassword('');
                } else {
                    setErrorMsg('LDAP authentication failed. Please try again.');
                }
            } catch (error) {
                setErrorMsg('Error during LDAP authentication.');
            }
        } else {
            // SMS Gateway Authentication
            try {
                const smsResponse = await fetch('https://sms-gateway-api.sre-stability.apps.hqocp.safaricom.net/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const smsData = await smsResponse.json();

                if (smsData.statusCode === 200) {
                    const { accessToken, refreshToken } = smsData;

                    // Decode token and get user role
                    const decodedToken = jwtDecode(accessToken);
                    const userRole = decodedToken.role;

                    // Save tokens to localStorage
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    // Redirect based on role
                    if (userRole === 'ADMIN') {
                        router.push('/dashboard');
                    } else {
                        router.push('/home');
                    }
                } else {
                    setErrorMsg('SMS Gateway authentication failed. Please try again.');
                }
            } catch (error) {
                setErrorMsg('Error during SMS Gateway authentication.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.logoWrapper}>
                    {!ldapAuthenticated ? (
                        <Image src='/logo.png' alt='' height='52' width='222' className={styles.logo} />
                    ) : (
                        <h2>SMS Gateway Auth</h2>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button
                    type="button"
                    className={styles.loginBtn}
                    onClick={handleLogin}
                >
                    {ldapAuthenticated ? 'Login to SMS Gateway' : 'Login'}
                </button>
                {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
            </div>
        </div>
    );
};

export default LoginScreen;