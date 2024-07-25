import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Uber } from '@/Interfaces/Ubers';

interface PerfilProps {
  uber: Uber;
  onEdit: () => void;
  onDelete: () => void;
}

const Perfil: React.FC<PerfilProps> = ({ uber, onEdit, onDelete }) => {
  return (
    <Card className="text-center">
      <Card.Header>Perfil del Uber</Card.Header>
      <Card.Body>
        <Card.Title>{`${uber.nombre} ${uber.apellido}`}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {uber.email} <br />
          <strong>Teléfono:</strong> {uber.telefono} <br />
          <strong>Edad:</strong> {uber.edad} <br />
          <strong>Vehículo:</strong> {uber.vehiculo} <br />
          <strong>Licencia:</strong> {uber.licencia}
        </Card.Text>
        <Button variant="primary" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="danger" onClick={onDelete} className="ms-2">
          Eliminar
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Información del perfil</Card.Footer>
    </Card>
  );
};

export default Perfil;