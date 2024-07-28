// Profile.js
import React, { useState } from 'react';
import { Card, CardBody, Button } from 'reactstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

export function Profile() {
    const [showPassword, setShowPassword] = useState(false);

    let user;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        console.error("Error parsing user data from local storage:", error);
        user = {}; // Default user data or redirect to login/error page
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="profile">
            <div className="profile-card-container">
                <Card className="profile-card name-card">
                    <CardBody>
                        <h2><FontAwesomeIcon icon={faUser} /> {user.firstName} {user.lastName}</h2>
                    </CardBody>
                </Card>
                <Card className="profile-card email-card">
                    <CardBody>
                        <p>Email: {user.email}</p>
                    </CardBody>
                </Card>
                <Card className="profile-card dob-card">
                    <CardBody>
                        <p>Date of Birth: {formatDate(user.dateOfBirth)}</p>
                    </CardBody>
                </Card>
                <Card className="profile-card password-card">
                    <CardBody>
                        <p>Password: {showPassword ? user.password : '•'.repeat(user.password.length)}</p>
                        <Button onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
