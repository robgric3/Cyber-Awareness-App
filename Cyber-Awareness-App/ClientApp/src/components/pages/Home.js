import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './Home.css';

export const Home = () => {
    return (
        <div>
            {/* Custom Jumbotron */}
            <div className="p-5 mb-4 bg-light rounded-3">
                <Container fluid className="py-5">
                    <h1 className="display-3">Cyber Awareness Training</h1>
                    <p className="lead">Empower your team with essential cybersecurity skills</p>
                    <hr className="my-2" />
                    <p>Protect your organization from cyber threats through comprehensive training.</p>
                    <p className="custom-button"> Get Started </p>
                </Container>
            </div>

            {/* Main content */}
            <Container>
                {/* Key Features */}
                <Row className="mb-4">
                    <Col>
                        <h2>Key Features</h2>
                        <ul>
                            <li>Interactive cybersecurity modules</li>
                            <li>Real-world scenario simulations</li>
                            <li>Progress tracking and reporting</li>
                            <li>Customizable training paths</li>
                        </ul>
                    </Col>
                </Row>

                {/* Call to Action Cards */}
                <Row>
                    <Col md={4} >
                        <Card className="custom-card">
                            <CardBody>
                                <CardTitle tag="h5">For Employees</CardTitle>
                                <CardText>Learn essential cybersecurity skills to protect your organization.</CardText>
                                <p className="custom-button">Start Learning</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} >
                        <Card className="custom-card">
                            <CardBody>
                                <CardTitle tag="h5">For Managers</CardTitle>
                                <CardText>Monitor your team's progress and identify areas for improvement.</CardText>
                                <p className="custom-button">View Dashboard</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} >
                        <Card className="custom-card">
                            <CardBody>
                                <CardTitle tag="h5">For Organizations</CardTitle>
                                <CardText>Customize training programs to fit your specific security needs.</CardText>
                                <p className="custom-button">Request Demo</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* Testimonial */}
                <Row className="mt-4">
                    <Col>
                        <blockquote className="blockquote text-center">
                            <p className="mb-4">"This cyber awareness training program has significantly improved our organization's security posture."</p>
                            <footer className="blockquote-footer">John Doe, <cite title="Source Title">CIO of Tech Corp</cite></footer>
                        </blockquote>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
