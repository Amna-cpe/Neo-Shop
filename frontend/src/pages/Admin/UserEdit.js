import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Container,
} from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, userUpdateById } from "../../stora/actions/userActions";

import Message from "../../components/Message";
function UserEdit() {
  const params = useParams();

  const userByIdState = useSelector((state) => state.userById);
  const { userInfo, loading, error } = userByIdState;

  const userUpdateByIdState = useSelector((state) => state.userUpdateById);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success
  } = userUpdateByIdState;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfile = () => {
    dispatch(userUpdateById(email, name, username, isAdmin, params.id));
  };

  useEffect(() => {
    if (success) {
      alert("Updated Successfully");
    }
    console.log("the params is ", params.id)
    // get user orders
    if (!userInfo?.name ) {
      dispatch(getUserById(params.id));
    } else {
      console.log("the user info is", userInfo)
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUsername(userInfo.username);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [userInfo, params.id, dispatch ]);

  return (
    <Row>
      {loading || loadingEdit ? (
        <Message variant={"info"}>Loading..</Message>
      ) : error || errorEdit ? (
        <Message variant={"danger"}>{error || errorEdit}</Message>
      ) : (
        <Col md={4} className="mx-auto my-3">
          <Card>
            <i className="fas fa-user mx-auto my-3 display-4"></i>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                <h3>{name}</h3>
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <Form.Check
                    className="text-success"
                    type="checkbox"
                    name="isAdmin"
                    id="paypal"
                    label="Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
                <Button
                  variant="secondary d-flex justify-content-center"
                  onClick={updateProfile}
                >
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default UserEdit;
