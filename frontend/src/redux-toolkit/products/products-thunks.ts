import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../utils/request-service";
import {
    PRODUCTS,
    PRODUCTS_GRAPHQL_IDS,
    PRODUCTS_GRAPHQL_PRODUCTS,
    PRODUCTS_IDS,
    PRODUCTS_SEARCH,
    PRODUCTS_SEARCH_TEXT
} from "../../constants/urlConstants";
import { FilterParamsType, HeaderResponse, Product, ProductSearchRequest } from "../../types/types";
import { getProductsByIdsQuery, getAllProductsByQuery } from "../../utils/graphql-query/product-query";

export const fetchProducts = createAsyncThunk<HeaderResponse<Product>, number>(
    "products/fetchProducts",
    async (page) => {
        const response = await RequestService.get(`${PRODUCTS}?page=${page}`);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchProductsByIds = createAsyncThunk<Array<Product>, Array<number>>(
    "products/fetchProductsByIds",
    async (ids) => {
        const response = await RequestService.post(PRODUCTS_IDS, ids);
        return response.data;
    }
);

export const fetchProductsByFilterParams = createAsyncThunk<HeaderResponse<Product>, FilterParamsType>(
    "products/fetchProductsByFilterParams",
    async (filter) => {
        const response = await RequestService.post(`${PRODUCTS_SEARCH}?page=${filter.currentPage}`, filter);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchProductsByInputText = createAsyncThunk<HeaderResponse<Product>, ProductSearchRequest>(
    "products/fetchProductsByInputText",
    async (data) => {
        const response = await RequestService.post(`${PRODUCTS_SEARCH_TEXT}?page=${data.currentPage}`, data);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

// GraphQL thunks
export const fetchProductsByQuery = createAsyncThunk<Array<Product>>("products/fetchProductsByQuery", async () => {
    const response = await RequestService.post(PRODUCTS_GRAPHQL_PRODUCTS, { query: getAllProductsByQuery });
    return response.data.data.products;
});

export const fetchProductsByIdsQuery = createAsyncThunk<Array<Product>, Array<number>>(
    "products/fetchProductsByIdsQuery",
    async (ids) => {
        const response = await RequestService.post(PRODUCTS_GRAPHQL_IDS, { query: getProductsByIdsQuery(ids) });
        return response.data.data.productsIds;
    }
);
