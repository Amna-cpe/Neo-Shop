import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown ,FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../stora/actions/userActions";
import SearchBar from "../components/SearchBar";

function Header() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { userInfo: user } = userState;

  useEffect(() => {}, [dispatch]);
  return (
    <header>
      <Navbar bg="primary" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>NeoShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
          <SearchBar  />

            <Nav className="ml-auto" style={{marginLeft:"auto"}}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>

              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {user && (
                <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => dispatch(userLogOut())}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {user?.isAdmin && (
                <NavDropdown title="admin" id="basic-nav-dropdown">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
