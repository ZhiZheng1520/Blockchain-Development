import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { Connect } from './Connect';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/CarbonNex.png" alt="Logo" width={50} height={50} />
          </Link>
        </div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/marketplace">Marketplace</Link>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/finance">Finance</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/finance/staking">Staking</Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/finance/loan">Loan</Link>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="http://localhost:3000/rewards">Rewards</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/rewards/ranking">Ranking</Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/rewards/nft">NFT</Link>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/tools">Tools</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/tools/carbon-footprint-tracker">Carbon Footprint Tracker</Link>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/support">Support</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/support/about-us">About Us</Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/support/contact-us">Contact&nbsp;Us</Link>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/profile">Profile</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <Link href="/profile/view-profile">View Profile</Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/profile/settings">Settings</Link>
              </li>
              <li className={styles.subNavItem}>
                <Link href="/profile/kyc">KYC Approval</Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className={styles.connectWrapper}>
          <Connect />
        </div>
      </nav>
    </header>
  );
};

export default Header;
