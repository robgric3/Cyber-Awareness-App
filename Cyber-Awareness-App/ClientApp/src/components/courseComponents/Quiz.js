import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Progress } from 'reactstrap';

export function Quiz({
    quizQuestions,
    currentQuestionIndex,
    userAnswers,
    quizSubmitted,
    quizScore,
    handleAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleSubmitQuiz,
    isLoading,
    error
}) {
    if (isLoading) return <div className="quiz-container">Loading quiz...</div>;
    if (error) return <div className="quiz-container">Error: {error}</div>;

    if (quizSubmitted) {
        return (
            <div className="quiz-container quiz-completed">
                <Progress className="quiz-progress" value={100} />
                <h2>Quiz Completed</h2>
                <p>Your score: {quizScore} out of {quizQuestions.length}</p>
                <Button onClick={() => window.location.reload()}>Back to Courses</Button>
            </div>
        );
    }

    if (quizQuestions.length === 0) {
        return <p className="quiz-container">No questions available.</p>;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <Progress className="quiz-progress" value={(currentQuestionIndex / quizQuestions.length) * 100} />
            <h2 className="quiz-title">Question {currentQuestionIndex + 1}</h2>
            <p className="quiz-question">{currentQuestion.questionText}</p>
            <Form className="quiz-options-grid">
                {currentQuestion.options.map((option) => (
                    <Button
                        key={option.optionId}
                        className={`quiz-option-button ${userAnswers[currentQuestionIndex] === option.optionId ? 'selected' : ''}`}
                        onClick={() => handleAnswerChange(currentQuestionIndex, option.optionId)}
                    >
                        {option.optionText}
                    </Button>
                ))}
            </Form>
            <div className="quiz-navigation">
                <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                <div></div>
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>Next</Button>
                ) : (
                    <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
                )}
            </div>
        </div>
    );
}

Quiz.propTypes = {
    quizQuestions: PropTypes.array.isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
    userAnswers: PropTypes.object.isRequired,
    quizSubmitted: PropTypes.bool.isRequired,
    quizScore: PropTypes.number.isRequired,
    handleAnswerChange: PropTypes.func.isRequired,
    handleNextQuestion: PropTypes.func.isRequired,
    handlePreviousQuestion: PropTypes.func.isRequired,
    handleSubmitQuiz: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string
};