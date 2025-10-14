import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './MobileHeader.css';

const MobileHeader = ({ 
  title, 
  showBack = false, 
  actions = [], 
  transparent = false,
  subtitle = null 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={`mobile-header ${transparent ? 'transparent' : ''}`}>
      <div className="mobile-header-content">
        {showBack && (
          <button 
            className="header-back-btn ripple-btn" 
            onClick={handleBack}
            aria-label="Go back"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        )}
        
        <div className="header-title-section">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>

        <div className="header-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className="header-action-btn ripple-btn"
              onClick={action.onClick}
              aria-label={action.label || 'Action'}
            >
              <i className={action.icon}></i>
              {action.badge && (
                <span className="action-badge">{action.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

MobileHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  transparent: PropTypes.bool,
  subtitle: PropTypes.string
};

export default MobileHeader;
