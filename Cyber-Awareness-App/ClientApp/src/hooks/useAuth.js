// useAuth.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const loggedInPages = ['/profile', '/dashboard', '/courses'];
const loginPage = '/login';

export default function useAuth() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = Boolean(localStorage.getItem('user'));
    const isLoginPage = location.pathname === loginPage;
    const isAuthPage = loggedInPages.includes(location.pathname);

    useEffect(() => {
        if (!isLoggedIn && isAuthPage) {
            navigate(loginPage);
        } else if (isLoggedIn && isLoginPage) {
            navigate('/profile');
        }
        setIsLoading(false);
    }, [isLoggedIn, isAuthPage, isLoginPage, location.pathname, navigate]);

    return { isLoggedIn, isLoginPage, isAuthPage, isLoading };
}