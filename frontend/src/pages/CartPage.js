import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RemoveFromCart } from "../stora/actions/cartActions";
import {
  Col,
  Row,
  Image,
  Card,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import Message from "../components/Message";

function CartPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const productId = params.id;
  const qty = window.location.href ? window.location.href.split("=")[1] : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (qty) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCart = (id) => {
    dispatch(RemoveFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Row>
     
      <h2 className="my-3">shopping cart</h2>
     
      <Col md={8} className="card border-secondary ">
       
        {!cartItems || cartItems.length === 0 ? (
          <Message variant="Warning">
            Your Cart Is Empty just like your soul <Link to="/"> Go Home</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((op) => (
                        <option key={op + 1} value={op + 1}>
                          {op + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => removeFromCart(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
                          
      <Col md={4}>
        <Card className="border-secondary  ">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Subtotal Items</Col>
                <Col>
                  <string>
                    {cartItems?.reduce(
                      (acc, item) => acc + parseInt(item.qty),
                      0
                    )}
                  </string>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Subtotal Price</Col>
                <Col>
                  <string>
                    {cartItems?.reduce(
                        (acc, item) =>
                          acc + parseInt(item.qty) * parseFloat(item.price),
                        0
                      )
                      .toFixed(2)}{" "}
                    SAR.
                  </string>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Button
                  className="secondary"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
