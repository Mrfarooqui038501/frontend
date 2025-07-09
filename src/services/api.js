// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://saaslanding-page.onrender.com';

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
          backgroundImage: 'https://images.unsplash.com/photo-1451187,1v:1.5,f_auto/quality/eco-friendly%2C%20fast%2C%20and%20affordable%20way%20to%20grow',
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
          backgroundImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
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
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        },
        {
          id: 2,
          name: 'Pro',
          price: '$29/month',
          features: ['All Basic features', 'Feature 4', 'Feature 5', 'Priority support']
        },
        {
          id: 3,
          name: 'Enterprise',
          price: 'Contact us',
          features: ['All Pro features', 'Custom integrations', 'Dedicated support', 'SLA guarantee']
        }
      ];
    }
  },

  // Contact form submission
  async submitContact(formData) {
    return await makeRequest('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
};

// Export default for backwards compatibility
export default apiService;