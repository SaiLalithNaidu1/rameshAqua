import { useState } from 'react';
import { 
  FaTint, 
  FaIndustry, 
  FaHome, 
  FaCog, 
  FaArrowRight, 
  FaWater,
  FaShieldAlt,
  FaLeaf,
  FaTools
} from 'react-icons/fa';
import './CompanyCategories.css';

const categoriesData = [
  {
    id: 1,
    title: "Water Purification",
    description: "Advanced filtration systems for clean, safe drinking water",
    icon: FaTint,
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    features: ["RO Systems", "UV Purifiers", "Carbon Filters", "Alkaline Water"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Industrial Solutions",
    description: "Heavy-duty water treatment for manufacturing and industries",
    icon: FaIndustry,
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    features: ["Waste Treatment", "Boiler Systems", "Cooling Towers", "Process Water"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Home & Office",
    description: "Residential and commercial water solutions for daily use",
    icon: FaHome,
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    features: ["Home Purifiers", "Office Systems", "Kitchen Solutions", "Bathroom Filters"],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Maintenance & Service",
    description: "Professional installation, maintenance, and repair services",
    icon: FaCog,
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    features: ["Installation", "Regular Service", "Emergency Repair", "Parts Replacement"],
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop"
  }
];

const CompanyCategories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <section className="company-categories">
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="categories-title">Our Services</h2>
          <p className="categories-subtitle">
            Comprehensive water solutions for every need
          </p>
        </div>

        <div className="categories-grid">
          {categoriesData.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <div 
                key={category.id}
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="card-header">
                  <div 
                    className="category-icon"
                    style={{ background: category.color }}
                  >
                    <IconComponent />
                  </div>
                  <div className="category-info">
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-description">{category.description}</p>
                  </div>
                  <button className="category-toggle">
                    <FaArrowRight className={`arrow-icon ${isActive ? 'rotated' : ''}`} />
                  </button>
                </div>

                <div className={`card-content ${isActive ? 'expanded' : ''}`}>
                  <div className="category-image">
                    <img src={category.image} alt={category.title} />
                  </div>
                  
                  <div className="category-features">
                    <h4 className="features-title">Key Features:</h4>
                    <ul className="features-list">
                      {category.features.map((feature, index) => (
                        <li key={index} className="feature-item">
                          <div className="feature-icon">
                            {index === 0 && <FaWater />}
                            {index === 1 && <FaShieldAlt />}
                            {index === 2 && <FaLeaf />}
                            {index === 3 && <FaTools />}
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="category-actions">
                    <button className="action-btn primary">
                      Learn More
                    </button>
                    <button className="action-btn secondary">
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Quality Assured</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCategories;