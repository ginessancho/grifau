import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.AUTH_TOKEN,
});

export async function initializeDatabase() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  try {
    await client.execute({
      sql: 'INSERT INTO subscribers (email) VALUES (?)',
      args: [email],
    });
    return { success: true, message: 'Successfully subscribed' };
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return { success: false, message: 'Email already registered' };
    }
    console.error('Database error:', error);
    return { success: false, message: 'An error occurred' };
  }
}

export default client;
