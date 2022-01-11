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
import { getUserList, deleteUserById } from "../../stora/actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../../components/Message";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const userListState = useSelector((state) => state.userList);
  const { users, loading, error } = userListState;

  const userDeleteState = useSelector((state) => state.userDelete);
  const {
    success,
    loading: loadingDeletion,
    error: errorDeletion,
  } = userDeleteState;

  useEffect(() => {
    dispatch(getUserList());
  }, [success, dispatch]);

  const handleDelete = (user_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserById(user_id));
    }
  };

  return (
    <Container className=" my-3">
      <h1>Users</h1>
      {loading ? (
        <Message variant={"info"}>loading..</Message>
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <table className="table table-hover table-bordered table-responsive my-3 table-lg">
          <thead>
            <tr className="table-primary">
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="table-dark">
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "#0f0" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "#f00" }}></i>
                  )}
                </td>

                <td className="d-flex justify-content-end">
                  {user._id !== userInfo.id ? (
                    <>
                      {" "}
                      <LinkContainer to={`/admin/user/${user._id}`}>
                        <Button className="mx-3">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </>
                  ) : (
                    <strong>CURRENTLY LOGGED IN</strong>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}

export default UserList;
