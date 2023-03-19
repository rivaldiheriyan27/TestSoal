import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { booksData } from '../../api/booksApi'

const sliceName = 'rentalBooks'

export const booksRental = createAsyncThunk(
    `${sliceName}/getActivity`,
    async (arg, thunkAPI) => {
      try {
        console.log(arg , "ini data slice")
        const response = await booksData(arg.token)
        console.log(response.data.data, "ini hasil response")
        return thunkAPI.fulfillWithValue(response.data.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    },
)

const initialState = {
    booksPackage: [],
    isLoading: false,
    isError: '',
}

const bookSlice = createSlice({
    name : "booksData",
    initialState,
    reducers:{
        resetState: () => {
            return initialState
        },
    },
    extraReducers: {
        [booksRental.pending]: state => {
          state.isLoading = true
        },
        [booksRental.fulfilled]: (state, action) => {
          state.isLoading = false
          state.booksPackage = action.payload
        },
        [booksRental.rejected]: (state, action) => {
          state.isLoading = false
          state.booksPackage = []
          state.isError = action.error.message
        },
      },
})

export const { resetState } = bookSlice.actions
export default bookSlice.reducer