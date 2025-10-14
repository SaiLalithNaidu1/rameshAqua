import { useState } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import './TabNavigation.css';

const TabNavigation = ({ tabs, activeTab, onTabChange, variant = 'default' }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const handleTabClick = (tabId, event) => {
    const target = event.currentTarget;
    const left = target.offsetLeft;
    const width = target.offsetWidth;

    setIndicatorStyle({
      left: `${left}px`,
      width: `${width}px`
    });

    onTabChange(tabId);
  };

  return (
    <div className={`tab-navigation ${variant}`}>
      <Nav variant="tabs" className="custom-tabs">
        {tabs.map((tab) => (
          <Nav.Item key={tab.id}>
            <Nav.Link
              className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={(e) => handleTabClick(tab.id, e)}
            >
              {tab.icon && <i className={`${tab.icon} tab-icon`}></i>}
              <span className="tab-label">{tab.label}</span>
              {tab.badge && <span className="tab-badge">{tab.badge}</span>}
            </Nav.Link>
          </Nav.Item>
        ))}
        <div className="tab-indicator" style={indicatorStyle}></div>
      </Nav>
    </div>
  );
};

TabNavigation.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'scrollable', 'fixed'])
};

export default TabNavigation;

