import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate , useLocation } from 'react-router-dom'

function SearchBar() {
    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()
    let location = useLocation()

    console.log(location)
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            // history.push(history.push(history.location.pathname))
            navigate(location.pathname)
        }
    }
    return (
        <Form onSubmit={submitHandler}  inline className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button

                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBar