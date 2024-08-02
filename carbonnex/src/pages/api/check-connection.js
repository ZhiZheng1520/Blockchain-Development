import db from '../../../db';

const testEnvAndDbConnection = async (req, res) => {
  // Fetch environment variables
  const user = process.env.PG_USER;
  const host = process.env.PG_HOST;
  const database = process.env.PG_DATABASE;
  const password = process.env.PG_PASSWORD;
  const port = process.env.PG_PORT;

  // Log environment variables
  console.log("Environment Variables:");
  console.log(`PG_USER: ${user}`);
  console.log(`PG_HOST: ${host}`);
  console.log(`PG_DATABASE: ${database}`);
  console.log(`PG_PASSWORD: ${password}`);
  console.log(`PG_PORT: ${port}`);

  // Check database connection
  try {
    const result = await db.query('SELECT NOW()');
    res.status(200).json({
      status: 'Connected',
      time: result.rows[0].now,
      environment: {
        PG_USER: user,
        PG_HOST: host,
        PG_DATABASE: database,
        PG_PASSWORD: password,
        PG_PORT: port,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'Disconnected',
      error: 'Internal Server Error',
      environment: {
        PG_USER: user,
        PG_HOST: host,
        PG_DATABASE: database,
        PG_PASSWORD: password,
        PG_PORT: port,
      }
    });
  }
};

export default testEnvAndDbConnection;
