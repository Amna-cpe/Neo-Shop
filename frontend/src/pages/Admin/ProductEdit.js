import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import FormCustome from "../../components/FormCustome";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  listProductDetail,
  editProduct,
} from "../../stora/actions/productActions";
import axios from "axios";

export default function ProductEdit() {
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const editProductState = useSelector((state) => state.productEdit);
  const { success } = editProductState;

  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0.0);
  const [countInStock, setcountInStock] = useState(0);

  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!product?.name) {
      dispatch(listProductDetail(params.id));
    } else {
      setName(product?.name);
      setimage(product?.image);
      setbrand(product?.brand);
      setcategory(product?.category);
      setdescription(product?.description);
      setprice(product?.price);
      setcountInStock(product?.countInStock);
    }
  }, [dispatch, product]);

  if (success) {
    alert("Updated Successfully");
  }
  /* 
     formControl : {
         "forms":
                    [
                        {
                            "type":"email",
                            "label":"Email Address",
                            "place_holder":" ".
                            "value":
                            setter= setEmail
                        },
                    ]
         
       
     }
     
     */

  const formControl = { forms: [] };
  const nameControl = {
    label: "name",
    type: "text",
    place_holder: "Enter Product Name",
    value: name,
    setter: setName,
  };
  formControl.forms.push(nameControl);

  const imageControl = {
    label: "image",
    type: "file",
    place_holder: "Enter Product image",
    value: image,
    setter: setimage,
  };
  formControl.forms.push(imageControl);

  const brandControl = {
    label: "brand",
    type: "text",
    place_holder: "Enter Product brand",
    value: brand,
    setter: setbrand,
  };

  formControl.forms.push(brandControl);

  const categoryControl = {
    label: "category",
    type: "text",
    place_holder: "Enter Product category",
    value: category,
    setter: setcategory,
  };
  formControl.forms.push(categoryControl);

  const descriptionControl = {
    label: "description",
    type: "textarea",
    place_holder: "Enter Product description",
    value: description,
    setter: setdescription,
  };
  formControl.forms.push(descriptionControl);

  const priceControl = {
    label: "price",
    type: "number",
    place_holder: "Enter Product price",
    value: price,
    setter: setprice,
  };
  formControl.forms.push(priceControl);

  const countInStockControl = {
    label: "countInStock",
    type: "number",
    place_holder: "Enter Product countInStock",
    value: countInStock,
    setter: setcountInStock,
  };
  formControl.forms.push(countInStockControl);
  const handleEdit = () => {
    const product = {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    };
    dispatch(editProduct(product, params.id));
  };

  
  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("product_id", params.id);
    try {
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-X-CSRFToken":document.cookie.split("=")[1],
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "api/products/upload",
        formData,
        config
      );
      console.log(data);
    } catch (error) {
    
      console.log(error);
    }
  };
  return (
    <Col>
      <Card>
        <Card.Header>
          <Card.Title>Edit Product</Card.Title>
        </Card.Header>
        <Card.Body>
          <FormCustome
            formControl={formControl}
            values={product}
            uploadImageHandler={uploadImageHandler}
          />
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleEdit} variant="primary">
            Save Changes
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}
