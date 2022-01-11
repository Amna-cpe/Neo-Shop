import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../stora/actions/userActions";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { loading, error, userInfo } = userState;

  const registerUser = () => {
    // login with email and password
    dispatch(userRegister(email, password, name, username));
  };

  useEffect(() => {
    // if succefull trans to home page
    if (userInfo) {
      navigate("/");
    }
  }, [error, dispatch ,userInfo]);

  return (
    <Col md={3} className="mx-auto my-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <small>
            Alredy have an account? <Link to="/login"> login</Link>
          </small>

          {error && (
            <Form.Text className="text-danger"><br/>{error}</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" onClick={registerUser}>
          Submit
        </Button>
      </Form>
    </Col>
  );
}

export default Register;
