import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PolicyTable = ({ policies, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>Nomor Polis</th>
          <th>Nama Tertanggung</th>
          <th>Periode</th>
          <th>Nama Item</th>
          <th>Harga Pertanggungan</th>
          <th>Harga Premi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy) => (
          <tr key={policy.id}>
            <td>{policy.policy_number}</td>
            <td>{policy.insured_name}</td>
            <td>{`${policy.effective_date} - ${policy.expiry_date}`}</td>
            <td>{`${policy.vehicle_brand} - ${policy.vehicle_type}`}</td>
            <td>{policy.vehicle_price}</td>
            <td>{policy.premium_price}</td>
            <td>
            <div className='d-flex'>
              <Button variant="warning" onClick={() => onEdit(policy)}>
                <FontAwesomeIcon icon={faEdit} /> 
              </Button>
              <Button variant="danger" onClick={() => onDelete(policy.id)} className="ms-2">
                <FontAwesomeIcon icon={faTrashAlt} /> 
              </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PolicyTable;
