import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import PolicyForm from './components/PolicyForm';
import PolicyTable from './components/PolicyTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [policies, setPolicies] = useState([]);
  const [show, setShow] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('https://tob-server.vercel.app/api/policies');
      setPolicies(response.data);
    } catch (error) {
      console.error('Error fetching policies', error);
    }
  };

  const handleSave = async (policy) => {
    try {
      if (editPolicy) {
        await axios.put(`https://tob-server.vercel.app/api/policies/${editPolicy.id}`, policy);
        Swal.fire('Updated!', 'Policy has been updated.', 'success');
      } else {
        await axios.post('https://tob-server.vercel.app/api/policies', policy);
        Swal.fire('Added!', 'Policy has been added.', 'success');
      }
      fetchPolicies();
      handleClose();
    } catch (error) {
      console.error('Error saving policy', error);
      Swal.fire('Error!', 'Failed to save policy.', 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://tob-server.vercel.app/api/policies/${id}`);
          fetchPolicies();
          Swal.fire('Deleted!', 'Your policy has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting policy', error);
          Swal.fire('Error!', 'Failed to delete policy.', 'error');
        }
      }
    });
  };

  const handleClose = () => {
    setShow(false);
    setEditPolicy(null);
  };

  const handleShow = () => setShow(true);

  const handleEdit = (policy) => {
    setEditPolicy(policy);
    handleShow();
  };

  return (
    <div className="container">
      <Button className="my-3" onClick={handleShow}>Add Policy</Button>
      <PolicyTable policies={policies} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editPolicy ? 'Edit Policy' : 'Add Policy'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PolicyForm onSave={handleSave} editPolicy={editPolicy} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
