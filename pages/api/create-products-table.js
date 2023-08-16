import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE Productos (
        ID SERIAL PRIMARY KEY,
        Nombre VARCHAR(255),
        Descripcion TEXT,
        Precio NUMERIC(10, 2),
        Cantidad_en_stock INT
    );
    `;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}