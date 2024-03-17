import React, { useEffect, useState } from 'react';
import NavComp from './NavComp';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'; // Import Swiper core and required modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Footer from './Footer';
import NavSecondary from './NavSecondary';

// Install Swiper modules


const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    const [itemCounts, setItemCounts] = useState({});
    const [cartCount,setCartCount] = useState(0)
    const authToken = localStorage.getItem('token');
    const shoppingID = localStorage.getItem('shoppingId')
    const BASE_URL = 'http://localhost:3002/api';
    const [sort,setSort] = useState(false)
   

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await axios.get(`${BASE_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching category data:', error.message);
            }
        }

        async function fetchFoods() {
            try {
                const response = await axios.get(`${BASE_URL}/foods`);
                setFoods(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error.message);
            }
        }

        fetchCategory();
        fetchFoods();
    }, []);

    const handleAddToShoppingList = async(itemName,price) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [itemName]: (prevCounts[itemName] || 0) + 1
        }));

        setCartCount(cartCount+1)

        const response = await axios.patch(`${BASE_URL}/list/${shoppingID}`,{Item_Name: itemName,price},{
            headers: {
                'auth-token' : authToken
            }
        })

        console.log(response.data)
    };

    const handleRemoveFromShoppingList = async(itemName,price) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [itemName]: Math.max((prevCounts[itemName] || 0) - 1, 0)
        }));

        setCartCount(cartCount>0 ? cartCount-1 : 0)

        const response = await axios.patch(`${BASE_URL}/remove/${shoppingID}`,{Item_Name: itemName,price},{
            headers: {
                'auth-token' : authToken
            }
        })

        console.log(response.data)
    };

    async function handleSort(id){
        const response = await axios.post(`${BASE_URL}/sort`,{category: id})
        console.log(response.data)
        setFoods(response.data)
        setSort(true)
    }

    async function allHandler(){

        try {
            const response = await axios.get(`${BASE_URL}/foods`);
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching food data:', error.message);
        }

        setSort(false)

    }

    

    return (
        <div>
            <NavComp count={cartCount}/>
           
          
            <Container style={{ marginTop: '10px' }}>
                <h3 style={{ marginBottom: '20px' }}>What's on your mind?{sort && <span> <Button variant="light" onClick={allHandler}>View All Items</Button>{' '}</span>}</h3>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                >
                    {categories && categories.length > 0 ?
                        categories.map((elem, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img src={elem.Categoryimg} style={{ width: '200px', height: '200px', borderRadius: '200px', boxShadow: '2px 2px 2px 2px grey',cursor: 'pointer' }} onClick={()=>handleSort(elem._id)}/>
                                    <h6 style={{ color: 'gray', opacity: '0.7', textAlign: 'center' }}>{elem.Name}</h6>
                                </SwiperSlide>
                            )
                        }) : null
                    }
                </Swiper>
                <hr style={{ color: 'grey', opacity: '0.5' }} />
                <Container>
                    {foods.map((food, index) => (
                        <React.Fragment key={index}>
                            {index % 3 === 0 && (
                                <Row className="mb-3 justify-content-center">
                                    {foods.slice(index, index + 3).map((foodItem, innerIndex) => (
                                        <Col key={innerIndex} xs={12} sm={6} md={4}>
                                            <Card className="mb-3" >
                                                <Card.Img
                                                    variant="top"
                                                    src={foodItem.Foodimg}
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                />
                                                <Card.Body style={{ height: '180px' }}>
                                                    <Card.Title>{foodItem.Name}<span style={{textDecoration: 'line-through',opacity: '0.5'}}>   ₹{foodItem.Price}</span><span>   ₹{foodItem.DiscountedPrice}</span></Card.Title>
                                                    <Card.Text>{foodItem.Description}</Card.Text>
                                                    <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => handleAddToShoppingList(foodItem.Name,foodItem.DiscountedPrice)}>+</Button>
                                                    <span style={{ marginRight: '10px' }}>{itemCounts[foodItem.Name] || 0}</span>
                                                    <Button variant="primary" onClick={() => handleRemoveFromShoppingList(foodItem.Name,foodItem.DiscountedPrice)}>-</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </React.Fragment>
                    ))}
                </Container>
            </Container>
            <Footer />
        </div>
    );
};

export default Homepage;
