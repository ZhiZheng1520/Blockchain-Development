'use client'; // Add this line at the top

import styles from '../components/styles/AdvertiserList.module.css';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import MarketplaceWelcome from '../components/MarketplaceWelcome';

const AdvertiserList: React.FC = () => {

    const imageSrc = "/CarbonNex.png"; // Ensure this path is correct and the image exists in the public folder

    const [advertisers, setAdvertisers] = useState([]);
    const [filter, setFilter] = useState('buy'); // Default to 'buy'
    const [activeButton, setActiveButton] = useState('buy'); // Default active button to 'buy'
    const [isSellFormActive, setIsSellFormActive] = useState(false); // State to track if sell form is active

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

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setActiveButton(newFilter); // Set active button based on filter
        setIsSellFormActive(newFilter === 'sell'); // Show sell form if 'sell' is selected
    };

    const filteredAdvertisers = advertisers.filter(advertiser =>
        filter === 'all' || advertiser.to_buy_sell === filter
    );

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'black', padding: '0rem', margin: '0' }}>
            <Header />
            <main className="flex-grow">
                <MarketplaceWelcome imageSrc={imageSrc} />
                <div className={styles.container}>
                    <div className={styles.header}>
                        <button
                            className={`${styles.buyButton} ${activeButton === 'buy' ? styles.inactive : ''}`}
                            onClick={() => handleFilterChange('buy')}
                        >
                            Buy
                        </button>
                        <button
                            className={`${styles.sellButton} ${activeButton === 'sell' ? styles.inactive : ''}`}
                            onClick={() => handleFilterChange('sell')}
                        >
                            Sell
                        </button>
                    </div>
                    {isSellFormActive ? (
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
                                    <button className={styles.cancelButton} onClick={() => setIsSellFormActive(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.advertiserTable}>
                            <div className={styles.advertiserHeaderRow}>
                                <div className={styles.advertiserHeader}>Name</div>
                                <div className={styles.advertiserHeader}>Price</div>
                                <div className={styles.advertiserHeader}>Available Amount</div>
                                <div className={styles.advertiserHeader}>Action</div>
                            </div>
                            {filteredAdvertisers.length === 0 && <p>No advertisers found.</p>}
                            {filteredAdvertisers.map((advertiser, index) => (
                                <div key={index} className={styles.advertiserRow}>
                                    <div className={styles.advertiserName}>{advertiser.username}</div>
                                    <div className={styles.price}>{advertiser.ask_price} ETH</div>
                                    <div className={styles.available}>{advertiser.available_amount} CNX</div>
                                    {/* BuyToken Component or similar action button */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdvertiserList;
