// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://saaslanding-page.onrender.com/api';

// Generic API request function
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    console.log(`Making ${options.method || 'GET'} request to: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// API service object
export const apiService = {
  // Get slides for hero section
  async getSlides() {
    try {
      return await makeRequest('/api/slides');
    } catch (error) {
      // Return fallback data if API is not available
      console.warn('Using fallback slides data');
      return [
        {
          id: 1,
          title: 'Welcome to SniperThink',
          subtitle: 'Transform your business with our innovative solutions',
          cta: 'Get Started',
          backgroundImage: 'https://images.unsplash.com/photo-1451187508271-5c5f59289596?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
        },
        {
          id: 2,
          title: 'Powerful Features',
          subtitle: 'Everything you need to scale your business efficiently',
          cta: 'Learn More',
          backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80',
        },
        {
          id: 3,
          title: 'Join Thousands of Users',
          subtitle: 'Trusted by companies worldwide for their success',
          cta: 'Start Free Trial',
          backgroundImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        }
      ];
    }
  },

  // Get features for features section
  async getFeatures() {
    try {
      return await makeRequest('/api/features');
    } catch (error) {
      console.warn('Using fallback features data');
      return [
        {
          id: 1,
          title: 'Easy to Use',
          description: 'Simple and intuitive interface for all users',
          icon: '🚀'
        },
        {
          id: 2,
          title: 'Secure',
          description: 'Enterprise-grade security for your data',
          icon: '🔒'
        },
        {
          id: 3,
          title: '24/7 Support',
          description: 'Round-the-clock support from our expert team',
          icon: '💬'
        },
        {
          id: 4,
          title: 'Fast Performance',
          description: 'Lightning-fast response times for all operations',
          icon: '⚡'
        },
        {
          id: 5,
          title: 'Cloud Integration',
          description: 'Seamless integration with popular cloud platforms',
          icon: '☁️'
        },
        {
          id: 6,
          title: 'Analytics',
          description: 'Comprehensive analytics and reporting tools',
          icon: '📊'
        }
      ];
    }
  },

  // Get pricing for pricing section
  async getPricing() {
    try {
      return await makeRequest('/api/pricing');
    } catch (error) {
      console.warn('Using fallback pricing data');
      return [
        {
          id: 1,
          name: 'Basic',
          price: '$9/month',
          features: ['5 Projects', '1 User', 'Basic Support', '1GB Storage']
        },
        {
          id: 2,
          name: 'Pro',
          price: '$29/month',
          features: ['Unlimited Projects', '5 Users', 'Priority Support', '10GB Storage', 'Advanced Analytics']
        },
        {
          id: 3,
          name: 'Enterprise',
          price: 'Contact us',
          features: ['Unlimited Everything', 'Unlimited Users', 'Dedicated Support', 'Custom Storage', 'SLA Guarantee', 'Custom Integrations']
        }
      ];
    }
  },

  // Contact form submission
  async submitContact(formData) {
    try {
      return await makeRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      throw error;
    }
  },

  // Get contact by ID
  async getContact(id) {
    try {
      return await makeRequest(`/api/contact/${id}`);
    } catch (error) {
      console.error('Failed to get contact:', error);
      throw error;
    }
  },

  // Get all contacts (for admin purposes)
  async getAllContacts() {
    try {
      return await makeRequest('/api/contacts');
    } catch (error) {
      console.error('Failed to get contacts:', error);
      throw error;
    }
  },

  // Get slide by ID
  async getSlide(id) {
    try {
      return await makeRequest(`/api/slides/${id}`);
    } catch (error) {
      console.error('Failed to get slide:', error);
      throw error;
    }
  },

  // Health check
  async checkHealth() {
    try {
      return await makeRequest('/api/health');
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

// Export default for backwards compatibility
export default apiService;