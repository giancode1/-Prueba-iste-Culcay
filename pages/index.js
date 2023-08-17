import { useContext } from "react";
import { ToggleTheme } from "@/components/ToggleTheme";
import Footer from "@/components/Footer";
import { CreateProduct } from "@/components/CreateProduct";
import { ProductContext } from "@/context/ProductContext";
import { ListProducts } from "@/components/ListProducts";
import { SearchProduct } from "@/components/SearchProduct";

export default function Home() {
  
  const {products, isLoading} = useContext(ProductContext)

  if (isLoading) return <p>Loading...</p>;
  if (!products) return <p>Vuelve a cargar</p>;

  return (
    <main className=" dark:bg-gray-800 dark:text-white bg-gray-100 py-2 px-2">
      <h1 className="text-3xl text-center">Productos</h1>
      
      <div className="flex items-center justify-end">
        <ToggleTheme />
      </div>

      <CreateProduct />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <SearchProduct />
        <ListProducts />
      </div>

    <Footer />
      
    </main>
  );
}
