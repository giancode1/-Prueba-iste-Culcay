import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    await sql`INSERT INTO Productos (Nombre, Descripcion, Precio, Cantidad_en_stock)
    VALUES
        ('Producto 1', 'Descripción del Producto 1', 19.99, 50),
        ('Producto 2', 'Descripción del Producto 2', 29.99, 30),
        ('Producto 3', 'Descripción del Producto 3', 9.99, 75);
    `;

  } catch (error) {
    return response.status(500).json({ error });
  }

  const products = await sql`SELECT * FROM Productos;`;
  return response.status(200).json({ products: products.rows });
}


