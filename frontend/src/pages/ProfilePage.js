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
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userUpdateProfile } from "../stora/actions/userActions";
import { getMyOrders } from "../stora/actions/orderAction";

import Message from "../components/Message";

function ProfilePage() {
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const userUpdateState = useSelector((state) => state.userUpdate);
  const { loading, error, userInfo: userInfoUpdated } = userUpdateState;

  const userOrdersState = useSelector((state) => state.userOrders);
  const { userOrders } = userOrdersState;

  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(userInfo?.name || "");
  const [username, setUsername] = useState(userInfo?.username || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfile = () => {
    dispatch(userUpdateProfile(email, password, name, username));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfoUpdated?.name) {
      alert("Updated Successfully");
    }
    // get user orders
    dispatch(getMyOrders());
  }, [userInfoUpdated, dispatch]);

  return (
    <Row>
      {error && <Message variant={"danger"}>{error}</Message>}

      <Col md={4} className="mx-auto my-3">
        <Card>
          <i className="fas fa-user mx-auto my-3 display-4"></i>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center">
              <h3>Profile</h3>
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

              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
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

      <Col md={5} className="mx-auto my-3">
        <Card>
          <i
            class="fas fa-shopping-cart mx-auto my-3"
            style={{ fontSize: 20 }}
          ></i>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center">
              <h3>Orders</h3>
            </Card.Title>
            <Container className="d-flex flex-column justify-contents-center ">
              <table className="table table-hover">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">ID</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">PAID</th>
                    <th scope="col">DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders?.map((o) => (
                    <tr key={o._id} className="table-dark">
                      <td>
                        <Link to={`/order/${o._id}`}>{o._id} </Link>
                      </td>
                      <td>{o.createdAt.substring(0, 10)}</td>
                      <td>${o.totalPrice}</td>
                      <td>
                        {o.isPaid ? (
                          o.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "#f00" }}
                          ></i>
                        )}
                      </td>

                      <td>
                        <Link to={`/order/${o._id}`}>
                          <Button className="btn-secondary my-3">Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfilePage;
