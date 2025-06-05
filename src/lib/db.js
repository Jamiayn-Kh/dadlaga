import { Client } from 'pg';

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'idmb-next',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 5432,
});

// Database холболт
const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ PostgreSQL өгөгдлийн сан руу амжилттай холбогдлоо");
  } catch (err) {
    console.error("❌ Холболтын алдаа:", err.message);
    process.exit(1);
  }
};

// Анхны холболт
connectDB();

export default client;