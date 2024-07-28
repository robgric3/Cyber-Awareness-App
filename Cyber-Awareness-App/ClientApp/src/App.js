import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { GuestLayout } from './components/layouts/GuestLayout';
import { UserLayout } from './components/layouts/UserLayout';
import { Login } from './components/pages/Login';
import useAuth from './hooks/useAuth';

function renderRoutes(routes, Layout, isLoggedIn) {
    return routes.map((route, index) => {
        const { element, requiresAuth, ...rest } = route;
        return (
            <Route
                key={index}
                {...rest}
                element={requiresAuth && !isLoggedIn ? <Navigate to="/login" /> : element}
            />
        );
    });
}


export default function App() {
    const { isAuthPage, isLoading, isLoggedIn } = useAuth();
    const routes = AppRoutes.filter(route => route.path !== '/login');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            {isAuthPage ? (
                <Route path="*" element={
                    <UserLayout>
                        <Routes>
                            {renderRoutes(routes, UserLayout, isLoggedIn)}
                        </Routes>
                    </UserLayout>
                } />
            ) : (
                <Route path="*" element={
                    <GuestLayout>
                        <Routes>
                            {renderRoutes(routes, GuestLayout, isLoggedIn)}
                        </Routes>
                    </GuestLayout>
                } />
            )}
        </Routes>
    );
}