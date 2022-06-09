import React from 'react';
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../api/productAPI';
import ProductInfo from '../components/ProductInfo';
import { useQuery } from 'react-query';

const ProductDetail = () => {
  const { id } = useParams()
  // const url = getOneProduct(id)
  const key = `products/${id}`
  const { data, isLoading, error } = useQuery(key, getOneProduct, {
    enabled: !!id
  })

  return <main>
    <ProductInfo 
    product={data} 
    loading={isLoading} 
    error={error}  
    />
  </main>;
};

export default ProductDetail;
