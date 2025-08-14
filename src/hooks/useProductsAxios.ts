import { useState } from "react";
import axios, { AxiosError } from "axios";
import type { Product } from '../types/productType';

const API_URL = "https://dummyjson.com/products";

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export function useProductsAxios() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

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
            const data = await request<ApiResponse>(axios.get(API_URL));
            setProducts(data.products || []); 
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setProducts([]);
        }
    }

    // get single product
    const getProduct = async (id: number) => {
        return await request<Product>(axios.get(`${API_URL}/${id}`));
    }

    return { 
        products, 
        loading, 
        error, 
        fetchProducts,
        getProduct
    };
}