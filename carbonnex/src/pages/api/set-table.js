import db from '../../../db';

const setTable = async (req, res) => {
  try {
    // Drop the table if it exists to ensure we're creating it fresh with the correct constraints
    const dropTableQuery = `
      DROP TABLE IF EXISTS User_Test;
    `;

    const createTableQuery = `
      CREATE TABLE User_Test (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        number INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      WITH (
        OIDS = FALSE
      )
      TABLESPACE pg_default;

      ALTER TABLE User_Test
          OWNER TO postgres;

      COMMENT ON TABLE User_Test
          IS 'A table to store user information with name and number.';
    `;

    const insertDataQuery = `
      INSERT INTO User_Test (name, number)
      VALUES
      ('JunJun', 620),
      ('Zz', 715),
      ('Shabi', 1520)
      ON CONFLICT (name) DO NOTHING;
    `;

    await db.query(dropTableQuery);
    await db.query(createTableQuery);
    await db.query(insertDataQuery);

    res.status(200).json({ message: 'Table created and test data inserted successfully' });
  } catch (err) {
    console.error('Error setting up database:', err);  // Detailed error logging
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

export default setTable;
