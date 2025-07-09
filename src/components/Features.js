import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import LoadingSkeleton from './LoadingSkeleton';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import '../styles/Features.css';

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await apiService.getFeatures();
        setFeatures(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <section id="features" className="features">
        <div className="container">
          <LoadingSkeleton type="features" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="features" className="features">
        <div className="container">
          <div className="error-message">
            <h2>Unable to load features</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="features" ref={targetRef}>
      <div className="container">
        <div className={`features-header ${hasIntersected ? 'animate' : ''}`}>
          <h2>Powerful Features for Your Business</h2>
          <p>Everything you need to automate and scale your business operations</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`feature-card ${hasIntersected ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                <span>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;