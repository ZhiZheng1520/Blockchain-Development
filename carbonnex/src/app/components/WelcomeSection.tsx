import React from 'react';
import styles from './WelcomeSection.module.css';

interface WelcomeSectionProps {
  title: string;
  description: string;
  ctaText: string;
  imageSrc: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ title, description, ctaText, imageSrc }) => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.ctaButton}>{ctaText}</button>
      </div>
      <div className={styles.imageWrapper}>
        <img loading="lazy" src={imageSrc} alt="Bybit trading platform interface" className={styles.image} />
      </div>
    </section>
  );
};

export default WelcomeSection;