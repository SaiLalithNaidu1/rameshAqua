import PropTypes from 'prop-types';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import BottomNavigation from './BottomNavigation';
import './MobileContainer.css';

const MobileContainer = ({ children }) => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className={`app-container ${isMobile ? 'mobile-view' : 'desktop-view'}`}>
      <div className={`content-wrapper ${isMobile ? 'mobile-content' : ''}`}>
        {children}
      </div>
      {isMobile && <BottomNavigation />}
    </div>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default MobileContainer;
