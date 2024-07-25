import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registrarUber } from '../Firebase/Promesas';
import { Uber } from '../Interfaces/Ubers';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [vehiculo, setVehiculo] = useState('');
  const [licencia, setLicencia] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const validateForm = () => {
    if (!nombre || !apellido || !email || !telefono || edad === '' || !vehiculo || !licencia) {
      return 'Todos los campos son obligatorios.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'El correo electrónico no es válido.';
    }
    if (isNaN(Number(edad)) || Number(edad) <= 0) {
      return 'La edad debe ser un número positivo.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const nuevoUber: Uber = {
      nombre,
      apellido,
      email,
      telefono,
      edad: Number(edad),
      vehiculo,
      licencia
    };

    try {
      await registrarUber(nuevoUber);
      setExito('Registro exitoso');
      setError('');
      // Limpiar el formulario
      setNombre('');
      setApellido('');
      setEmail('');
      setTelefono('');
      setEdad('');
      setVehiculo('');
      setLicencia('');
    } catch (err) {
      setError('Error al registrar los datos.');
      setExito('');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} href="/">Inicio</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link href="/login" className="text-white">Cerrar Sesión</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-5">
        <h2 className="text-center mb-4">Registrar Nuevo Usuario</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">{exito}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ingrese su teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese su edad"
              value={edad}
              required
            />
          </Form.Group>

          <Form.Group controlId="formVehiculo">
            <Form.Label>Vehículo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su vehículo"
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLicencia">
            <Form.Label>Licencia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su licencia"
              value={licencia}
              onChange={(e) => setLicencia(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Registrar
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Registro;