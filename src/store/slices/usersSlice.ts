import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { UserTypes } from "../../types/User.types";
import axios from "axios";

// Async thunk to fetch users from JSON file
export const fetchUsers = createAsyncThunk<UserTypes[]>(
    "users/fetchUsers",
    async () => {
        const response = await axios.get<UserTypes[]>("/data/users.json");
        return response.data;
    }
);

interface UsersState {
    data: UserTypes[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    data: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<{ id: number; name: string; phone: string }>) => {
            const user = state.data.find((u) => u.id === action.payload.id);
            if (user) {
                user.name = action.payload.name;
                user.phone = action.payload.phone;
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter((user) => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            });
    },
});

export const { updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
