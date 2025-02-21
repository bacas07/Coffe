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
        const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjM4ZDI0MjQ3YmQzNjRhMTQyNzM5MyIsIm5hbWUiOiJrZGVhdmlsYSIsImVtYWlsIjoia2RkZWF2aWxhM0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDAxMDEzNDUsImV4cCI6MTc0MDEwNDk0NX0.NR4-KOARXaBhZaIZIJf-Z2w40NF2Qk0z2vI8Ov6i5uI";

        const response = await API.get<Coffee>(`/coffes/${id}`, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        }
        );
        const data = await response.data;
        return data;

    } catch (error) {
        console.error("Error fetching coffees:", error);
        return null;
    }
}
