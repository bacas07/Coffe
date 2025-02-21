import axios from "axios";
import type { Coffee } from "../types/coffee";

const API = axios.create({
    baseURL: "https://coffestore-8d5442930e01.herokuapp.com/",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "ARC4M"
    },
});

export const getCoffees = async (): Promise<Coffee[]> => {
    try {
        const response = await API.get<Coffee[]>("/coffes");
        const data = await response.data;
        return data;

    } catch (error) {
        console.error("Error fetching coffees:", error);
        return [];
    }
}

export const getCoffeById = async (id: string): Promise<Coffee | null> => {
    try {
        const response = await API.get<Coffee>(`/coffes/${id}`);
        const data = await response.data;
        return data;

    } catch (error) {
        console.error("Error fetching coffees:", error);
        return null;
    }
}
