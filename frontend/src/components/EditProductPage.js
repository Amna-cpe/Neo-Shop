import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import FormCustome from "./FormCustome";

export default function EditProductPage() {
  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [countInStock, setcountInStock] = useState("");

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

  console.log(formControl);
  return (
    <>
      <Card>
        <Card.Header closeButton>
          <Card.Title>Create Product</Card.Title>
        </Card.Header>
        <Card.Body>
          <FormCustome formControl={formControl} />
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Save Changes</Button>
        </Card.Footer>
      </Card>
    </>
  );
}
