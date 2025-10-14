import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.totalItems || 0);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'fas fa-home',
      path: '/',
      badge: null
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: 'fas fa-th-large',
      path: '/categories',
      badge: null
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: 'fas fa-shopping-cart',
      path: '/cart',
      badge: cartItems
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'fas fa-user',
      path: '/profile',
      badge: null
    }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-navigation">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path)}
            aria-label={item.label}
          >
            <div className="nav-item-content">
              <div className="nav-icon-wrapper">
                <i className={item.icon}></i>
                {item.badge > 0 && (
                  <Badge bg="danger" className="nav-badge">
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </div>
            <div className="ripple-effect"></div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
