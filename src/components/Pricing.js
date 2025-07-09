import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import LoadingSkeleton from './LoadingSkeleton';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import '../styles/Pricing.css';

const Pricing = () => {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await apiService.getPricing();
        setPricing(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const handlePlanSelect = (plan) => {
    console.log(`Selected plan: ${plan.tier}`);
    // Add your plan selection logic here
  };

  if (loading) {
    return (
      <section id="pricing" className="pricing">
        <div className="container">
          <LoadingSkeleton type="pricing" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="error-message">
            <h2>Unable to load pricing</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="pricing" ref={targetRef}>
      <div className="container">
        <div className={`pricing-header ${hasIntersected ? 'animate' : ''}`}>
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the perfect plan for your business needs</p>
        </div>

        <div className="pricing-grid">
          {pricing.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''} ${hasIntersected ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              
              <div className="pricing-header-card">
                <h3>{plan.tier}</h3>
                <p className="pricing-description">{plan.description}</p>
                <div className="pricing-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              <div className="pricing-features">
                <ul>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`pricing-cta ${plan.popular ? 'primary' : 'secondary'}`}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;