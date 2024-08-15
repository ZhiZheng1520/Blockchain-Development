"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/Header.module.css';
import { ConnectButton } from './ConnectButton';
import { ConnectModal } from './ConnectModal';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setConnectedAccount(window.ethereum.selectedAddress);
    }
  }, []);

  const handleSubNavClick = async (event: React.MouseEvent, url: string) => {
    event.preventDefault();

    if (window.ethereum && window.ethereum.request) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          window.location.href = url;
        } else {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching accounts", error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };



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
            <a href="/marketplace" onClick={(e) => handleSubNavClick(e, '/marketplace')}>Marketplace</a>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/finance">Finance</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <a href="/finance/staking" onClick={(e) => handleSubNavClick(e, '/finance/staking')}>Staking</a>
              </li>
              <li className={styles.subNavItem}>
                <a href="/finance/loan" onClick={(e) => handleSubNavClick(e, '/finance/loan')}>Loan</a>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/rewards">Rewards</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <a href="/rewards/ranking" onClick={(e) => handleSubNavClick(e, '/rewards/ranking')}>Ranking</a>
              </li>
              <li className={styles.subNavItem}>
                <a href="/rewards/nft" onClick={(e) => handleSubNavClick(e, '/rewards/nft')}>NFT</a>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/tools">Tools</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <a href="/tools/carbon-footprint-tracker" onClick={(e) => handleSubNavClick(e, '/tools/carbon-footprint-tracker')}>Carbon Footprint Tracker</a>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/support">Support</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <a href="/support/about-us" onClick={(e) => handleSubNavClick(e, '/support/about-us')}>About Us</a>
              </li>
              <li className={styles.subNavItem}>
                <a href="/support/contact-us" onClick={(e) => handleSubNavClick(e, '/support/contact-us')}>Contact Us</a>
              </li>
            </ul>
          </li>
          <li className={`${styles.navItem} ${styles.hasSubNav}`}>
            <Link href="/profile">Profile</Link>
            <ul className={styles.subNavList}>
              <li className={styles.subNavItem}>
                <a href="/profile/view-profile" onClick={(e) => handleSubNavClick(e, '/profile/view-profile')}>View Profile</a>
              </li>
              <li className={styles.subNavItem}>
                <a href="/profile/settings" onClick={(e) => handleSubNavClick(e, '/profile/settings')}>Settings</a>
              </li>
              <li className={styles.subNavItem}>
                <a href="/profile/kyc" onClick={(e) => handleSubNavClick(e, '/profile/kyc')}>KYC Approval</a>
              </li>
            </ul>
          </li>
        </ul>
         <div className={styles.connectWrapper}>
                  <ConnectButton />

        </div>
      </nav>

      {isModalOpen && (
        <ConnectModal
          setIsModalOpen={setIsModalOpen}
          setIsConnected={setConnectedAccount}
          connectToMetaMask={() => {}}
        />
      )}
    </header>
  );
};

export default Header;
