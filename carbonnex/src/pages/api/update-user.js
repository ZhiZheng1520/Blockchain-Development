import db from '../../../db';

const updateUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Assuming you're updating the user in the `account_data` table based on the address
    const result = await db.query(
      'UPDATE account_data SET username = $1, email = $2 WHERE address = $3',
      [username, email, req.query.address]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default updateUser;
