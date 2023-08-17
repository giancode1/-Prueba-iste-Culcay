//eliminar producto por id
import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.query;
      console.log(id)

      await sql`DELETE FROM Productos WHERE ID=${id}`;
      return response.status(204).json({ message: "producto eliminado" });
    }
  } catch (error) {
    return response.status(404).json({ error });
  }
}
