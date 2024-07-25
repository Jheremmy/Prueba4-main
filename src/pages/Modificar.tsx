import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { obtenerUber, actualizarUber } from '@/Firebase/Promesas';
import { Uber } from '@/Interfaces/Ubers';

const Modificar = () => {
  const router = useRouter();
  const [uber, setUber] = useState<Uber | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    edad: '',
    vehiculo: '',
    licencia: ''
  });

  useEffect(() => {
    const fetchUber = async () => {
      if (router.query.key) {
        const uber = await obtenerUber(router.query.key as string);
        if (uber) {
          setUber(uber);
          setFormData({
            nombre: uber.nombre,
            apellido: uber.apellido,
            email: uber.email,
            telefono: uber.telefono,
            edad: uber.edad.toString(),
            vehiculo: uber.vehiculo,
            licencia: uber.licencia
          });
        } else {
          setError('Uber no encontrado.');
        }
        setLoading(false);
      }
    };

    fetchUber();
  }, [router.query.key]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uber) {
      const updatedUber: Uber = {
        ...uber,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        edad: parseInt(formData.edad),
        vehiculo: formData.vehiculo,
        licencia: formData.licencia
      };

      try {
        await actualizarUber(updatedUber);
        setSuccess('Uber actualizado con éxito.');
        setError('');
        router.push('/listar');
      } catch (error) {
        setError('Error al actualizar el Uber.');
        setSuccess('');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="my-4">
      <h2>Modificar Uber</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {uber && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formVehiculo">
            <Form.Label>Vehículo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vehículo"
              name="vehiculo"
              value={formData.vehiculo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLicencia">
            <Form.Label>Licencia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Licencia"
              name="licencia"
              value={formData.licencia}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Actualizar
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Modificar;