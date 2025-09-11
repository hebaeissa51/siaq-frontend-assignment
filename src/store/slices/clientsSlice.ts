import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { ClientTypes } from "../../types/Client.types";
import axios from "axios";

export const fetchClients = createAsyncThunk<ClientTypes[]>(
    "clients/fetchClients",
    async () => {
        const response = await axios.get<ClientTypes[]>("/data/clients.json");
        return response.data; 
    }
);

interface ClientsState {
    data: ClientTypes[];
    loading: boolean;
    error: string | null;
}

const initialState: ClientsState = {
    data: [],
    loading: false,
    error: null,
};

const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        addClient: (state, action: PayloadAction<ClientTypes>) => {
            state.data.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch clients";
            });
    },
});

export const { addClient } = clientsSlice.actions;
export default clientsSlice.reducer;
