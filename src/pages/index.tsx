import React from 'react';
import { Container, Navbar, Nav, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} href="/">Uber</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} href="/Login">Login</Nav.Link>
                            <Nav.Link as={Link} href="/Registro">Registro</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="flex-grow-1 py-5">
                <Row>
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <h1 className="mb-4">Quiénes Somos</h1>
                            <p className="mb-4">
                                Uber redefine el transporte urbano con una plataforma segura y rápida. Nuestra misión es facilitar la movilidad de forma confiable y eficiente.
                            </p>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <Card.Text>
                                        Explora la historia y los valores que nos definen. Conoce cómo ser parte de nuestro equipo de conductores y descarga la app disponible en iOS y Android. Únete a nosotros hoy.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card className="border-0">
                            <Card.Img variant="top" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_698/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png" alt="Uber" style={{ width: '100%', height: 'auto' }} />
                            <Card.Body>
                                <Card.Text>
                                    <strong>Uber:</strong> Innovando en el transporte urbano. Con una tecnología avanzada, ofrecemos una experiencia de viaje inigualable, conectando a pasajeros con conductores de manera eficiente y segura. ¡Descubre más y únete a la revolución del transporte!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Index;