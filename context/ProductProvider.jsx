import { useState } from 'react';
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductContext } from "./ProductContext";
import PropTypes from "prop-types";

export const ProductProvider = ({ children }) => {
  const { products, getProducts, isLoading } = useFetchProducts();
  const [inputSearch, setInputSearch] = useState('');

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        isLoading,
        inputSearch,
        setInputSearch
      }}
    >
      <main>{children}</main>
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.object,
};
