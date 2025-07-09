import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import LoadingSkeleton from './LoadingSkeleton';
import '../styles/Hero.css';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await apiService.getSlides();
        setSlides(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleCTAClick = (slide) => {
    console.log(`CTA clicked for slide: ${slide.title}`);
    // Add your CTA logic here
  };

  if (loading) {
    return (
      <div className="hero">
        <div className="container">
          <div className="skeleton-hero">
            <div className="skeleton-content">
              <div className="loading-skeleton skeleton-title"></div>
              <div className="loading-skeleton skeleton-subtitle"></div>
              <div className="loading-skeleton skeleton-button"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero">
        <div className="container">
          <div className="error-message">
            <h3>Unable to load hero content</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div 
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`
              }}
            ></div>
            <div className="container">
              <div className="hero-content">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-cta">
                  <button 
                    className="btn-primary"
                    onClick={() => handleCTAClick(slide)}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;