import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogIn } from "../stora/actions/userActions";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { loading, error, userInfo } = userState;

  const Login = () => {
    // login with email and password
    dispatch(userLogIn(email, password));
  };

  useEffect(() => {
    // if succefull trans to home page
    if (userInfo && !loading && !error) {
      navigate(-1);
    }
  }, [error, dispatch, userInfo]);

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
          {error && (
            <Form.Text className="text-danger">
              <br />
              {error.username}
            </Form.Text>
          )}
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
        {error && (
          <Form.Text className="text-danger">{error.password}</Form.Text>
        )}

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <small>
            don't have an account? <Link to="/register"> register</Link>
          </small>

          {error && (
            <Form.Text className="text-danger">
              <br />
              {!error.username && !error.password && error}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" onClick={Login}>
          Submit
        </Button>
      </Form>
    </Col>
  );
}

export default LoginPage;
