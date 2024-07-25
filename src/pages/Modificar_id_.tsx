import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { obtenerUber, actualizarUber } from '../Firebase/Promesas';
import { Uber } from '../Interfaces/Ubers';

const Modificar_id_ = () => {
    const [uber, setUber] = useState<Uber | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchUber = async () => {
            if (typeof id === 'string') {
                try {
                    const uberData = await obtenerUber(id);
                    setUber(uberData);
                } catch (error) {
                    setError("Error al obtener los datos del Uber.");
                }
            }
        };

        fetchUber();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (uber) {
            setUber({ ...uber, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (uber) {
            try {
                await actualizarUber(uber);
                setSuccess("Uber actualizado exitosamente.");
                setError(null);
            } catch (error) {
                setError("Error al actualizar el Uber.");
                setSuccess(null);
            }
        }
    };

    if (!uber) return <p>Cargando...</p>;

    return (
        <Container className="my-4">
            <h2>Modificar Uber</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={uber.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        name="apellido"
                        value={uber.apellido}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={uber.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefono"
                        value={uber.telefono}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control
                        type="number"
                        name="edad"
                        value={uber.edad}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Vehículo</Form.Label>
                    <Form.Control
                        type="text"
                        name="vehiculo"
                        value={uber.vehiculo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Licencia</Form.Label>
                    <Form.Control
                        type="text"
                        name="licencia"
                        value={uber.licencia}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Actualizar
                </Button>
            </Form>
        </Container>
    );
};

export default Modificar_id_;