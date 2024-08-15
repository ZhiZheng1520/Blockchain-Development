'use client';

import styles from '../components/styles/AdvertiserList.module.css';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import MarketplaceWelcome from '../components/MarketplaceWelcome';

const AdvertiserList: React.FC = () => {
    const imageSrc = "/CarbonNex.png"; // Ensure this path is correct and the image exists in the public folder
    const [advertisers, setAdvertisers] = useState([]);

    useEffect(() => {
        const fetchAdvertisers = async () => {
            try {
                console.log('Fetching data from API...');
                const response = await fetch('/api/get-marketplace-listing');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Debugging log
                setAdvertisers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAdvertisers();
    }, []);

    const buyAdvertisers = advertisers.filter(advertiser => advertiser.to_buy_sell === 'buy');
    const sellAdvertisers = advertisers.filter(advertiser => advertiser.to_buy_sell === 'sell');

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'black', padding: '0rem', margin: '0' }}>
            <Header />
            <main className="flex-grow">
                <MarketplaceWelcome imageSrc={imageSrc} />
                <div className={styles.mainContainer}>
                    {/* Buy Section Container */}
                    <div className={styles.buyContainer}>
                        <h2 className={styles.sectionTitle}>Buy</h2>
                        <div className={styles.advertiserTable}>
                            <div className={styles.advertiserHeaderRow}>
                                <div className={styles.advertiserHeader}>Name</div>
                                <div className={styles.advertiserHeader}>Price</div>
                                <div className={styles.advertiserHeader}>Available Amount</div>
                                <div className={styles.advertiserHeader}>Action</div>
                            </div>
                            {buyAdvertisers.length === 0 && <p>No advertisers found.</p>}
                            {buyAdvertisers.map((advertiser, index) => (
                                <div key={index} className={styles.advertiserRow}>
                                    <div className={styles.advertiserName}>{advertiser.username}</div>
                                    <div className={styles.price}>{advertiser.ask_price} ETH</div>
                                    <div className={styles.available}>{advertiser.available_amount} CNX</div>
                                    <button className={styles.buyButton}>Buy</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sell Section Container */}
                    <div className={styles.sellContainer}>
                        <h2 className={styles.sectionTitle}>Sell</h2>
                        <div className={styles.sellFormContainer}>
                            <div className={styles.sellForm}>
                                <h2 className={styles.sellTitle}>Sell Listing</h2>
                                <div className={styles.inputGroup}>
                                    <p className={styles.sellText}>Please enter the amount to sell:</p>
                                    <input type="text" placeholder="CNX" className={styles.inputField} />
                                    <p className={styles.sellText}>Please enter the price:</p>
                                    <input type="text" placeholder="ETH" className={styles.inputField} />
                                </div>
                                <div className={styles.formActions}>
                                    <button className={styles.listButton}>List Now</button>
                                    <button className={styles.cancelButton}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdvertiserList;
