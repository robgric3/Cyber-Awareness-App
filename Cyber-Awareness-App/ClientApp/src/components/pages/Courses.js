import React, { useState, useEffect, useCallback } from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import { CourseList } from '../../components/CourseList';
import { CourseDetails } from '../../components/CourseDetails';
import { Quiz } from '../../components/Quiz';
import { COURSES_API_URL, COURSE_COLORS } from '../../quizConstants';
import './Courses.css'; 

export function Courses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [view, setView] = useState('courseList');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        quizQuestions,
        currentQuestionIndex,
        userAnswers,
        quizSubmitted,
        quizScore,
        fetchQuizQuestions,
        handleAnswerChange,
        handleNextQuestion,
        handlePreviousQuestion,
        handleSubmitQuiz,
        quizError,
        isQuizLoading
    } = useQuiz(selectedCourse?.courseId);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(COURSES_API_URL);
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Fetch failed: ', error);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseClick = useCallback((course) => {
        setSelectedCourse(course);
        setView('courseDetails');
    }, []);

    const handleBackClick = useCallback(() => {
        setView('courseList');
    }, []);

    const handleQuizClick = useCallback(() => {
        fetchQuizQuestions();
        setView('quiz');
    }, [fetchQuizQuestions]);

    if (isLoading) return <div className="course-details">Loading courses...</div>;
    if (error) return <div className="course-details">Error: {error}</div>;

    if (view === 'courseList') {
        return <CourseList courses={courses} colors={COURSE_COLORS} onCourseClick={handleCourseClick} />;
    } else if (view === 'courseDetails' && selectedCourse) {
        return <CourseDetails course={selectedCourse} colors={COURSE_COLORS} onBackClick={handleBackClick} onQuizClick={handleQuizClick} />;
    } else if (view === 'quiz') {
        return <Quiz
            quizQuestions={quizQuestions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            quizSubmitted={quizSubmitted}
            quizScore={quizScore}
            handleAnswerChange={handleAnswerChange}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            handleSubmitQuiz={handleSubmitQuiz}
            isLoading={isQuizLoading}
            error={quizError}
        />;
    }
}