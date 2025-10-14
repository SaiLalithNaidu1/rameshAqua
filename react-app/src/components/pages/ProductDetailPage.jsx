import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge, Image, Breadcrumb, Spinner, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingCart, FaStar, FaHeart, FaShare } from 'react-icons/fa';
import { addToCart, incrementQuantity, decrementQuantity } from '../../store/slices/cartSlice';
import { fetchProductById } from '../../firebase/firestoreService';
import { Header } from '../layout';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const { user } = useSelector(state => state.auth);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from Firebase
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await fetchProductById(productId);
        
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const cartItem = cartItems.find(item => item?.id === product?.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Track product view when product is loaded
  useEffect(() => {
    if (product && product.id) {
      import('../../firebase/firestoreService').then(({ trackProductView }) => {
        trackProductView(product.id, user?.uid);
      });
    }
  }, [product, user]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
      
      // Track add to cart action
      import('../../firebase/firestoreService').then(({ trackProductInteraction }) => {
        trackProductInteraction(product.id, 'add_to_cart', user?.uid);
      });
    }
  };

  const handleIncrement = () => {
    if (product) {
      dispatch(incrementQuantity(product.id));
    }
  };

  const handleDecrement = () => {
    if (product) {
      dispatch(decrementQuantity(product.id));
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      alert('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    if (product) {
      try {
        const { addToWishlist } = await import('../../firebase/firestoreService');
        await addToWishlist(user.uid, product);
        alert('Added to wishlist!');
      } catch (err) {
        console.error('Error adding to wishlist:', err);
        alert('Failed to add to wishlist');
      }
    }
  };

  const handleShare = async () => {
    if (product) {
      // Track share action
      import('../../firebase/firestoreService').then(({ trackProductInteraction }) => {
        trackProductInteraction(product.id, 'share', user?.uid);
      });

      // Use Web Share API if available
      if (navigator.share) {
        try {
          await navigator.share({
            title: product.title || product.name,
            text: product.description,
            url: window.location.href
          });
        } catch (err) {
          console.log('Share cancelled or failed:', err);
        }
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <Container className="py-5 text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading product details...</p>
        </Container>
      </>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <>
        <Header />
        <Container className="py-5">
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error || 'Product not found'}</p>
            <Button variant="primary" onClick={() => navigate('/categories')}>
              Browse Categories
            </Button>
          </Alert>
        </Container>
      </>
    );
  }

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
                    src={
                      product.images && product.images.length > 0 
                        ? product.images[selectedImage] 
                        : product.imageUrl || '/api/placeholder/500/400'
                    } 
                    alt={product.title || product.name}
                    className="main-product-image"
                    fluid
                  />
                  {product.originalPrice && (
                    <Badge bg="danger" className="discount-badge">
                      Save ₹{parseInt(product.originalPrice) - parseInt(product.price)}
                    </Badge>
                  )}
                </div>
                
                {product.images && product.images.length > 1 && (
                  <div className="thumbnail-container">
                    {product.images.map((image, index) => (
                      <div 
                        key={index}
                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <Image src={image} alt={`${product.title || product.name} ${index + 1}`} fluid />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </Col>

            {/* Product Info */}
            <Col lg={6}>
              <div className="product-info-container">
                <div className="product-header">
                  <h1 className="product-title">{product.title || product.name}</h1>
                  <div className="product-meta">
                    {(product.rating || product.reviewCount) && (
                      <div className="rating-container">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < Math.floor(product.rating || 0) ? 'filled' : 'empty'} 
                            />
                          ))}
                        </div>
                        <span className="rating-text">
                          {product.rating || 0} ({product.reviewCount || 0} reviews)
                        </span>
                      </div>
                    )}
                    <div className="brand-info">
                      Brand: <strong>{product.brand || 'Ramesh Aqua'}</strong>
                    </div>
                  </div>
                </div>

                <div className="price-container">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="discount-percent">
                      {Math.round(((parseInt(product.originalPrice) - parseInt(product.price)) / 
                                   parseInt(product.originalPrice)) * 100)}% OFF
                    </span>
                  )}
                </div>

                {product.description && (
                  <div className="product-description">
                    <p>{product.description}</p>
                  </div>
                )}

                {product.features && product.features.length > 0 && (
                  <div className="key-features">
                    <h6>Key Features:</h6>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(product.warranty || product.installation) && (
                  <div className="warranty-info">
                    {product.warranty && <Badge bg="success" className="me-2">{product.warranty}</Badge>}
                    {product.installation && <Badge bg="info">{product.installation}</Badge>}
                  </div>
                )}

                <div className="stock-status">
                  {product.inStock !== false ? (
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
                  <Button 
                    variant="outline-danger" 
                    className="action-btn"
                    onClick={handleWishlist}
                  >
                    <FaHeart /> Wishlist
                  </Button>
                  <Button 
                    variant="outline-info" 
                    className="action-btn"
                    onClick={handleShare}
                  >
                    <FaShare /> Share
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Detailed Description */}
          {product.longDescription && (
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
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
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
          )}
        </Container>
      </div>
    </>
  );
};

export default ProductDetailPage;