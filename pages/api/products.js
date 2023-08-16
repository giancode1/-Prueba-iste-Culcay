import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const products = await sql`SELECT * FROM Productos;`;
    return response.status(200).json({ products: products.rows });
  } catch (error) {
    return response.status(500).json({ error });
  }
}


