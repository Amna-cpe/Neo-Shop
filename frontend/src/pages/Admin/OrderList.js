import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getAllOrders } from "../../stora/actions/orderAction";

import Message from "../../components/Message";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const allOrdersState = useSelector((state) => state.allOrders);
  const { orders, loading, error } = allOrdersState;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <Container className=" my-3">
      <Row>
        <Col>
          <h3>Orders</h3>
        </Col>
      </Row>
      {loading ? (
        <Message variant={"info"}>loading..</Message>
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <table className="table table-hover table-bordered table-responsive my-3 table-lg">
          <thead>
            <tr className="table-primary">
              <th scope="col">ID</th>
              <th scope="col">USER</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAID</th>
              <th scope="col">DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o) => (
              <tr key={o._id} className="table-dark">
                <td>
                  <LinkContainer to={`/admin/orderlist/${o._id}`}>
                    <a>{o._id}</a>
                  </LinkContainer>
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${o.user._id}`}>
                    <a>{o.user.name}</a>
                  </LinkContainer>
                </td>
                <td>{o.createdAt.substring(0, 10)}</td>
                <td>${o.totalPrice}</td>
                <td>
                  {o.isPaid ? (
                    o.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "#f00" }}></i>
                  )}
                </td>

                <td>
                  {o.isDelieverd ? (
                    o.delieverdAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "#f00" }}></i>
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
      )}
    </Container>
  );
}

export default OrderList;
