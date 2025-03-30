import { create } from 'zustand'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
} from '../api/products'

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  filters: {
    category: '',
    minPrice: null,
    maxPrice: null,
    minRating: null,
  },
  searchTerm: '',

  getProducts: async (page = 1, limit = 10, sortBy, order) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts(page, limit, sortBy, order);
      if (!data?.products) throw new Error('Invalid response format');
      
      set({
        products: Array.isArray(data.products) ? data.products : [],
        pagination: {
          page: data.page || page,
          limit: data.limit || limit,
          total: data.total || 0,
        },
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ 
        products: [],
        error: error.response?.data?.message || error.message,
        loading: false
      });
    }
  },

  addProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await createProduct(productData);
      if (!newProduct?.id) throw new Error('Invalid product data returned');
      
      set((state) => ({
        products: [newProduct, ...state.products],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1,
        },
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error('Failed to add product:', error);
      set({ 
        error: error.response?.data?.message || error.message,
        loading: false
      });
      return false;
    }
  },

  editProduct: async (id, productData) => {
    set({ loading: true, error: null })
    try {
      const updatedProduct = await updateProduct(id, productData)
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? updatedProduct : product
        ),
        loading: false,
      }))
      return true
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false })
      return false
    }
  },

  removeProduct: async (id) => {
    set({ loading: true, error: null })
    try {
      await deleteProduct(id)
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }))
      return true
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false })
      return false
    }
  },

  searchProducts: async (term) => {
    set({ loading: true, error: null, searchTerm: term })
    try {
      const results = await searchProducts(term)
      set({
        products: results,
        loading: false,
      })
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false })
    }
  },

  filterProducts: async (filters) => {
    set({ loading: true, error: null, filters })
    try {
      const results = await filterProducts(filters)
      set({
        products: results,
        loading: false,
      })
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false })
    }
  },

  resetFilters: async () => {
    set({
      filters: {
        category: '',
        minPrice: null,
        maxPrice: null,
        minRating: null,
      },
      searchTerm: '',
    })
  },
}))

export default useProductStore