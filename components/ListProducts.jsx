import { useState, useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { EditProduct } from "./EditProduct";

export const ListProducts = () => {
  const { products, getProducts, inputSearch } = useContext(ProductContext);
  const [editProduct, setEditProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  let result = products;

  //busca en base al nombre
  if(inputSearch){
    result = products.filter(product => {
      const p =  product.nombre.toLowerCase()
      return p.includes(inputSearch.toLowerCase())
    })
  }

  //eliminar producto por id
  const handleDeleteProduct = async (id) => {
    try {
      await fetch("/api/eliminar-producto?id="+id, {
        method: 'DELETE',
      });
      getProducts();
    } catch (e) {
      console.log('error', e);
    }
  };

  //editar producto por id
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpenEditModal(true)
  }

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Cantidad en Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {result.map((p) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              key={p.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {p.nombre}
              </th>
              <td className="px-6 py-4">{p.descripcion}</td>
              <td className="px-6 py-4">{p.precio}</td>
              <td className="px-6 py-4">{p.cantidad_en_stock}</td>

              <td className="px-6 py-4">
                <a onClick={()=>handleEditProduct(p)}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    style={{cursor: "pointer"}}
                >
                  Editar
                </a>
                <a  onClick={()=>handleDeleteProduct(p.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                    style={{cursor: "pointer"}}
                >
                  Eliminar
                </a>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
          {
            openEditModal && <EditProduct 
                                editProduct={editProduct} 
                                setEditProduct={setEditProduct} 
                                openEditModal={openEditModal} 
                                setOpenEditModal={setOpenEditModal}
                            />
          }
    </>
  );
};
