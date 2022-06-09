import axios from 'axios';
const handleError = (error) => {
  if(error.response.data.msg) {
    throw new Error(error.response.data.msg)
  } else {
    throw new Error(error.message)
  }
}
export const getProducts = async (params) => {
  try {
    const res = await axios.get(`${params.queryKey[0]}`)
  return res.data;
  } catch (error) {
    handleError(error)
  }
};

export const getOneProduct = async (params) => {
  try {
    const res = await axios.get(`${params.queryKey[0]}`)
  return res.data;
  } catch (error) {
    handleError(error)

  }
};

export const searchProducts = async ({ queryKey, pageParam = 1}) => {
  try {
    const res = await axios.get(`${queryKey[0]}&page=${pageParam}`)
    return res.data
  } catch (error) {
    handleError(error)
  }
};

export const filterProducts = (filter, value, sort) => {
  return `/products?price[${filter}]=${value}&sort=${sort}`;
};

export const createProduct = async (data) => {
  return axios.post('/products', data)
};

export const updateProduct = async (data) => {
  return axios.put(`/products/${data.id}`, data)
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`)
};

