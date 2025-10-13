import { Header } from '../layout';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="home-screen">
      <Header />
      {/* Company Categories Section */}
      <section className="company-categories-section py-0">
        <div className="container">
          <div className="row text-center">
          </div>
          <div className="row g-4">
            {/* Leo Aqua Laboratories */}
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="company-card h-100" onClick={() => navigate('/categories')} style={{ cursor: 'pointer' }}>
                <div className="company-logo-container">
                  <img 
                    src="https://leoaqualaboratories.com/wp-content/uploads/2023/11/logo.png" 
                    alt="Leo Aqua Laboratories"
                    className="company-logo"
                    style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
                <div className="company-info">
                  
                  <button className="btn btn-outline-primary btn-sm mt-3">View Products</button>
                </div>
              </div>
            </div>

            {/* Quros Aqua */}
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="company-card h-auto">
                <div className="company-logo-container">
                  <img 
                    src="https://5.imimg.com/data5/MK/JC/PA/SELLER-61048696/595-120x120.png" 
                    alt="Quros Aqua"
                    className="company-logo"
                    style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
                <div className="company-info">
                    
                    <button className="btn btn-outline-primary btn-sm mt-3">View Products</button>
                </div>
              </div>
            </div>

            {/* RK Water Solutions */}
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="company-card h-auto">
                <div className="company-logo-container">
                  <img 
                    src="https://5.imimg.com/data5/SELLER/Logo/2020/10/XK/MK/ZD/76454721/rk-logo-removebg-preview-120x120.png" 
                    alt="RK Water Solutions"
                    className="company-logo"
                    style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
                <div className="company-info">
                    
                    <button className="btn btn-outline-primary btn-sm mt-3">View Products</button>
                </div>
              </div>
            </div>

            {/* AuxoGene */}
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="company-card h-auto">
                <div className="company-logo-container">
                  <img 
                    src="https://5.imimg.com/data5/SELLER/Logo/2020/10/VH/IR/NN/7544295/auxogene-120x120.jpeg" 
                    alt="AuxoGene"
                    className="company-logo"
                    style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}
                  />
                </div>
                <div className="company-info">
                    
                  <button className="btn btn-outline-primary btn-sm mt-3">View Products</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Carousel Section */}
      <Carousel fade className="hero-carousel">
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="d-block w-100"
              src="https://backend.novonesis.com/sites/default/files/styles/xlarge_3_2/public/image/2025-04/07_Aquaculture_carousel_01_image_01_1920x1080_shrimp_farm.jpg.webp?itok=5BrGx5yw"
              alt="Pure Water Technology"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="hero-caption">
            <h2>Pond Preparation & Stocking</h2>
            <p>Ensuring proper pond setup, aeration, and stocking density.</p>
            <button className="btn btn-primary btn-lg">Learn More</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="d-block w-100"
              src="https://backend.novonesis.com/sites/default/files/styles/xlarge_3_2/public/image/2025-04/07_Aquaculture_carousel_02_image_01_1920x1080_shrimp_farm.jpg.webp?itok=WnO_eD92"
              alt="Industrial Water Solutions"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="hero-caption">
            <h2>Water Quality Management</h2>
            <p>Monitoring pH, salinity, oxygen levels, and filtration.</p>
            <button className="btn btn-primary btn-lg">Get Quote</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="d-block w-100"
              src="https://backend.novonesis.com/sites/default/files/styles/large_1_1/public/image/2025-04/07_Aquaculture_half%26half_image_1080x1080_cattle_looking.jpg.webp?itok=oeVimOydhttps://www.shutterstock.com/image-photo/topdown-view-pile-raw-prawns-260nw-2654086545.jpg"
              alt="Water Quality Testing"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div className="carousel-overlay"></div>
          </div>
          <Carousel.Caption className="hero-caption">
            <h2>Feed & Nutrition</h2>
            <p>Providing specialized diets for healthy growth and disease resistance.</p>
            <button className="btn btn-primary btn-lg">Contact Us</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeScreen;