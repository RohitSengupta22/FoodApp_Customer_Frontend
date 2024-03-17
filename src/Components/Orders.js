import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavComp from './NavComp';
import { Container } from 'react-bootstrap';
import NavSecondary from './NavSecondary';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const authToken = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:3002/api';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/savedOrder`,{
            headers: {
                "auth-token" : authToken
            }
        }); // Assuming '/api/savedOrder' is your endpoint
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
    <NavSecondary />
    <Container className="container" style={{ margin: '20px'}}>
        {
            orders.length==0 ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src='https://organickle.com/images/no-order.svg' alt="No Order" />
        </div>) : ( <div className="row">
            {orders.map((order, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{boxShadow: '1px 1px 1px 1px lightblue', height: '300px'}}>
                  <div className="card-body" style={{overflow: 'scroll'}}>
                    <h5 className="card-title">Order {index + 1}</h5>
                    <ul className="list-group list-group-flush">
                      {order.savedOrder.map((item, itemIndex) => (
                        <li className="list-group-item" key={itemIndex}>
                          <strong>Food:</strong> {item.food}<br />
                          <strong>Price:</strong> ₹{item.price}<br />
                          <strong>Quantity:</strong> {item.freq}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>)
        }
      
     
    </Container>
    </>
  );
};

export default Orders;
