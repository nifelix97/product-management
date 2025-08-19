import { useState } from "react";
import axios, { AxiosError } from "axios";
import type { Cart, CartProductInput } from '../types/cartType';
const API_URL = "https://dummyjson.com";

interface CartApiResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export function useCartAxios () {
    const [carts, setCarts] = useState<Cart[]>([]);
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

    // get all carts
    const fetchCarts = async () => {
        try {
            const data = await request<CartApiResponse>(axios.get(`${API_URL}/carts`));
            setCarts(data.carts || []);
            console.log('Fetched carts:', data.carts.length);
        } catch (error) {
            console.error('Failed to fetch carts:', error);
            setCarts([]);
        }
    }

    //get single cart
const getCartById = async (id: number) => {
    const localCart = carts.find(cart => cart.id === id);
    if (localCart) return localCart;
    try {
        const data = await request<Cart>(axios.get(`${API_URL}/carts/${id}`));
        return data;
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        return null;
    }
}

// get cart by user id
const getCartsByUserId = async (userId: number) => {
    try {
        const data = await request<CartApiResponse>(axios.get(`${API_URL}/carts/user/${userId}`));
        return data.carts || [];
    } catch (error) {
        console.error('Failed to fetch carts by user ID:', error);
        return [];
    }
}

// delete cart
const deleteCart = async (id: number) => {
    try {
        await request(axios.delete(`${API_URL}/carts/${id}`));
        setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
    } catch (error) {
        console.error('Failed to delete cart:', error);
    }
}

// update cart
const updateCart = async (id: number, updatedCart: Partial<Cart>) => {
    try {
        const data = await request<Cart>(axios.put(`${API_URL}/carts/${id}`, updatedCart));
        setCarts((prevCarts) => prevCarts.map((cart) => (cart.id === id ? data : cart)));
        console.log('Cart updated:', data);
    } catch (error) {
        console.error('Failed to update cart:', error);
    }
}

// create cart
const createCart = async (newCart: { userId: number; products: CartProductInput[] }) => {
    try {
        const data = await request<Cart>(axios.post(`${API_URL}/carts/add`, newCart));
        setCarts((prevCarts) => [...prevCarts, data]);
        console.log('Cart created:', data);
    } catch (error) {
        console.error('Failed to create cart:', error);
    }
};

    return {
        carts,
        loading,
        error,
        fetchCarts,
        getCartById,
        getCartsByUserId,
        deleteCart,
        updateCart,
        createCart
    };
}