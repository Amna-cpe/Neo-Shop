import React, { useState } from "react";
import CheckoutProgress from "../components/CheckoutProgress";
import { Form, Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../stora/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const [postalcode, setPostalcode] = useState(
    shippingAddress?.postalcode || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress?.address) {
    navigate("/shipping");
  }

  const submitPayment = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <Row>
      <CheckoutProgress step1 step2 step3 />

      <Card className="w-50 mx-auto border-info">
        <Form className="p-3">
          <h2 className="my-3">PAYMENT</h2>

          <Form.Group className="mb-3">
            <Form.Label as="legend">Select Payment Method</Form.Label>

            <Form.Check
              className="text-success"
              type="radio"
              name="paymentMethod"
              id="paypal"
              value={paymentMethod}
              label="PayPal or Credit Card"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>

          <Button variant="secondary" onClick={submitPayment}>
            Continue
          </Button>
        </Form>
      </Card>
    </Row>
  );
}
