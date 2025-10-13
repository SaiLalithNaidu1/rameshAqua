import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge, Image, Breadcrumb } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingCart, FaStar, FaHeart, FaShare } from 'react-icons/fa';
import { addToCart, incrementQuantity, decrementQuantity } from '../../store/slices/cartSlice';
import { Header } from '../layout';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - replace with actual API call later
  const product = {
    id: parseInt(productId),
    name: "Premium Water Purification System",
    description: "Advanced multi-stage water purification system designed for home and office use. Features cutting-edge filtration technology to ensure pure, safe drinking water.",
    longDescription: `
      Our Premium Water Purification System combines the latest in filtration technology with elegant design. 
      This system uses a 7-stage purification process including:
      
      • Pre-filtration to remove large particles
      • Activated carbon filtration for chlorine and odor removal
      • RO membrane for dissolved impurities removal
      • UV sterilization for bacteria and virus elimination
      • Mineral cartridge for essential mineral retention
      • Post-carbon filter for taste enhancement
      • Silver-activated carbon for extended freshness
      
      Perfect for families and offices, this system provides up to 12 liters per hour of pure drinking water.
      The compact design fits easily under most kitchen sinks, and the smart indicator system alerts you 
      when filter replacement is needed.
    `,
    price: "₹24,999",
    originalPrice: "₹32,999",
    images: [
      "/api/placeholder/500/400",
      "/api/placeholder/500/400",
      "/api/placeholder/500/400",
      "/api/placeholder/500/400"
    ],
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    category: "Water Purifiers",
    brand: "Ramesh Aqua",
    warranty: "2 Years Comprehensive Warranty",
    installation: "Free Installation Included",
    features: [
      "7-Stage Purification Process",
      "12L/Hour Purification Capacity",
      "Smart Filter Change Indicator",
      "Compact Under-Sink Design",
      "Energy Efficient Operation",
      "BIS Certified Product"
    ],
    specifications: {
      "Purification Capacity": "12 Liters/Hour",
      "Storage Tank": "8 Liters",
      "Power Consumption": "60W",
      "Dimensions": "350 x 280 x 480 mm",
      "Weight": "8.5 kg",
      "Inlet Water Pressure": "10-40 PSI",
      "Operating Temperature": "10-40°C"
    }
  };

  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="product-detail-page">
        <Container className="py-4">
          {/* Breadcrumb Navigation */}
          <Row className="mb-4">
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate('/categories')}>Categories</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(`/products/${product.category}`)}>
                  {product.category}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          {/* Back Button */}
          <Row className="mb-3">
            <Col>
              <Button 
                variant="outline-primary" 
                onClick={handleGoBack}
                className="d-flex align-items-center gap-2"
              >
                <FaArrowLeft />
                Back
              </Button>
            </Col>
          </Row>

          <Row>
            {/* Product Images */}
            <Col lg={6} className="mb-4">
              <Card className="product-images-card">
                <div className="main-image-container">
                  <Image 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="main-product-image"
                    fluid
                  />
                  {product.originalPrice && (
                    <Badge bg="danger" className="discount-badge">
                      Save ₹{parseInt(product.originalPrice.replace('₹', '').replace(',', '')) - 
                             parseInt(product.price.replace('₹', '').replace(',', ''))}
                    </Badge>
                  )}
                </div>
                
                <div className="thumbnail-container">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fluid />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Product Info */}
            <Col lg={6}>
              <div className="product-info-container">
                <div className="product-header">
                  <h1 className="product-title">{product.name}</h1>
                  <div className="product-meta">
                    <div className="rating-container">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(product.rating) ? 'filled' : 'empty'} 
                          />
                        ))}
                      </div>
                      <span className="rating-text">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="brand-info">
                      Brand: <strong>{product.brand}</strong>
                    </div>
                  </div>
                </div>

                <div className="price-container">
                  <span className="current-price">{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">{product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="discount-percent">
                      {Math.round(((parseInt(product.originalPrice.replace('₹', '').replace(',', '')) - 
                                   parseInt(product.price.replace('₹', '').replace(',', ''))) / 
                                   parseInt(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="product-description">
                  <p>{product.description}</p>
                </div>

                <div className="key-features">
                  <h6>Key Features:</h6>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="warranty-info">
                  <Badge bg="success" className="me-2">{product.warranty}</Badge>
                  <Badge bg="info">{product.installation}</Badge>
                </div>

                <div className="stock-status">
                  {product.inStock ? (
                    <Badge bg="success">✓ In Stock</Badge>
                  ) : (
                    <Badge bg="danger">Out of Stock</Badge>
                  )}
                </div>

                {/* Cart Controls */}
                <div className="cart-section">
                  {quantity === 0 ? (
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleAddToCart}
                      className="add-to-cart-btn w-100"
                      disabled={!product.inStock}
                    >
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="quantity-controls-section">
                      <div className="quantity-controls">
                        <Button 
                          variant="outline-danger"
                          onClick={handleDecrement}
                          className="quantity-btn"
                        >
                          -
                        </Button>
                        <span className="quantity-display">{quantity}</span>
                        <Button 
                          variant="outline-success"
                          onClick={handleIncrement}
                          className="quantity-btn"
                        >
                          +
                        </Button>
                      </div>
                      <Button 
                        variant="success" 
                        onClick={() => navigate('/cart')}
                        className="go-to-cart-btn"
                      >
                        Go to Cart
                      </Button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <Button variant="outline-danger" className="action-btn">
                    <FaHeart /> Wishlist
                  </Button>
                  <Button variant="outline-info" className="action-btn">
                    <FaShare /> Share
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Detailed Description */}
          <Row className="mt-5">
            <Col>
              <Card>
                <Card.Header>
                  <h5>Product Details</h5>
                </Card.Header>
                <Card.Body>
                  <div className="detailed-description">
                    {product.longDescription.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Specifications */}
          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Header>
                  <h5>Specifications</h5>
                </Card.Header>
                <Card.Body>
                  <div className="specifications-table">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="spec-row">
                        <div className="spec-label">{key}</div>
                        <div className="spec-value">{value}</div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductDetailPage;