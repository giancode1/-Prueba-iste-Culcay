//editar producto
import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  try {
    if (req.method === "PUT") {
      const { id } = req.query;
      const { nombre, precio, cantidad_en_stock, descripcion } = req.body;

      await sql`UPDATE Productos SET Nombre=${nombre}, Precio=${precio}, Cantidad_en_stock=${cantidad_en_stock}, Descripcion=${descripcion} WHERE ID=${id}`;
      return response.status(200).json({ message: "producto actualizado" });
    }
  } catch (error) {
    return response.status(400).json({ error });
  }
}
