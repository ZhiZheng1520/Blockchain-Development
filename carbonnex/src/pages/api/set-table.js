import db from '../../../db';

const setTable = async (req, res) => {
  try {
    // Drop the table if it exists to ensure we're creating it fresh with the correct constraints
    const dropTableQuery = `
      DROP TABLE IF EXISTS marketplace_listing;
    `;

    const createTableQuery = `
      CREATE TABLE marketplace_listing (
        username VARCHAR(50) NOT NULL,
        address VARCHAR(50) NOT NULL,
        to_buy_sell VARCHAR(50) NOT NULL,
        ask_price INTEGER NOT NULL,
        available_amount INTEGER NOT NULL,
        volume_traded INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      WITH (
        OIDS = FALSE
      )
      TABLESPACE pg_default;

      ALTER TABLE marketplace_listing
          OWNER TO postgres;

      COMMENT ON TABLE marketplace_listing
          IS 'A table to store user information with name and number.';
    `;

    // Example insert query (optional, define this if you need to insert data after table creation)
    // const insertDataQuery = `
    //   INSERT INTO marketplace_listing (username, address, to_buy_sell, ask_price, available_amount, volume_traded)
    //   VALUES ('testuser', '0x0000000000000000000000000000000000000000', 'buy', 100, 10, 5000);
    // `;

    await db.query(dropTableQuery);
    await db.query(createTableQuery);

    // Uncomment if insertDataQuery is needed
    // await db.query(insertDataQuery);

    res.status(200).json({ message: 'Table created successfully' });
  } catch (err) {
    console.error('Error setting up database:', err);  // Detailed error logging
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

export default setTable;
