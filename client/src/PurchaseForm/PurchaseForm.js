import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const PurchaseForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar la información del formulario a un servidor para procesar la compra
    axios.post('http://localhost:3001/checkout')
    console.log('Form submitted:', formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            variant="outlined"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            variant="outlined"
            name="state"
            value={formValues.state}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ZIP"
            variant="outlined"
            name="zip"
            value={formValues.zip}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Card Number"
            variant="outlined"
            name="cardNumber"
            value={formValues.cardNumber}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Expiration Date"
            variant="outlined"
            name="expDate"
            value={formValues.expDate}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CVV"
            variant="outlined"
            name="cvv"
            value={formValues.cvv}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Purchase
          </Button>
        </Grid>
      </Grid>
    </form>)
}

export default PurchaseForm