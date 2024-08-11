import React from 'react';
import styles from '../components/styles/MarketplaceWelcome.module.css';

interface MarketplaceWelcomeProps {
  imageSrc: string;
}

const MarketplaceWelcome: React.FC<MarketplaceWelcomeProps> = ({ imageSrc }) => {
  return (
    <section className={styles.marketplaceWelcome}>
      <div className={styles.imageWrapper}>
        <img loading="lazy" src={imageSrc} alt="CarbonNex" className={styles.image} />
      </div>
    </section>
  );
};

export default MarketplaceWelcome;
