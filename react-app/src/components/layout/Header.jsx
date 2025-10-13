import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, InputGroup, Dropdown, Button } from 'react-bootstrap';
import { FaUser, FaBars, FaTimes, FaBell, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { auth } from '../../firebase/config';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { items } = useSelector((state) => state.cart);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Scroll detection for enhanced header effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMenuToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      variant="dark"
      className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        zIndex: 1000
      }}
    >
      <Container fluid className="px-3">
        {/* Brand/Logo */}
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          className="fw-bold fs-4 text-primary" 
          style={{ cursor: 'pointer' }}
        >
          Ramesh Aqua
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={handleMenuToggle}
          className="border-0"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {/* Center - Search Bar */}
          <Form className="d-none d-md-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search products, services..."
                className="border-start-0 bg-light"
                style={{ borderRadius: '0 25px 25px 0' }}
              />
            </InputGroup>
          </Form>

          {/* Right Section - Actions & User */}
          <Nav className="align-items-center gap-2">
            {/* Notifications Button */}
            <Button variant="outline-primary" className="position-relative">
              <FaBell />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </Button>

            {/* Cart Button */}
            <Button 
              variant="outline-primary" 
              className="position-relative"
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User Menu Dropdown */}
            <Dropdown show={showUserMenu} onToggle={setShowUserMenu}>
              <Dropdown.Toggle 
                variant="outline-primary" 
                id="dropdown-user"
                className="d-flex align-items-center gap-2"
              >
                <div 
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                  style={{ width: '32px', height: '32px' }}
                >
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="User" 
                      className="rounded-circle"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <span className="d-none d-md-inline">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="mt-2">
                <div className="px-3 py-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                      style={{ width: '48px', height: '48px' }}
                    >
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt="User" 
                          className="rounded-circle"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <FaUser size={20} />
                      )}
                    </div>
                    <div>
                      <div className="fw-semibold">{user?.displayName || 'User'}</div>
                      <div className="text-muted small">{user?.email}</div>
                    </div>
                  </div>
                </div>
                
                <Dropdown.Item className="d-flex align-items-center gap-2">
                  <FaUser />
                  Profile Settings
                </Dropdown.Item>
                
                <Dropdown.Item 
                  onClick={() => navigate('/cart')} 
                  className="d-flex align-items-center gap-2"
                >
                  <FaShoppingCart />
                  My Cart ({totalItems})
                </Dropdown.Item>
                
                <Dropdown.Item className="d-flex align-items-center gap-2">
                  <FaBell />
                  Notifications
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item 
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-2 text-danger"
                >
                  <MdLogout />
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>

        {/* Mobile Search Bar */}
        <div className="d-md-none mt-2 px-2">
          <Form>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search products, services..."
                className="bg-light"
              />
            </InputGroup>
          </Form>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;