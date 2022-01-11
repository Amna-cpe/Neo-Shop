import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Image } from "react-bootstrap";
import { useNavigate ,useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../stora/actions/productActions";
import { PRODUCT_DETAILS_RESET } from "../../stora/constants/productConstants";
import Paginate from "../../components/Paginate"
import Message from "../../components/Message";
function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();



  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const productListState = useSelector((state) => state.productList);
  const { products, loading, error , page , pages } = productListState;

  const productDeleteState = useSelector((state) => state.productDelete);
  const { success } = productDeleteState;

  const productCreateState = useSelector((state) => state.productCreate);
  const { success: creationSuccess } = productCreateState;

  const keyword = searchParams.get("keyword")
  const pageFromUrl = searchParams.get("page") || 1

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts("" , pageFromUrl));
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, success, creationSuccess , pageFromUrl]);

  const handleDelete = (product_id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(deleteProduct(product_id));
    }
  };

  const handleCreatProduct = () => {
    if (window.confirm("Are you sure you want to create a Product?")) {
      dispatch(createProduct());
    }
  };

  return (
    <Container className=" my-3">
      <Row>
        <Col>
          <h3>Products</h3>
        </Col>

        <Col>
          <Button
            className="btn-secondary float-end"
            onClick={handleCreatProduct}
          >
            Create Product
          </Button>
          
        </Col>
      </Row>
      {loading ? (
        <Message variant={"info"}>loading..</Message>
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <div>

       
        <table className="table table-hover table-bordered table-responsive my-3 table-lg">
          <thead>
            <tr className="table-primary">
              <th>ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>QTY</th>
              <th>USER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="table-dark">
                <td>{product._id}</td>
                <td>
                  <Image
                    style={{ width: "50px", height: "50px" }}
                    src={product.image}
                    alt={product.name}
                    fluid
                    rounded
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.countInStock}</td>

                <td>
                  <LinkContainer to={`/admin/user/${product.user}`}>
                    <a>{product.user}</a>
                  </LinkContainer>
                </td>

                <td>
                  <LinkContainer
                    to={`/admin/productlist/${product._id}`}
                    className="float-end"
                  >
                    <Button className="mx-3">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-danger float-end"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              <Paginate page={page} pages={pages} keyword={""} isAdmin={true} />
        </div>
      )}
    </Container>
  );
}

export default ProductList;
