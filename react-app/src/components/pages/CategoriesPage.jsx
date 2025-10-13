import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../products';
import { Header } from '../layout';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const navigate = useNavigate();

  // Leo Aqua Laboratory Categories Data
  const leoAquaCategories = [
    {
      id: 1,
      title: "WHITE GUT CONTROLLERS",
      productCount: 2,
      description: "Specialized products for maintaining healthy gut conditions in aquatic environments",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/white-gut-controllers/"
    },
    {
      id: 2,
      title: "MINERALS",
      productCount: 9,
      description: "Essential mineral supplements for optimal aquatic health and growth",
      imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/minerals/"
    },
    {
      id: 3,
      title: "AMMONIA REDUCERS",
      productCount: 2,
      description: "Effective solutions for reducing harmful ammonia levels in water systems",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/ammonia-reducers/"
    },
    {
      id: 4,
      title: "BOTTOM CLEANERS",
      productCount: 2,
      description: "Specialized cleaners for maintaining clean and healthy bottom conditions",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/bottom-cleaners/"
    },
    {
      id: 5,
      title: "FEED SUPPLEMENTS",
      productCount: 12,
      description: "Nutritional supplements and additives for enhanced feeding programs",
      imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/feed-supplements/",
      variant: "featured"
    },
    {
      id: 6,
      title: "MOULTING ENHANCERS",
      productCount: 3,
      description: "Products designed to support and enhance the moulting process",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/moulting-enhancers/"
    },
    {
      id: 7,
      title: "OXYGEN PRODUCERS (RELEASERS)",
      productCount: 5,
      description: "Oxygen enhancement solutions for improved water quality and health",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/oxygen-producers-releasers/"
    },
    {
      id: 8,
      title: "PH REDUCERS",
      productCount: 1,
      description: "Solutions for maintaining optimal pH levels in aquatic systems",
      imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/ph-reducers/"
    },
    {
      id: 9,
      title: "PROBIOTICS - (WATER AND SOIL)",
      productCount: 8,
      description: "Beneficial microorganisms for water and soil health improvement",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/probiotics-water-and-soil/"
    },
    {
      id: 10,
      title: "SANITIZERS",
      productCount: 11,
      description: "Effective sanitization products for maintaining clean environments",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://leoaqualaboratories.com/product-category/sanitizers/",
      variant: "featured"
    }
  ];

  const handleCategoryClick = (category) => {
    // For categories we have implemented, navigate to our products page
    if (category.title === "WHITE GUT CONTROLLERS") {
      navigate('/products/white-gut-controllers');
    } else if (category.title === "MINERALS") {
      navigate('/products/minerals');
    } else if (category.title === "AMMONIA REDUCERS") {
      navigate('/products/ammonia-reducers');
    } else if (category.title === "BOTTOM CLEANERS") {
      navigate('/products/bottom-cleaners');
    } else if (category.title === "FEED SUPPLEMENTS") {
      navigate('/products/feed-supplements');
    } else if (category.title === "MOULTING ENHANCERS") {
      navigate('/products/moulting-enhancers');
    } else if (category.title === "OXYGEN PRODUCERS (RELEASERS)") {
      navigate('/products/oxygen-producers');
    } else if (category.title === "PH REDUCERS") {
      navigate('/products/ph-reducers');
    } else if (category.title === "PROBIOTICS - (WATER AND SOIL)") {
      navigate('/products/probiotics-water-solids');
    } else if (category.title === "SANITIZERS") {
      navigate('/products/sanitizers');
    } else {
      // For other categories, open the original URL in a new tab
      window.open(category.url, '_blank');
    }
  };

  const totalProducts = leoAquaCategories.reduce((sum, category) => sum + category.productCount, 0);

  return (
    <div className="categories-page">
      <Header />
      
      <Container fluid className="categories-container">
        {/* Breadcrumb Navigation */}
        <Row className="">
          <Col>
            <Breadcrumb className="custom-breadcrumb">
              <Breadcrumb.Item 
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer', color: 'var(--bs-primary)' }}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item 
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer', color: 'var(--bs-primary)' }}
              >
                Companies
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Leo Aqua Laboratories</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Page Header */}
        <Row className="">
          <Col lg={12} className="mx-auto text-center">
            <div className="page-header align-items-center d-flex justify-content-between">
              <div className="company-logo-section">
                <img 
                  src="https://leoaqualaboratories.com/wp-content/uploads/2023/11/logo.png" 
                  alt="Leo Aqua Laboratories"
                  className="company-logo-large"
                />
              </div>
               <h1 className="page-title">Leo Aqua Laboratories</h1>
              {/*<p className="page-subtitle">
                Professional aquaculture solutions and laboratory-grade products for optimal water management
              </p> */}
              <div className="stats-section">
                <div className="stat-item">
                  <span className="stat-number">{leoAquaCategories.length}</span>
                  <span className="stat-label">Categories</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">{totalProducts}</span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Categories Grid */}
        <Row className="categories-grid">
          {leoAquaCategories.map((category) => (
            <Col 
              key={category.id} 
              xl={3} 
              lg={4} 
              md={6} 
              sm={12} 
              className="mb-4"
            >
              <CategoryCard
                title={category.title}
                productCount={category.productCount}
                imageUrl={category.imageUrl}
                description={category.description}
                variant={category.variant}
                onClick={() => handleCategoryClick(category)}
                className="h-100"
              />
            </Col>
          ))}
        </Row>

        {/* Back to Companies Button */}
        <Row className="mt-5">
          <Col className="text-center">
            <button 
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate('/')}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Companies
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;
