import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button } from 'reactstrap';

export function CourseDetails({ course, colors, onBackClick, onQuizClick }) {
    return (
        <div className="course-details">
            <div className="course-card-container">
                <Card className="course-card" style={{ gridArea: 'title', backgroundColor: colors[0] }}>
                    <CardBody>
                        <h2>{course.courseName}</h2>
                    </CardBody>
                </Card>
                <div className="content-container" style={{ gridArea: 'content' }}>
                    <Button className="side-button back-button" onClick={onBackClick}>Back to Courses</Button>
                    <Card className="course-card">
                        <CardBody>
                            <iframe
                                width="560"
                                height="315"
                                src={course.videoUrl}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={course.courseName}
                            ></iframe>
                            <p>{course.summary}</p>
                        </CardBody>
                    </Card>
                    <Button className="side-button quiz-button" onClick={onQuizClick}>Go to Quiz</Button>
                </div>
            </div>
        </div>
    );
}

CourseDetails.propTypes = {
    course: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onQuizClick: PropTypes.func.isRequired
};