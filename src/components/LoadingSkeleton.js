import React from 'react';

const LoadingSkeleton = ({ type }) => {
  const renderHeroSkeleton = () => (
    <div className="skeleton-hero">
      <div className="skeleton-content">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-subtitle"></div>
        <div className="skeleton-button"></div>
      </div>
      <div className="skeleton-image"></div>
    </div>
  );

  const renderFeaturesSkeleton = () => (
    <div className="skeleton-features">
      <div className="skeleton-header">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-subtitle"></div>
      </div>
      <div className="skeleton-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-icon"></div>
            <div className="skeleton-text skeleton-card-title"></div>
            <div className="skeleton-text skeleton-card-desc"></div>
            <div className="skeleton-text skeleton-card-desc short"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricingSkeleton = () => (
    <div className="skeleton-pricing">
      <div className="skeleton-header">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-subtitle"></div>
      </div>
      <div className="skeleton-grid">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="skeleton-pricing-card">
            <div className="skeleton-text skeleton-plan-name"></div>
            <div className="skeleton-text skeleton-price"></div>
            <div className="skeleton-features-list">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-text skeleton-feature"></div>
              ))}
            </div>
            <div className="skeleton-button"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const skeletonTypes = {
    hero: renderHeroSkeleton,
    features: renderFeaturesSkeleton,
    pricing: renderPricingSkeleton,
  };

  return (
    <div className="loading-skeleton">
      {skeletonTypes[type] ? skeletonTypes[type]() : null}
      <style jsx>{`
        .loading-skeleton {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-hero {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 4rem 0;
        }

        .skeleton-content {
          flex: 1;
        }

        .skeleton-text {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .skeleton-title {
          height: 3rem;
          width: 80%;
        }

        .skeleton-subtitle {
          height: 1.5rem;
          width: 60%;
        }

        .skeleton-button {
          height: 3rem;
          width: 200px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .skeleton-image {
          width: 400px;
          height: 300px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 12px;
        }

        .skeleton-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skeleton-card {
          padding: 2rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
        }

        .skeleton-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .skeleton-card-title {
          height: 1.5rem;
          width: 70%;
        }

        .skeleton-card-desc {
          height: 1rem;
          width: 100%;
        }

        .skeleton-card-desc.short {
          width: 60%;
        }

        .skeleton-pricing-card {
          padding: 2rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
        }

        .skeleton-plan-name {
          height: 2rem;
          width: 60%;
          margin-bottom: 1rem;
        }

        .skeleton-price {
          height: 3rem;
          width: 80%;
          margin-bottom: 2rem;
        }

        .skeleton-features-list {
          margin-bottom: 2rem;
        }

        .skeleton-feature {
          height: 1rem;
          width: 90%;
          margin-bottom: 0.5rem;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .skeleton-hero {
            flex-direction: column;
            text-align: center;
          }

          .skeleton-image {
            width: 100%;
            height: 200px;
          }

          .skeleton-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;