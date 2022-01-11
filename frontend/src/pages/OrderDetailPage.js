import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RemoveFromCart } from "../stora/actions/cartActions";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Image, Card, ListGroup, Button } from "react-bootstrap";
import {
  getOrderDetail,
  payOrder,
  markAsDelevered,
} from "../stora/actions/orderAction";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";

import {
  ORDER_PAY_RESET,
  ORDER_DETAIL_RESET,
  ORDER_DELEVER_RESET,
} from "../stora/constants/OrderConstant";

function OrderDetailPage() {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const orderDetailState = useSelector((state) => state.orderDetails);
  const user = useSelector((state) => state.user);
  const orderDelever = useSelector((state) => state.orderDelever);
  const orderPayState = useSelector((state) => state.orderPay);

  const { orderDetail, error, loading } = orderDetailState;
  const { success: delieverdSuccessfully } = orderDelever;

  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPayState;

  console.log("the env is ", process.env)
  const client_id = process.env.REACT_APP_CLIENT_ID

  const addPayPalScript = async () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!user.userInfo) {
      navigate("/login");
    }
    if (!orderDetail || successPay || delieverdSuccessfully) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({
        type: ORDER_DELEVER_RESET,
      });
      dispatch(getOrderDetail(id));
    } else if (!orderDetail?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, orderDetail, delieverdSuccessfully]);

  const paymentSuccess = async (details, paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    dispatch({ type: ORDER_DETAIL_RESET });
  };

  const markAsDelivered = () => {
    dispatch(markAsDelevered(id));
  };

  return (
    <Row>
      <h2 className="my-3">ORDER</h2>
      {loading ? (
        <Message variant={"info"}>Loading..</Message>
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : !orderDetail ? (
        <Link to="/login">Must Login, to show the items</Link>
      ) : (
        <>
          <Col md={8} className="card border-primary">
            <ListGroup variant="flush" className="mb-3 p-2">
              <ListGroup className="mb-3">
                <h4>USER</h4>

                <ListGroup.Item>
                  <p className="text-muted">User: {orderDetail?.user.name}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <a
                    className="text-muted"
                    href={`mailto:${orderDetail?.user.email}`}
                  >
                    Email: {orderDetail?.user.email}
                  </a>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup className="mb-3">
                <h4>SHIPPING</h4>

                <ListGroup.Item>
                  <p className="text-muted">
                    Address: {orderDetail?.shippingAddress?.address}
                  </p>
                </ListGroup.Item>
                {orderDetail?.isDelieverd ? (
                  <Message variant="success">
                    <p className="text-dark">
                      Delievered on {orderDetail?.delieverdAt}
                    </p>
                  </Message>
                ) : (
                  <Message variant="warning">
                    <p className="text-white">Not Delievered yet</p>
                  </Message>
                )}
              </ListGroup>

              <ListGroup className="mb-3">
                <h4>PAYMENT METHOD</h4>
                <ListGroup.Item>
                  <p className="text-muted">
                    Method:{" "}
                    {orderDetail?.paymentMethod && orderDetail?.paymentMethod}{" "}
                  </p>
                </ListGroup.Item>
                {orderDetail?.isPaid ? (
                  <Message variant="success">
                    <p className="text-dark">
                      Paid on {orderDetail?.paidAt.substring(0, 10)}
                    </p>
                  </Message>
                ) : (
                  <Message variant="warning">
                    <p className="text-white">Not paid yet</p>
                  </Message>
                )}
              </ListGroup>

              <h4>ORDER ITEMS</h4>

              {orderDetail?.orders.map((item) => (
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
                      {orderDetail?.orders.reduce(
                        (acc, item) => acc + parseInt(item.qty),
                        0
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>ر.س {orderDetail?.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>ر.س {orderDetail?.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      ر.س
                      {orderDetail?.totalPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>ordered at</Col>
                    <Col>{orderDetail?.createdAt.substring(0, 10)}</Col>
                  </Row>
                </ListGroup.Item>

                {/* PayPalButton */}
                {!orderDetail?.isPaid && (
                  <ListGroup.Item>
                    <Row>
                      {loadingPay && <h1>loading..</h1>}
                      {!sdkReady ? (
                        <h1>loading..</h1>
                      ) : (
                        // <PayPalButton
                        //   amount={orderDetail?.totalPrice}
                        //   onSuccess={(details, paymentResult) =>
                        //     dispatch(payOrder(id, paymentResult))
                        //   }
                        // />
                        <PayPalButton
                          amount={orderDetail?.totalPrice}
                          onSuccess={paymentSuccess}
                        />
                      )}
                    </Row>
                  </ListGroup.Item>
                )}

                {!orderDetail?.isDelieverd &&
                  orderDetail.isPaid &&
                  user.userInfo?.isAdmin && (
                    <ListGroup.Item>
                      <Row>
                        <Button className="btn-info" onClick={markAsDelivered}>
                          <h4>MARK AS DELIEVERED</h4>
                        </Button>
                      </Row>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
}

export default OrderDetailPage;
