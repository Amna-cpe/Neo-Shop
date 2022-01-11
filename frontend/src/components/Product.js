import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product: p }) {
  return (
    <Card bg="secondary" className="my-3 p-3 rounded">
      <Link to={`/product/${p._id}`}>
        <Card.Img variant="top" src={p.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${p._id}`}>
          <Card.Title as="div">
            <strong>{p.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating rating={p.rating} text={`${p.numReviews} reviews`} />
          </div>
        </Card.Text>

        <Card.Text as="h3">SAR. {p.price}</Card.Text>
        {/* <Button variant="outline-secondary">Add</Button> */}
      </Card.Body>
    </Card>
  );
}

export default Product;
