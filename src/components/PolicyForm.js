import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const PolicyForm = ({ onSave, editPolicy }) => {
  const [policy, setPolicy] = useState({
    insured_name: '',
    effective_date: '',
    expiry_date: '',
    vehicle_brand: '',
    vehicle_type: '',
    vehicle_year: '',
    vehicle_price: '',
    premium_rate: '',
    premium_price: ''
  });

  useEffect(() => {
    if (editPolicy) {
      setPolicy(editPolicy);
    }
  }, [editPolicy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy({
      ...policy,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    policy.premium_price = (policy.vehicle_price * (policy.premium_rate / 100)).toFixed(2);
    onSave(policy);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="insured_name" className='mb-3'>
        <Form.Label>Nama Tertanggung</Form.Label>
        <Form.Control type="text" name="insured_name" value={policy.insured_name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="effective_date" className='mb-3'>
        <Form.Label>Tanggal Efektif</Form.Label>
        <Form.Control type="date" name="effective_date" value={policy.effective_date} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="expiry_date" className='mb-3'>
        <Form.Label>Tanggal Expired</Form.Label>
        <Form.Control type="date" name="expiry_date" value={policy.expiry_date} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="vehicle_brand" className='mb-3'>
        <Form.Label>Merek Kendaraan</Form.Label>
        <Form.Control type="text" name="vehicle_brand" value={policy.vehicle_brand} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="vehicle_type" className='mb-3'>
        <Form.Label>Tipe Kendaraan</Form.Label>
        <Form.Control type="text" name="vehicle_type" value={policy.vehicle_type} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="vehicle_year"  className='mb-3'>
        <Form.Label>Tahun Kendaraan</Form.Label>
        <Form.Control type="number" name="vehicle_year" value={policy.vehicle_year} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="vehicle_price" className='mb-3'>
        <Form.Label>Harga Kendaraan</Form.Label>
        <Form.Control type="number" name="vehicle_price" value={policy.vehicle_price} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="premium_rate" className='mb-3'>
        <Form.Label>Rate Premi</Form.Label>
        <Form.Control type="number" step="0.01" name="premium_rate" value={policy.premium_rate} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Save
      </Button>
    </Form>
  );
};

export default PolicyForm;
