import { Card, Button, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, incrementQuantity, decrementQuantity } from '../../store/slices/cartSlice';
import { FaPlus, FaMinus } from "react-icons/fa6";
import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ 
  product
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
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

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <Card className="product-card h-100 p-4">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={product.imageUrl} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/250";
          }}
        />
        <div className="product-overlay">
          {/* <div className="product-actions">
            <Button 
              variant="light" 
              size="sm" 
              className="action-btn"
              onClick={() => onViewDetails(product)}
              title="View Details"
            >
              <i className="fas fa-search"></i>
            </Button>
            {quantity === 0 ? (
              <Button 
                variant="primary" 
                size="sm" 
                className="action-btn"
                onClick={handleAddToCart}
                title="Add to Cart"
              >
                <i className="fas fa-cart-plus"></i>
              </Button>
            ) : (
              <div className="quantity-controls-overlay">
                <Button 
                  variant="danger"
                  size="sm"
                  className="quantity-btn"
                  onClick={handleDecrement}
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <span className="quantity-display">{quantity}</span>
                <Button 
                  variant="success"
                  size="sm"
                  className="quantity-btn"
                  onClick={handleIncrement}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
            )}
          </div> */}
        </div>
        {product.isNew && (
          <Badge bg="success" className="product-badge">
            NEW
          </Badge>
        )}
      </div>
      
      <Card.Body className="product-body">
        <div className="product-info">
          <Card.Title className="product-title">
            {product.name}
          </Card.Title>
          
          {product.description && (
            <Card.Text className="product-description">
              {product.description}
            </Card.Text>
          )}
          
          {product.price && (
            <div className="product-price">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </div>
          )}
          
          <div className="product-footer">
            <div className="cart-controls-container">
              {quantity === 0 ? (
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={handleAddToCart}
                  className="w-100 add-to-cart-btn"
                >
                  <i className="fas fa-cart-plus me-2"></i>
                  Add to Cart
                </Button>
              ) : (
                <div className="quantity-controls-row">
                  <div className="quantity-controls">
                    <Button 
                      variant="outline-danger text-white"
                      size="sm"
                      onClick={handleDecrement}
                    >
                      <FaMinus />
                    </Button>
                    <span className="quantity-display">{quantity}</span>
                    <Button 
                      variant="outline-success text-white"
                      size="sm"
                      onClick={handleIncrement}
                    >
                      <FaPlus/>
                    </Button>
                  </div>
                  <Button 
                    variant="success"
                    size="sm"
                    onClick={() => navigate('/cart')}
                    className="go-to-cart-btn"
                  >
                    <i className="fas fa-shopping-cart me-1"></i>
                    Cart
                  </Button>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleViewDetails}
              className="w-100 mt-2 view-details-btn"
            >
              <i className="fas fa-eye me-2"></i>
              View Details
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string,
    originalPrice: PropTypes.string,
    isNew: PropTypes.bool,
    url: PropTypes.string,
    category: PropTypes.string
  }).isRequired
};

export default ProductCard;