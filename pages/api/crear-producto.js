//crear producto
import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  try {
    if (req.method === "POST") {
      const { nombre, precio, cantidad_en_stock, descripcion } = req.body;

      await sql`INSERT INTO Productos (Nombre, Precio, Cantidad_en_stock, Descripcion)
          VALUES (${nombre}, ${precio}, ${cantidad_en_stock}, ${descripcion})`;
      return response.status(201).json({ message: "producto agregado" });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}
