import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetail,
  createReview,
} from "../stora/actions/productActions";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ProductPage() {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const params = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;

  const reviewProduct = useSelector((state) => state.reviewProduct);
  const { success, error } = reviewProduct;

  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProductDetail(id));
    if (localStorage.getItem("userInfo")) {
      // if it is exists and it it is more than one hour then reset
      const TOKEN = JSON.parse(localStorage.getItem("userInfo")).token;

      const DecodedToken = jwtDecode(TOKEN);
      if (DecodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("userInfo");
      }
    }
  }, [dispatch, success]);

  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const writeAComment = () => {
    dispatch(createReview({ comment, rating }, id));
  };

  return (
    product && (
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go back
        </Link>
        <Row className="my-3">
          <Col md={6}>
            <Image src={product.image} alt="p.image" fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  rating={parseFloat(product.rating) || 0}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>SAR. {product.price}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <string>{product.price}</string>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((op) => (
                            <option key={op + 1} value={op + 1}>
                              {op + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addToCart}
                      className="btn btn-outline-success"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <h3>Reviews</h3>
          {product?.reviews.map((review) => (
            <Card className="border-dark mb-3 mt-3">
              <Card.Body>
                <Rating rating={parseFloat(review.rating || 0)} text={``} />
                <blockquote className="blockquote mb-0">
                  <p>{review.comment} </p>
                  <footer className="blockquote-footer">
                    {review.name} in <cite title="Source Title">2021-11-1</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          ))}

          <h4>WRITE A REVIEW</h4>

          <Col md={7}>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-3"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>

            <InputGroup className="mt-3 mb-3">
              <Button onClick={writeAComment}>SUBMIT </Button>
              <FormControl
                placeholder="comment.."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>
            {error && <Message variant="danger">{error}</Message>}
          </Col>
        </Row>
      </div>
    )
  );
}

export default ProductPage;
