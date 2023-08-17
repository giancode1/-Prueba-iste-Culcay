import { ProductContext } from '@/context/ProductContext';
import { useState, useContext } from 'react';

export const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        cantidad_en_stock: '',
        descripcion: ''
    });
    const {getProducts} = useContext(ProductContext)

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
      
        const response = await fetch('/api/crear-producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      
        if (response.ok) {
          setIsModalOpen(false);
          setFormData({
            name: '',
            price: '',
            cantidad_en_stock: '',
            description: ''
          });
          getProducts()
        } else {
          console.error('Error al crear el producto');
        }
    };
      
    const stopPropagation = (e) => {
        e.stopPropagation(); // Prevent event from reaching the parent (modal background)
    };

  return (
    <>
    {/* Modal toggle */}
    <div className="flex m-2">
        <button
            id="defaultModalButton"  
            onClick={toggleModal} 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Crear Producto
        </button>
    </div>


    {/* Main modal */}
    {
        isModalOpen && (
            <div 
                id="defaultModal" 
                tabIndex={-1} 
                aria-hidden="true" 
                className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black backdrop-blur"
                onClick={() => setIsModalOpen(false)}
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto"
                    onClick={stopPropagation}
                >
                    {/* Modal content */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* Modal header */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Agregar Producto
                            </h3>
                            <button onClick={()=>setIsModalOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                <span className="sr-only">Cerrar</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                {/* nombre */}
                                <div>
                                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                    <input type="text" name="nombre" id="nombre" 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nombre del producto" required 
                                    />
                                </div>
                                {/* precio */}
                                <div>
                                    <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                                    <input type="number" min="0" name="precio" id="precio" 
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="100" required 
                                    />
                                </div>
                                {/* cantidad_en_stock */}
                                <div>
                                    <label htmlFor="cantidad_en_stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad en Stock</label>
                                    <input type="number" min="0" name="cantidad_en_stock" id="cantidad_en_stock" 
                                        value={formData.cantidad_en_stock}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required 
                                    />
                                </div>
                                {/* descripcion */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                    <textarea id="descripcion" name="descripcion" rows={4} 
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Escribe la descripción del producto aquí" 
                                        required 
                                        // defaultValue={""} 
                                    />   
                                </div>
                            </div>
                            <button type="submit" className="inline-flex dark:text-white items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Agregar nuevo producto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    </>
  )
}
