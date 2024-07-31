import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import logo from '../../images/cyber-logo.jpg';

export function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    //Check if a user is logged in on page render and if so redirect to profile page
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            login(user);
        }
    }, [navigate]);

    const login = (user) => {
        setIsLoggedIn(true);
        setUser(user);
        navigate('/profile'); 
    }

    const handleLogin = () => {
        setIsProcessing(true);
        fetch('https://localhost:7190/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                login(user);
            })
            .catch(error => {
                setError('Wrong username or password, please try again');
            })
            .finally(() => {
                setIsProcessing(false);
            });
    };

    // If user is already logged in, redirect to user homepage
    if (isLoggedIn && location.pathname === '/login') {
        navigate('/profile');
    }

    return (
        <div>
            <Container className="login-container">
                <div className="card-container">
                    <Card className="login-card">
                        <CardBody>
                            <h1 className="display-3">
                                <img src={logo} alt="Logo" className="logo" />
                                <span className="title">CYBER AWARENESS</span>
                            </h1>
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="login-input" />
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="login-input" />
                            <p className={`custom-button ${isProcessing ? 'disabled' : ''}`} onClick={!isProcessing ? handleLogin : null}>
                                {isProcessing ? 'Processing...' : 'Log in'}
                            </p>
                            {error && <p>{error}</p>}
                        </CardBody>
                    </Card>
                    <Card className="signup-card">
                        <CardBody>
                            <CardTitle tag="h3">New to Cyber Awareness?</CardTitle>
                            <CardText>If you are a new user, please click here to create a new account.</CardText>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        </div>
    );
}
