import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";

// create a store with all reducers
export const store = configureStore({
    reducer:{
        allCart: cartSlice
    }
})