import { useState } from "react";
import axios, { AxiosError } from "axios";
import type { User } from '../types/userType';

const API_URL = "https://dummyjson.com";

export function useUserAxios(){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
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

    const loginUser = async (username: string, password: string) => {
        const promise = axios.post(`${API_URL}/auth/login`, { username, password });
        const user = await request(promise);
        if (user && user.accessToken) {
            localStorage.setItem('accessToken', user.accessToken);
            setUser(user); 
        }
        return user;
    };

    const getCurrentUser = async () => {
        const token = localStorage.getItem('accessToken');
        const promise = axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true, 
        });
        const user = await request(promise);
        setUser(user); 
        return user;
    };

    return {
        user,
        loading,
        error,
        loginUser,
        getCurrentUser
    };
}