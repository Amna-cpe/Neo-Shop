import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Container,
  Image,
} from "react-bootstrap";

function FormCustome({ formControl , uploadImageHandler }) {
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
    const handleImageUpload = (e,fc)=>{
        const image = e.target.files[0]
        
        
        
    }
  return (
    <Form>
      {formControl.forms.map((fc) => (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{fc.label}</Form.Label>
          {fc.type === "textarea" ? (
            <Form.Control
              placeholder={fc.place_holder}
              value={fc.value}
              onChange={(e) => fc.setter(e.target.value)}
              as="textarea"
              rows={3}
            />
          ) : fc.type === "file" ? (
            <>
              <Image
                src={fc.value}
                alt="image"
                fluid
                rounded
                className="w-25 h-25 d-flex my-3"
              />
              <Form.Control
                type={fc.type}
                onChange={uploadImageHandler}
              />
            </>
          ) : (
            <Form.Control
              type={fc.type}
              placeholder={fc.place_holder}
              value={fc.value}
              onChange={(e) => fc.setter(e.target.value)}
            />
          )}
        </Form.Group>
      ))}
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
    </Form>
  );
}

export default FormCustome;
