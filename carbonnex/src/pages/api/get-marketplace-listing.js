import db from '../../../db';

const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM marketplace_list');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateasas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM marketplace_list');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getUsers;
