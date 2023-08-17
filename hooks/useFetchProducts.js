import { useEffect, useState } from "react";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await fetch("/api/products");
    const responseJson = await response.json();
    setProducts(responseJson.products);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    getProducts,
    isLoading
  };
};
