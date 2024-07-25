import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registrarUber } from '../Firebase/Promesas';

const RegistroDatos = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [vehiculo, setVehiculo] = useState('');
  const [licencia, setLicencia] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registrarUber({
        nombre,
        apellido,
        email,
        telefono,
        edad: Number(edad),
        vehiculo,
        licencia
      });
      alert('Registro exitoso');
    } catch (error) {
      alert('Error al registrar');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} href="/">Registro Temático</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Introduce tu edad"
              value={edad}
              onChange={(e) => setEdad(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formVehiculo">
            <Form.Label>Vehículo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el vehículo"
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLicencia">
            <Form.Label>Licencia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce la licencia"
              value={licencia}
              onChange={(e) => setLicencia(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Registrar
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default RegistroDatos;