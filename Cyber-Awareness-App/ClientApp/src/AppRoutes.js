// AppRoutes.js
import { UsersPage } from "./components/pages/UsersPage";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Profile } from "./components/pages/Profile";
import { Dashboard } from "./components/pages/Dashboard";
import { Courses } from "./components/pages/Courses";

const AppRoutes = [
    {
        index: true,
        element: <Home />,
        requiresAuth: false
    },
    {
        path: '/users-page',
        element: <UsersPage />,
        requiresAuth: false
    },
    {
        path: '/login',
        element: <Login />,
        requiresAuth: false
    },
    {
        path: '/profile',
        element: <Profile />,
        requiresAuth: true
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        requiresAuth: true
    },
    {
        path: '/courses',
        element: <Courses />,
        requiresAuth: true
    },
];

export default AppRoutes;
