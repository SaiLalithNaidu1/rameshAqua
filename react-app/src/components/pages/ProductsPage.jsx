import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import Header from '../layout/Header';
import ProductCard from '../products/ProductCard';
import { MobileHeader, TabNavigation } from '../mobile';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import './ProductsPage.css';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoriesRef = collection(db, 'categories');
        const categoryQuery = query(categoriesRef, where('id', '==', categoryId));
        const categorySnapshot = await getDocs(categoryQuery);

        if (categorySnapshot.empty) {
          setError('Category not found');
          setLoading(false);
          return;
        }

        const categoryData = categorySnapshot.docs[0].data();
        setCurrentCategory(categoryData);

        const productsRef = collection(db, 'products');
        const productsQuery = query(productsRef, where('categoryId', '==', categoryId));
        const productsSnapshot = await getDocs(productsQuery);

        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product: product,
      quantity: 1
    }));
    setCartQuantity(cartQuantity + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (loading) {
    return (
      <>
        {!isMobile && <Header />}
        {isMobile && <MobileHeader title="Loading..." />}
        <Container className="mt-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">Loading products...</p>
          </div>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        {!isMobile && <Header />}
        {isMobile && <MobileHeader title="Error" showBack={true} />}
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={() => navigate('/categories')}>
              Back to Categories
            </Button>
          </Alert>
        </Container>
      </>
    );
  }

  if (!currentCategory) {
    return (
      <>
        {!isMobile && <Header />}
        {isMobile && <MobileHeader title="Not Found" showBack={true} />}
        <Container className="mt-5">
          <Alert variant="warning">
            <Alert.Heading>Category Not Found</Alert.Heading>
            <p>The category you&apos;re looking for doesn&apos;t exist.</p>
            <Button variant="outline-warning" onClick={() => navigate('/categories')}>
              Back to Categories
            </Button>
          </Alert>
        </Container>
      </>
    );
  }

  // Tab configuration for mobile
  const tabs = [
    { id: 'all', label: 'All Products', icon: 'fas fa-th', badge: products.length },
    { id: 'featured', label: 'Featured', icon: 'fas fa-star' },
    { id: 'new', label: 'New', icon: 'fas fa-plus-circle' }
  ];

  const headerActions = isMobile ? [
    { icon: 'fas fa-search', onClick: () => console.log('Search'), label: 'Search' },
    { icon: 'fas fa-filter', onClick: () => console.log('Filter'), label: 'Filter' }
  ] : [];

  return (
    <>
      {!isMobile && <Header />}
      {isMobile && (
        <>
          <MobileHeader 
            title={currentCategory.categoryName || 'Products'} 
            showBack={true}
            actions={headerActions}
          />
          <TabNavigation 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="scrollable"
          />
        </>
      )}
      <Container className={`products-page ${isMobile ? 'mobile-products-page' : 'mt-4'}`}>
        {showAlert && (
          <Alert
            variant="info"
            dismissible
            onClose={() => setShowAlert(false)}
            className="position-fixed top-0 end-0 m-3"
            style={{ zIndex: 9999, width: 'auto' }}
          >
            Product added to cart successfully!
          </Alert>
        )}

        {!isMobile && (
          <>
            <div className="category-header mb-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h1 className="category-title">{currentCategory.categoryName}</h1>
                  <p className="category-description">{currentCategory.categoryDescription}</p>
                </Col>
                <Col md={4} className="text-end">
                  <Button variant="outline-primary" onClick={() => navigate('/categories')}>
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Categories
                  </Button>
                </Col>
              </Row>
            </div>

            <div className="products-info-bar mb-4">
              <Row>
                <Col md={6}>
                  <h5 className="mb-0">
                    <i className="fas fa-box me-2"></i>
                    {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
                  </h5>
                </Col>
                <Col md={6} className="text-end">
                  <span className="text-muted">
                    <i className="fas fa-filter me-2"></i>
                    Showing all products
                  </span>
                </Col>
              </Row>
            </div>
          </>
        )}

        {/* Mobile category info */}
        {isMobile && (
          <div className="mobile-category-info p-3 bg-white mb-3">
            <p className="text-muted mb-2 small">{currentCategory.categoryDescription}</p>
            <div className="d-flex align-items-center text-primary">
              <i className="fas fa-box me-2"></i>
              <span className="fw-semibold">{products.length} Products</span>
            </div>
          </div>
        )}

        <Row className={`g-${isMobile ? '3' : '4'}`}>
          {products.length === 0 ? (
            <Col xs={12}>
              <Alert variant="info">
                <Alert.Heading>No Products Available</Alert.Heading>
                <p>There are currently no products in this category.</p>
              </Alert>
            </Col>
          ) : (
            products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              </Col>
            ))
          )}
        </Row>

        {!isMobile && (
          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <div className="contact-section">
                <h3 className="text-center mb-4">Need Help Choosing?</h3>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="text-center h-100 border-0 shadow-sm">
                    <Card.Body>
                      <div className="contact-icon mb-3">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <h5>Call Us</h5>
                      <p className="text-muted">Speak with our experts</p>
                      <a href="tel:+1234567890" className="btn btn-sm btn-outline-primary">
                        Call Now
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center h-100 border-0 shadow-sm">
                    <Card.Body>
                      <div className="contact-icon mb-3">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <h5>Email Support</h5>
                      <p className="text-muted">Get detailed product info</p>
                      <a href="mailto:support@rameshaqua.com" className="btn btn-sm btn-outline-primary">
                        Email Us
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center h-100 border-0 shadow-sm">
                    <Card.Body>
                      <div className="contact-icon mb-3">
                        <i className="fas fa-comments"></i>
                      </div>
                      <h5>Live Chat</h5>
                      <p className="text-muted">Chat with us</p>
                      <Button variant="outline-primary" size="sm">
                        Start Chat
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        )}
      </Container>
    </>
  );
};

export default ProductsPage;
