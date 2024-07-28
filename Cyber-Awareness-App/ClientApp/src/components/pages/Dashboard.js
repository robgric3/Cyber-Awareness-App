import React, { useState, useEffect } from 'react';
import './Dashboard.css';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export function Dashboard() {
    const [userCourses, setUserCourses] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            fetchUserCourses(storedUser.id);
        }
    }, []);

    const fetchUserCourses = async (userId) => {
    setIsLoading(true);
    try {
        const response = await fetch(`https://localhost:7190/UserCourses/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user courses');
        }
        const data = await response.json();
        console.log('Fetched user courses:', data);
        setUserCourses(data);
    } catch (error) {
        console.error('Error fetching user courses:', error);
    } finally {
        setIsLoading(false);
    }
};

    // getProgressBarColor constants
    const MIN_PERCENTAGE = 1;
    const MID_PERCENTAGE = 50;
    const MAX_SCORE = 6;
    const RED_MAX = 255;
    const GREEN_MIN = 165;
    const BLUE_MAX = 149;

    const getProgressBarColor = (score) => {
        const percentage = Math.max(Math.floor(score * 100 / MAX_SCORE), MIN_PERCENTAGE);

        if (percentage <= MID_PERCENTAGE) {
            // Calculate progress from red to orange (0% - 50%)
            const redToOrangeProgress = percentage / MID_PERCENTAGE;
            return `rgb(${RED_MAX}, ${Math.floor(GREEN_MIN * redToOrangeProgress)}, 0)`;
        } else {
            // Calculate progress from orange to green (50% - 100%)
            const orangeToGreenProgress = (percentage - MID_PERCENTAGE) / MID_PERCENTAGE;
            const red = Math.floor(RED_MAX * (1 - orangeToGreenProgress));
            const green = Math.floor(GREEN_MIN + (23 * orangeToGreenProgress));
            const blue = Math.floor(BLUE_MAX * orangeToGreenProgress);
            return `rgb(${red}, ${green}, ${blue})`;
        }
    };

    return (
        <div className="dashboard">
            {isLoading ? (
                <div className="loading">Loading dashboard data...</div>
            ) : user ? (
                <>
                    {userCourses.length > 0 && (
                        <div>
                            <h3>Your Course Progress:</h3>
                            {userCourses.map((course) => (
                                <div key={course.userCourseId} className="course-progress">
                                    <h4>Course {course.courseId}</h4>
                                    <div
                                        className="course-progress-bar"
                                        style={{
                                            backgroundColor: getProgressBarColor(course.score),
                                            width: `${Math.max(Math.floor(course.score * 100 / 6), 5)}%`, // Ensure minimum width is 5%
                                        }}
                                    >
                                        <span className="progress-text">{Math.max(Math.floor(course.score * 100 / 6), 0)}%</span>
                                    </div>
                                    <p>Status: <span className="status-text" style={{ color: getProgressBarColor(course.score) }}>{course.status}</span></p>
                                    <p>Attempt Date: {new Date(course.attemptDate).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <p>User information not available. Please log in.</p>
            )}
        </div>
    );
}