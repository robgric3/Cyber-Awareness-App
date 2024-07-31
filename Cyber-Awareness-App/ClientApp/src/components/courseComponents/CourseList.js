import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';

export function CourseList({ courses, colors, onCourseClick }) {
    return (
        <Container>
            <Row>
                {courses.map((course, index) => (
                    <Col md={4} key={course.courseId} style={{ marginBottom: '20px' }}>
                        <Card
                            style={{ backgroundColor: colors[index % colors.length] }}
                            onClick={() => onCourseClick(course)}
                        >
                            <CardBody>
                                <h2>{course.courseName}</h2>
                                <p>{course.summary}</p>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    onCourseClick: PropTypes.func.isRequired
};