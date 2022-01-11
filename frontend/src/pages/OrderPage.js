import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RemoveFromCart } from "../stora/actions/cartActions";
import { Col, Row, Image, Card, ListGroup, Button } from "react-bootstrap";
import { createOrder } from "../stora/actions/orderAction";
import Message from "../components/Message";

import { ORDER_CREATE_RESET } from "../stora/constants/OrderConstant";
import { CART_RESET } from "../stora/constants/CartConstants";

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod, total } = cart;

  const orderCreate = useSelector((state) => state.order);
  const { order, error, success } = orderCreate;



  cart.shippingPrice = Number(total > 100 ? 10 : 0).toFixed(2);
  cart.taxPrice = Number(0.15 * total).toFixed(2);
  cart.orderItems = cartItems;

  if (!paymentMethod) {
    navigate("/payment");
  }

  const removeFromCart = (id) => {
    dispatch(RemoveFromCart(id));
  };

  const placeOrderHandler = () => {
    // window.location.href = "/profile";
    dispatch(createOrder(cart));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);

      dispatch({
        type: ORDER_CREATE_RESET,
      });

      dispatch({
        type: CART_RESET,
      });

      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
    }
  }, [success]);

  return (
    <Row>
      <h2 className="my-3">PLACE ORDER</h2>

      <Col md={8} className="card border-primary">
        <ListGroup variant="flush" className="mb-3 p-2">
          <ListGroup className="mb-3">
            <h4>SHIPPING</h4>

            <ListGroup.Item>
              <p className="text-muted">Address: {shippingAddress?.address}</p>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup className="mb-3">
            <h4>PAYMENT METHOD</h4>
            <ListGroup.Item>
              <p className="text-muted">
                Method: {paymentMethod && paymentMethod}{" "}
              </p>
            </ListGroup.Item>
          </ListGroup>

          <h4>ORDER ITEMS</h4>

          {cartItems.map((item) => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fluid
                    rounded
                    className="w-25 h-50"
                  />
                </Col>
                <Col md={3} className="text-muted">
                  {item.name}
                </Col>
                <Col md={3} className="text-muted">
                  {" "}
                  {item.qty} x ر.س {item.price} = {" ر.س"}{" "}
                  {parseInt(item.qty) * parseFloat(item.price)}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card className="border-primary  ">
          <h3 className="p-3">Order Summary</h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>
                  {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>ر.س {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>ر.س {cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>
                  ر.س
                  {total}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Button
                  className="bg-success text-dark"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {error && <Message variant={"danger"}>{error}</Message>}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderPage;
