import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    carts: []
}

//cart slice
const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers: {

        //add to cart action
        addToCart : (state,action) => {
            // console.log("action:",action);
            //adding new value which is inside action.payload using spread operator

            //finding if item already exists
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
            //if it already exists then increment its quantity
            if(itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1;
            }
            //else set it quantity to 1 and add to cart
            else {
                const temp = {...action.payload, qnty:1};
                state.carts = [...state.carts, temp]
            }
            // state.carts = [...state.carts,action.payload]
        },

        //remove particular item
        removeFromCart: (state,action) => {
            
            state.carts = state.carts.filter((item) => item.id !== action.payload.id)
            // console.log(state.carts);
        },

        decrementQnty: (state,action) => {
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

            //if quantity is one, decrement qnty means basically deleting item from cart
            if(state.carts[itemIndex].qnty === 1) {
                state.carts = state.carts.filter((item) => item.id !== action.payload.id);
            }
            else {
            state.carts[itemIndex].qnty -=1;
            }
        },

        emptyCart: (state,action) => {
            state.carts = []
        }
    }
});

export const { addToCart, removeFromCart, decrementQnty, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;