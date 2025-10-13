import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { setCurrentSlide } from '../store/slices/uiSlice';
import './Carousel.css';

// Sample carousel data - you can replace these with your actual images
const carouselData = [
  {
    id: 1,
    title: "Premium Water Solutions",
    subtitle: "Crystal clear water for every need",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "Advanced Filtration Systems",
    subtitle: "Pure water technology at its finest",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Industrial Water Treatment",
    subtitle: "Professional solutions for businesses",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "Home Water Purifiers",
    subtitle: "Safe drinking water for your family",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  }
];

const Carousel = () => {
  const dispatch = useDispatch();
  const currentSlide = useSelector((state) => state.ui.currentSlide);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    const newSlide = currentSlide === carouselData.length - 1 ? 0 : currentSlide + 1;
    dispatch(setCurrentSlide(newSlide));
  };

  const prevSlide = () => {
    const newSlide = currentSlide === 0 ? carouselData.length - 1 : currentSlide - 1;
    dispatch(setCurrentSlide(newSlide));
  };

  const goToSlide = (index) => {
    dispatch(setCurrentSlide(index));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      dispatch(setCurrentSlide(prev => prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, dispatch]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      className="carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-container">
        {/* Slides */}
        <div 
          className="carousel-slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselData.map((slide, index) => (
            <div 
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-background" style={{ background: slide.color }}>
                <div className="slide-content">
                  <div className="slide-text">
                    <h2 className="slide-title">{slide.title}</h2>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <button className="slide-cta">
                      Learn More
                    </button>
                  </div>
                  <div className="slide-image">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;