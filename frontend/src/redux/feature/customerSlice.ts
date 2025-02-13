import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerDetails } from "@/interface";
import { AppDispatch } from "@/redux/store";
import axios from "axios";

interface CustomerState {
  customer: CustomerDetails | null;
}

const initialState: CustomerState = {
  customer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<CustomerDetails>) => {
      state.customer = action.payload;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      if (state.customer) {
        const product = state.customer.products.find(
          (p) => p.product_id === action.payload
        );
        if (product) {
          product.quantity += 1;
          state.customer.total_transaction += product.price;
        }
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      if (state.customer) {
        const product = state.customer.products.find(
          (p) => p.product_id === action.payload
        );
        if (product && product.quantity > 1) {
          product.quantity -= 1;
          state.customer.total_transaction -= product.price;
        }
      }
    },
  },
});

export const { setCustomer, incrementQuantity, decrementQuantity } =
  customerSlice.actions;
export default customerSlice.reducer;

// Thunk untuk fetch data pelanggan
type FetchCustomerThunk = (dispatch: AppDispatch) => Promise<void>;
export const fetchCustomer =
  (id: string): FetchCustomerThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/customers/${id}`
      );
      dispatch(setCustomer(response.data));
    } catch (error) {
      console.error("Gagal mengambil data customer", error);
    }
  };
