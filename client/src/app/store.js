import { configureStore } from '@reduxjs/toolkit'
// import foodScreenReducer from "../screens/FoodList/slice"
import bookScreenReducer from "../pages/books/slice"

export const store = configureStore({
    reducer:{
        // foodsPackage: foodScreenReducer
        booksPackage : bookScreenReducer
    }
})