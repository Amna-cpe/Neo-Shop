import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Product from "../components/Product.js";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../stora/actions/productActions";
import ProductsSkelatons from "../skelatons/productsSkelatons";
import Message from "../components/Message";
import Paginate from "../components/Paginate.js";
import ProductCarousel from "../components/ProductCarousel.js";

function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const keyword = searchParams.get("keyword");
  const pageFromUrl = searchParams.get("page");
  console.log("the page fomr url ", pageFromUrl);

  useEffect(() => {
    console.log(keyword, "changed");
    dispatch(listProducts(keyword, pageFromUrl));
  }, [dispatch, keyword, pageFromUrl]);

  return (
    <div>
      {!keyword && <ProductCarousel />}

      {loading ? (
        <Row>
          {[0, 0, 0, 0, 0, 0, 0, 0].map((p) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <ProductsSkelatons />
            </Col>
          ))}
        </Row>
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          {" "}
          <Row>
            {products?.map((p) => (
              <Col key={p.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </div>
  );
}

export default HomePage;
