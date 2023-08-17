import { useState, useEffect } from "react";
import { ToggleTheme } from "@/components/ToggleTheme";
import Footer from "@/components/Footer";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!products) return <p>No data</p>;

  return (
    <main className=" dark:bg-gray-800 dark:text-white py-2 px-2">
      <h1 className="text-3xl text-center">Productos</h1>
      
      <div className="flex items-center justify-end">
        <ToggleTheme />
      </div>

      <Modal />

      <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* search */}
            <div className="pt-2 pb-4 pl-2 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar" />
              </div>
            </div>

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
                {
                  products.map( p => 
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={p.id}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {p.nombre}  
                      </th>
                      <td className="px-6 py-4">{p.descripcion}</td>
                      <td className="px-6 py-4">{p.precio}</td>
                      <td className="px-6 py-4">{p.cantidad_en_stock}</td>
                      <td className="px-6 py-4">
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Editar
                        </a>
                        <a className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">
                          Eliminar
                        </a>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      </div>

    <Footer />
      
    </main>
  );
}
