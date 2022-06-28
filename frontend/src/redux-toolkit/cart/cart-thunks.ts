import { createAsyncThunk } from "@reduxjs/toolkit";

import { Product } from "../../types/types";
import RequestService from "../../utils/request-service";
import { USERS_CART } from "../../constants/urlConstants";

export const fetchCart = createAsyncThunk<Array<Product>, Array<number>>("cart/fetchCart", async (productIds) => {
    const response = await RequestService.post(USERS_CART, productIds);
    return response.data;
});
