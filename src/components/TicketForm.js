import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const shows = [
  { id: 1, name: 'Hamilton', price: 100 },
  { id: 2, name: 'The Lion King', price: 80 },
  { id: 3, name: 'Wicked', price: 90 },
];

const TicketForm = () => {
  const [selectedShow, setSelectedShow] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShowChange = (event) => {
    setSelectedShow(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleBillingInfoChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the billing information here
  };

  const showOptions = shows.map((show) => (
    <option key={show.id} value={show.id}>
      {show.name} (${show.price})
    </option>
  ));

  const selectedShowObj = shows.find((show) => show.id === parseInt(selectedShow));
  const subtotal = selectedShowObj ? selectedShowObj.price * quantity : 0;
  const fees = subtotal * 0.1;
  const total = subtotal + fees;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="border-right rounded p-4 delivery-payment">
          <h2 className="mb-4">Delivery</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={billingInfo.name} onChange={handleBillingInfoChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={billingInfo.email} onChange={handleBillingInfoChange} required />
            </Form.Group>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" name="cardNumber" value={billingInfo.cardNumber} onChange={handleBillingInfoChange} required />
            </Form.Group>
            <Form.Group controlId="formExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="text" name="expiryDate" value={billingInfo.expiryDate} onChange={handleBillingInfoChange} required />
            </Form.Group>
            <Form.Group controlId="formCvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" name="cvv" value={billingInfo.cvv} onChange={handleBillingInfoChange} required />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="border-right rounded p-4 delivery-payment">
          <h2 className="mb-4">Payment</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formShow">
              <Form.Label>Show</Form.Label>
              <Form.Control as="select" name="show" value={selectedShow} onChange={handleShowChange} required>
              <option value="">--Please choose a show--</option>
              {showOptions}
            </Form.Control>
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={quantity} min="1" onChange={handleQuantityChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Calculate Total
            </Button>
          </Form>
        </Col>
        <Col md={6} className="rounded p-4">
          <h2 className="mb-4">Order Details</h2>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Fees: ${fees.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <Button variant="primary" block>
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TicketForm;
