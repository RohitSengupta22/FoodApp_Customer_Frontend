import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavComp from './NavComp';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Lottie from 'lottie-react';
import orderplaced from '../Asset/orderplaced.json';
import { useNavigate } from 'react-router-dom';
import NavSecondary from './NavSecondary';

const Cart = () => {
    const [order, setOrder] = useState([]);
    const shoppingID = localStorage.getItem('shoppingId');
    const BASE_URL = 'http://localhost:3002/api';
    const [placed, setPlaced] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await axios.get(`${BASE_URL}/fetchOrder/${shoppingID}`);
                setOrder(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching order:', error.message);
            }
        }

        fetchOrder();
    }, []); // Add shoppingID to the dependency array

    function placedHandler() {
        setPlaced(true)
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    return (
        <div>
            <NavSecondary />
            {order.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img src='https://organickle.com/images/no-order.svg' alt="No Order" />
                </div>
            ) : placed ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '350px', height: '350px' }}>
                        <Lottie animationData={orderplaced} />
                    </div>
                </div>
            ) : (
                <Container style={{ marginTop: '20px' }}>
                    <Card style={{ borderRadius: '20px', marginTop: '5px' }}>
                        <Card.Header style={{ color: 'lightblue', fontWeight: 'bold' }}>Orders</Card.Header>
                        {order && order.length > 0 ? (
                            order.map((elem, index) => (
                                <div key={index}> {/* Add key to the wrapping div */}
                                    <Card.Body>
                                        <Card.Title>{elem.food}</Card.Title>
                                        <Card.Text>
                                            {elem.food} (x {elem.freq}) = {elem.price}
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            ))
                        ) : (
                            <p>No items in the order</p>
                        )}
                    </Card>
                    <Container style={{ width: '100%', height: '40px', borderRadius: '20px', marginTop: '10px', backgroundColor: 'green', display: 'flex', justifyContent: 'space-between' }}>
                        <h6 style={{ color: 'snow', fontWeight: 'bold' }}>Total Price = ₹ <span>{order && order.length > 0 ? order.reduce((acc, curr) => acc + curr.price, 0) : ''}</span></h6>
                        <i className="fa-solid fa-circle-check" style={{ color: 'white', fontSize: '30px', marginTop: '2px', cursor: 'pointer' }} onClick={placedHandler}></i>

                    </Container>

                </Container>

            )}
        </div>
    );
};

export default Cart;
