import db from '../../../db'; // Ensure this path is correct to your db connection file

const addUser = async (req, res) => {
  if (req.method === 'POST') {
    const { username, phone, idNumber, kycNumber, address } = req.body;

    try {
      // Insert user data into the database
      const result = await db.query(
        'INSERT INTO account_data (username, phone_number, id_number, verification, address) VALUES ($1, $2, $3, $4, $5)',
        [username, phone, idNumber, kycNumber, address]
      );

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
      console.error('Error inserting user data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default addUser;
