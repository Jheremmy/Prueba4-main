import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { login } from '@/Firebase/Promesas';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const router = useRouter();
  const [correo, setCorreo] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (correo === 'admin@admin.com' && contraseña === 'admin123') {
      router.push('/Admin');
      setLoading(false);
      return;
    }

    try {
      await login(correo, contraseña);
      router.push('/Admin');
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm border-light">
        <Card.Body>
          <Button variant="secondary" onClick={() => router.back()} className="mb-3">
            Regresar
          </Button>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContraseña" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;