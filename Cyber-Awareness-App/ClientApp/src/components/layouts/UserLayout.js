import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserLayout.css';
import logo from '../../images/cyber-logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook } from '@fortawesome/free-solid-svg-icons';

export function UserLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="layout">
            <div className="sidebar">
                <div className="top">
                    <div className="top-group">
                        <img src={logo} alt="Logo" className="logo" />
                        <a href="/dashboard" className={location.pathname === '/dashboard' ? 'active-link' : ''}><FontAwesomeIcon icon={faHome} /> Dashboard</a>
                        <a href="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}><FontAwesomeIcon icon={faUser} /> Profile</a>
                        <a href="/courses" className={location.pathname === '/courses' ? 'active-link' : ''}><FontAwesomeIcon icon={faBook} /> Courses</a>
                    </div>
                </div>
                <div className="bottom">
                    <button className="custom-button" onClick={handleLogout}>Log out</button>
                </div>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}
