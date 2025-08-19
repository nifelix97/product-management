import { useState } from "react";
import axios, { AxiosError } from "axios";
import type { Product } from '../types/productType';

const API_URL = "https://dummyjson.com";

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Category {
    slug: string;
    name: string;
    url: string;
}

export function useProductsAxios() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const request = async <T>(promise: Promise<{ data: T }>): Promise<T> => {
        setLoading(true);
        setError(null);
        try {
            const response = await promise;
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            setError(axiosError);
            throw axiosError;
        } finally {
            setLoading(false);
        }
    }

    // get all products
    const fetchProducts = async () => {
        try {
            const data = await request<ApiResponse>(axios.get(`${API_URL}/products`));
            setProducts(data.products || []); 
            console.log('Fetched products:', data.products.length);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setProducts([]);
        }
    }

    // get single product
    const getProduct = async (id: number) => {
        return await request<Product>(axios.get(`${API_URL}/products/${id}`));
    }

    //get all categories
    const fetchCategories = async () => {
        try {
            const data = await request<Category[]>(axios.get(`${API_URL}/products/categories`));
            setCategories(data || []);
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            setCategories([]);
        }
    }

    const getCategories = async () => {
        return await request<Category[]>(axios.get(`${API_URL}/products/categories`));
    }

    // get products by category
    const getProductsByCategory = async (category: string) => {
    try {
        const data = await request<ApiResponse>(axios.get(`${API_URL}/products/category/${category}`));
        console.log('Fetched products by category:', category);
        return data.products || [];
    } catch (error) {
        console.error('Failed to fetch products by category:', error);
        throw error;
    }
}

// update product
const updateProduct = async (id: number, updatedData: Partial<Product>) => {
    try {
        const data = await request<Product>(axios.put(`${API_URL}/products/${id}`, updatedData));
        
        setProducts((prev) => {
            const updatedProducts = prev.map((product) => (product.id === id ? data : product));
            console.log('Products state updated. Updated product:', data);
            console.log('All products count:', updatedProducts.length);
            return updatedProducts;
        });
        
        console.log('Product updated:', data);
        return data;
    } catch (error) {
        console.error('Failed to update product:', error);
        throw error;
    }
};

// delete product
const deleteProduct = async (id: number) => {
    try {
        await request(axios.delete(`${API_URL}/products/${id}`));
        setProducts((prev) => prev.filter((product) => product.id !== id));
        console.log('Product deleted from local state');
    } catch (error) {
        console.error('Failed to delete product:', error);
        throw error;
    }
};

// search products
const searchProducts = async (query: string) => {
    try {
        const data = await request<ApiResponse>(axios.get(`${API_URL}/products/search?q=${query}`));
        console.log('Fetched products by search query:', query);
        return data.products || [];
    } catch (error) {
        console.error('Failed to fetch products by search query:', error);
        throw error;
    }
};

// creating product

const createProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
        const data = await request<Product>(axios.post(`${API_URL}/products/add`, newProduct));
        setProducts((prev) => [...prev, data]);
        console.log('Product created:', data);
        return data;
    } catch (error) {
        console.error('Failed to create product:', error);
        throw error;
    }
};

    return { 
        products, 
        loading, 
        error, 
        categories,
        fetchProducts,
        getProduct,
        fetchCategories,
        getCategories,
        getProductsByCategory,
        updateProduct,
        deleteProduct,
        searchProducts,
        createProduct
    };
}