import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CategoryCard.css';

const CategoryCard = ({ 
  title, 
  productCount, 
  imageUrl, 
  description, 
  onClick, 
  className = '',
  variant = 'default' 
}) => {
  return (
    <Card 
      className={`category-card p-0 ${variant} ${className}`} 
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="category-image-container">
        <Card.Img 
          variant="top" 
          src={imageUrl || "/api/placeholder/300/200"} 
          alt={title}
          className="category-image"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/200";
          }}
        />
        <div className="category-overlay">
          <div className="category-count-badge">
            <span className="count-number">{productCount}</span>
            <span className="count-label">
              {productCount === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        </div>
      </div>
      
      <Card.Body className="category-body">
        <Card.Title className="category-title">
          {title}
        </Card.Title>
        {description && (
          <Card.Text className="category-description">
            {description}
          </Card.Text>
        )}
        <div className="category-footer">
          <span className="view-products-text">
            View {productCount} {productCount === 1 ? 'Product' : 'Products'}
          </span>
          <div className="category-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  productCount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string
};

export default CategoryCard;
