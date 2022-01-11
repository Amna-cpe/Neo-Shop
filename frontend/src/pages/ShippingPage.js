import React, { useEffect, useState } from "react";
import CheckoutProgress from "../components/CheckoutProgress";
import { Form, Button, Container, Card , Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../stora/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

export default function ShippingPage() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [postalcode, setPostalcode] = useState(
    shippingAddress?.postalcode || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveTheShippingAddress = () => {
    dispatch(
      saveShippingAddress({
        address,
        country,
        city,
        postalcode,
      })
    );
    navigate("/payment");
  };

  return (
    <Row>
      <CheckoutProgress step1 step2  />

      <Card className="w-50 mx-auto border-success">
        <Form className="p-3">
          <h2 className="my-3">SHIPPING</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>country</Form.Label>
            <Form.Control
              type="country"
              placeholder="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>city</Form.Label>
            <Form.Control
              type="city"
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>postalcode</Form.Label>
            <Form.Control
              type="postalcode"
              placeholder="postalcode"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
            />
          </Form.Group>

          <Button variant="secondary" onClick={saveTheShippingAddress}>
            Continue
          </Button>
        </Form>
      </Card>
    </Row>
  );
}
