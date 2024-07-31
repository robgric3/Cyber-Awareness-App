import { useState, useCallback, useEffect } from 'react';
import { QUIZ_API_URL } from '../constants/quizConstants';

export function useQuiz(courseId) {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizError, setQuizError] = useState(null);
    const [isQuizLoading, setIsQuizLoading] = useState(false);


    const fetchQuizQuestions = useCallback(async () => {
        if (!courseId) return;
        setIsQuizLoading(true);
        try {
            const response = await fetch(`${QUIZ_API_URL}/${courseId}`);
            if (!response.ok) throw new Error('Failed to fetch quiz questions');
            const data = await response.json();
            setQuizQuestions(data);
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setQuizSubmitted(false);
            setQuizScore(0);
        } catch (error) {
            console.error('Error:', error);
            setQuizError('Failed to load quiz. Please try again later.');
        } finally {
            setIsQuizLoading(false);
        }
    }, [courseId]);

    const handleNextQuestion = useCallback(() => {
        setCurrentQuestionIndex(prevIndex => {
            const newIndex = prevIndex + 1;
            console.log("current Q: ", newIndex);
            return newIndex;
        });
    }, []);

    const handlePreviousQuestion = useCallback(() => {
        setCurrentQuestionIndex(prevIndex => {
            const newIndex = prevIndex - 1;
            console.log("current Q: ", newIndex);
            return newIndex;
        });
    }, []);

    const handleSubmitQuiz = useCallback(() => {
        // Get the most up-to-date answers
        setUserAnswers(prevAnswers => {
            const finalAnswers = { ...prevAnswers };
            let score = 0;
            quizQuestions.forEach((question, index) => {
                const correctOption = question.options.find(option => option.isCorrect);
                if (finalAnswers[index] === correctOption.optionId) {
                    score++;
                }
            });

            setQuizScore(score);
            setQuizSubmitted(true);

            // Determine the status based on the score
            const status = score === 6 ? 'Full Marks' : score > 3 ? 'Passing Marks' : 'Not Passed';

            // Get the logged-in user from localStorage
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            const userId = loggedInUser ? loggedInUser.id : null;

            // Prepare the data to be sent to the server
            const data = {
                user_id: userId,
                course_id: courseId,
                status: status,
                score: score,
                attempt_date: new Date().toISOString()
            };

            console.log('Data:', data);

            // Make a POST request to the server
            fetch('https://localhost:7190/usercourses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch((error) => console.error('Error:', error));

            return finalAnswers;
        });
    }, [quizQuestions, courseId]);

    const handleAnswerChange = useCallback((questionIndex, optionId) => {
        setUserAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers, [questionIndex]: optionId };
            console.log('Updated answers:', newAnswers);

            // If this is the last question, submit the quiz
            if (questionIndex === quizQuestions.length - 1) {
                setTimeout(() => handleSubmitQuiz(), 0);
            } else {
                handleNextQuestion();
            }

            return newAnswers;
        });
    }, [quizQuestions.length, handleNextQuestion, handleSubmitQuiz]);

    return {
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
    };
}