# Mobile Development Quick Reference

## 📱 Mobile UI Patterns - Quick Guide

### Breakpoints

```javascript
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: >= 1024px
```

### Device Detection

```javascript
import { useDeviceDetect } from '../hooks/useDeviceDetect';

const MyComponent = () => {
  const { isMobile, isTablet, isDesktop, screenWidth } = useDeviceDetect();
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  );
};
```

### Mobile Component Checklist

```
✅ Touch targets minimum 44x44px
✅ Font size minimum 16px (prevents zoom on iOS)
✅ No hover states (use :active instead)
✅ Fixed navigation at top or bottom
✅ Ripple effects for feedback
✅ Safe area padding for notched phones
✅ Prevent text selection on buttons
✅ Disable tap highlight
```

### Mobile CSS Template

```css
/* Mobile Component */
.mobile-component {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Touch-friendly spacing */
  padding: 16px;
  gap: 12px;
  
  /* Typography */
  font-size: 16px;
  line-height: 1.5;
  
  /* Touch feedback */
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Touch target */
.mobile-button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}

.mobile-button:active {
  transform: scale(0.95);
}

/* Hide on desktop */
@media (min-width: 768px) {
  .mobile-component {
    display: none;
  }
}
```

### Bottom Navigation

```javascript
// components/mobile/BottomNavigation.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaThLarge, FaShoppingCart, FaUser } from 'react-icons/fa';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useSelector(state => state.cart.totalQuantity);
  
  const tabs = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/categories', icon: FaThLarge, label: 'Categories' },
    { path: '/cart', icon: FaShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/profile', icon: FaUser, label: 'Profile' }
  ];
  
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.path}
          className={`nav-item ${location.pathname === tab.path ? 'active' : ''}`}
          onClick={() => navigate(tab.path)}
        >
          <tab.icon />
          <span>{tab.label}</span>
          {tab.badge > 0 && <span className="badge">{tab.badge}</span>}
        </button>
      ))}
    </nav>
  );
};
```

```css
/* BottomNavigation.css */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  z-index: 1000;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: none;
  color: #666;
  font-size: 12px;
  position: relative;
}

.nav-item.active {
  color: #007bff;
}

.nav-item svg {
  font-size: 20px;
}

.badge {
  position: absolute;
  top: 8px;
  right: 50%;
  transform: translateX(10px);
  background: #dc3545;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
}

@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

### Mobile Header

```javascript
// components/mobile/MobileHeader.jsx
const MobileHeader = ({ title, showBack, onBack, actions = [] }) => {
  const navigate = useNavigate();
  
  return (
    <header className="mobile-header">
      <div className="header-left">
        {showBack && (
          <button onClick={() => onBack ? onBack() : navigate(-1)}>
            <FaArrowLeft />
          </button>
        )}
      </div>
      
      <h1 className="header-title">{title}</h1>
      
      <div className="header-right">
        {actions.map((action, i) => (
          <button key={i} onClick={action.onClick}>
            {action.icon}
          </button>
        ))}
      </div>
    </header>
  );
};
```

```css
/* MobileHeader.css */
.mobile-header {
  position: sticky;
  top: 0;
  height: 56px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 100;
}

.header-left,
.header-right {
  width: 80px;
  display: flex;
  gap: 8px;
}

.header-right {
  justify-content: flex-end;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-header button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
}
```

### Tab Navigation

```javascript
// components/mobile/TabNavigation.jsx
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon && <tab.icon />}
          <span>{tab.label}</span>
          {tab.badge && <span className="badge">{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
};
```

```css
/* TabNavigation.css */
.tab-navigation {
  display: flex;
  overflow-x: auto;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 56px;
  z-index: 99;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-navigation::-webkit-scrollbar {
  display: none;
}

.tab {
  flex: 0 0 auto;
  padding: 12px 24px;
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab.active {
  color: #007bff;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #007bff;
}

@media (min-width: 768px) {
  .tab-navigation {
    display: none;
  }
}
```

### Mobile Container

```javascript
// components/mobile/MobileContainer.jsx
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

const MobileContainer = ({ children }) => {
  const { isMobile } = useDeviceDetect();
  
  return (
    <div className={`mobile-container ${isMobile ? 'mobile' : 'desktop'}`}>
      {children}
      {isMobile && <div className="bottom-nav-spacer" />}
    </div>
  );
};
```

```css
/* MobileContainer.css */
.mobile-container {
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile-container.mobile {
  padding-bottom: 60px;
}

.bottom-nav-spacer {
  height: 60px;
}
```

### Responsive Grid

```css
/* Mobile-first grid */
.product-grid {
  display: grid;
  gap: 16px;
  padding: 16px;
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet: 2 columns */
@media (min-width: 768px) and (max-width: 1023px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Touch Gestures

```javascript
// Swipe detection
const useSwipe = (onSwipeLeft, onSwipeRight) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const minSwipeDistance = 50;
  
  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) onSwipeLeft();
    if (isRightSwipe && onSwipeRight) onSwipeRight();
  };
  
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};

// Usage
const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const swipeHandlers = useSwipe(
    () => setCurrentIndex(i => Math.min(i + 1, images.length - 1)), // Left
    () => setCurrentIndex(i => Math.max(i - 1, 0)) // Right
  );
  
  return (
    <div className="gallery" {...swipeHandlers}>
      <img src={images[currentIndex]} alt="" />
    </div>
  );
};
```

### Pull to Refresh

```javascript
const usePullToRefresh = (onRefresh) => {
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  const threshold = 80;
  
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };
  
  const handleTouchMove = (e) => {
    if (startY === 0 || window.scrollY > 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;
    
    if (distance > 0) {
      setPullDistance(Math.min(distance, threshold * 1.5));
      e.preventDefault();
    }
  };
  
  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    
    setStartY(0);
    setPullDistance(0);
  };
  
  return {
    pullDistance,
    refreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};
```

### Modal (Bottom Sheet on Mobile)

```css
/* Desktop: Center modal */
@media (min-width: 768px) {
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    border-radius: 12px;
  }
}

/* Mobile: Bottom sheet */
@media (max-width: 767px) {
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.3s ease;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
```

### Loading Skeleton (Mobile)

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-card {
  padding: 16px;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  margin-bottom: 12px;
}

.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-text.title {
  width: 80%;
  height: 20px;
}

.skeleton-text.short {
  width: 40%;
}
```

### iOS Safe Area

```css
/* Support for notched devices */
.mobile-header {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.bottom-navigation {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Full height container */
.full-screen {
  height: 100vh;
  height: -webkit-fill-available;
}
```

### Performance Tips

```javascript
// 1. Lazy load images
<img 
  src={lowQualityImage} 
  data-src={highQualityImage}
  loading="lazy"
  alt=""
/>

// 2. Debounce search input
const debouncedSearch = useMemo(
  () => debounce((value) => search(value), 300),
  []
);

// 3. Virtualize long lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <ProductCard product={items[index]} />
    </div>
  )}
</FixedSizeList>

// 4. Use React.memo for expensive components
export default React.memo(ProductCard, (prev, next) => {
  return prev.product.id === next.product.id;
});
```

### Mobile Testing Checklist

```
Device Testing:
□ iPhone SE (375px)
□ iPhone 12/13/14 (390px)
□ iPhone 14 Pro Max (430px)
□ Android (360px)
□ iPad (768px)

Orientation:
□ Portrait mode
□ Landscape mode

Touch:
□ All buttons tap-able
□ No hover-dependent features
□ Swipe gestures work
□ Pull to refresh works

Performance:
□ Loads in < 3 seconds on 3G
□ Images optimized
□ No janky scrolling
□ Smooth animations (60fps)

Accessibility:
□ Font size min 16px
□ Touch targets min 44x44px
□ Color contrast ratio > 4.5:1
□ Works with screen reader
```

---

## Quick Commands

```bash
# Test on different viewports
npm run dev
# Then resize browser or use DevTools device toolbar

# Check bundle size
npm run build
npm run preview

# Lighthouse mobile audit
npx lighthouse http://localhost:5174 --view
```

---

**Remember**: Always test on real devices, not just emulators!
