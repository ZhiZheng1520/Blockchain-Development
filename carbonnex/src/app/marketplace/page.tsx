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
                            onClick={() => handleFilterChange('sell')}
                        >
                            Buy
                        </button>
                        <button
                            className={`${styles.sellButton} ${activeButton === 'sell' ? styles.inactive : ''}`}
                            onClick={() => handleFilterChange('buy')}
                        >
                            Sell
                        </button>
                    </div>
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
                                <button
                                    className={`${styles.actionButton} ${advertiser.to_buy_sell === 'buy' ? styles.sellCnxButton : styles.buyEthButton}`}
                                >
                                    {advertiser.to_buy_sell === 'sell' ? 'Buy CNX' : 'Sell ETH'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdvertiserList;
