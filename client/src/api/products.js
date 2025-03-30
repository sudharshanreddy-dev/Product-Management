import api from './index'

export const fetchProducts = async (page = 1, limit = 10, sortBy, order) => {
  try {
    const params = { page, limit };
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    const response = await api.get('/products', { params });
    return {
      products: response.data?.products || [],
      page: response.data?.page || page,
      limit: response.data?.limit || limit,
      total: response.data?.total || 0,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    if (!response.data?.id) {
      throw new Error('Invalid product data returned from server');
    }
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  const response = await api.patch(`/products/${id}`, productData)
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

export const searchProducts = async (term) => {
  const response = await api.get('/products/search', { params: { term } })
  return response.data
}

export const filterProducts = async (filters) => {
  const params = {}
  if (filters.category) params.category = filters.category
  if (filters.minPrice) params.minPrice = filters.minPrice
  if (filters.maxPrice) params.maxPrice = filters.maxPrice
  if (filters.minRating) params.minRating = filters.minRating

  const response = await api.get('/products/filter', { params })
  return response.data
}