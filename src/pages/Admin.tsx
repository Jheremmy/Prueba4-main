import React from 'react';
import { Container, Navbar, Nav, Card, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const router = useRouter();

  return (
    <Container className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Cerrar Sesión</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Registro">Registrar Nuevo Usuario</Nav.Link>
            <Nav.Link href="/Registro_datos">Registro de Datos</Nav.Link>
            <Nav.Link href="/Listar">Listar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4 flex-grow-1">
        <Button variant="secondary" onClick={() => router.back()} className="mb-4">
          Regresar
        </Button>
        <Row className="g-4">
          <Col lg={3} md={6}>
            <Card className="text-center shadow-sm border-light">
              <Card.Body>
                <Card.Title>Registrar Nuevo Usuario</Card.Title>
                <Card.Text>
                  Registrar un nuevo usuario para el perfil.
                </Card.Text>
                <Card.Link href="/Registro">Ir a Registro</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6}>
            <Card className="text-center shadow-sm border-light">
              <Card.Body>
                <Card.Title>Registro de Datos</Card.Title>
                <Card.Text>
                  Registrar datos personales detallados.
                </Card.Text>
                <Card.Link href="/Registro_datos">Ir a Registro de Datos</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6}>
            <Card className="text-center shadow-sm border-light">
              <Card.Body>
                <Card.Title>Actualizar Datos</Card.Title>
                <Card.Text>
                  Modificar datos personales previamente registrados.
                </Card.Text>
                <Card.Link href="/Modificar">Ir a Modificar</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6}>
            <Card className="text-center shadow-sm border-light">
              <Card.Body>
                <Card.Title>Listar</Card.Title>
                <Card.Text>
                  Listar todas las personas con datos registrados.
                </Card.Text>
                <Card.Link href="/Listar">Ir a Listar</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Admin;