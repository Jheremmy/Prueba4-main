import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { obtenerUbers, eliminarUber } from '../Firebase/Promesas';
import { Uber } from '../Interfaces/Ubers';
import { useRouter } from 'next/router';

const Listar = () => {
  const [ubers, setUbers] = useState<Uber[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUbers = async () => {
      try {
        const data = await obtenerUbers();
        setUbers(data);
      } catch (error) {
        console.error("Error fetching Uber data:", error);
      }
    };

    fetchUbers();
  }, []);

  const handleEdit = (key: string) => {
    router.push(`/Modificar/${key}`);
  };

  const handleDelete = async (key: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      try {
        //await eliminarUber({ key });
        setUbers(ubers.filter(uber => uber.key !== key));
      } catch (error) {
        console.error("Error deleting Uber:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Listado de Ubers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Edad</th>
            <th>Vehículo</th>
            <th>Licencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ubers.map((uber) => (
            <tr key={uber.key}>
              <td>{uber.nombre}</td>
              <td>{uber.apellido}</td>
              <td>{uber.email}</td>
              <td>{uber.telefono}</td>
              <td>{uber.edad}</td>
              <td>{uber.vehiculo}</td>
              <td>{uber.licencia}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(uber.key!)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(uber.key!)} className="ms-2">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Listar;