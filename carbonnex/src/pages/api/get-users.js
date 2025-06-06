import db from '../../../db';

const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM account_data');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getUsers;
