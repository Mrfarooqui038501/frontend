import React, { useState } from 'react';
import { apiService } from '../services/api';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { targetRef, hasIntersected } = useIntersectionObserver();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      await apiService.submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      if (error.fields) {
        setErrors(error.fields);
      } else {
        setErrors({ general: error.message || 'Failed to send message' });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  if (success) {
    return (
      <section id="contact" className="contact">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Thank you for your message!</h2>
            <p>We'll get back to you within 24 hours.</p>
            <button className="btn-secondary" onClick={resetForm}>
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact" ref={targetRef}>
      <div className="container">
        <div className={`contact-header ${hasIntersected ? 'animate' : ''}`}>
          <h2>Get In Touch</h2>
          <p>Ready to transform your business? Let's talk about how SniperThink can help you grow.</p>
        </div>

        <div className="contact-content">
          <div className={`contact-info ${hasIntersected ? 'animate' : ''}`}>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>Email Us</h3>
                <p>hello@sniperthink.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Visit Us</h3>
                <p>Delhi, India</p>
              </div>
            </div>
          </div>

          <form 
            className={`contact-form ${hasIntersected ? 'animate' : ''}`}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? 'error' : ''}
                disabled={loading}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={errors.email ? 'error' : ''}
                disabled={loading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className={errors.message ? 'error' : ''}
                disabled={loading}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {errors.general && (
              <div className="error-message general-error">{errors.general}</div>
            )}

            <button
              type="submit"
              className={`btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;