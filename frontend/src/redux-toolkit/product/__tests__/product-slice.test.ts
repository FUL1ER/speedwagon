import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { LoadingStatus } from "../../../types/types";
import { API_BASE_URL, PRODUCTS, PRODUCTS_GRAPHQL_PRODUCT, PRODUCTS_REVIEWS } from "../../../constants/urlConstants";
import { store } from "../../../store";
import { initialState } from "../product-slice";
import { productData } from "../../../utils/test-data/product-test-data";
import { fetchProduct, fetchProductByQuery, fetchReviewsByProductId } from "../product-thunks";

describe("product slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().product;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchProduct dispatches fulfilled on success", async () => {
        expect(state.product).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PRODUCTS}/34`).reply(200, productData);
        const result = await store.dispatch(fetchProduct("34"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchProduct/fulfilled");
        expect(state.product).toEqual(productData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProduct dispatches rejected on failure", async () => {
        expect(state.errorMessage).toEqual("");
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PRODUCTS}/34`).reply(400, "ERROR");
        const result = await store.dispatch(fetchProduct("34"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchProduct/rejected");
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });

    it("should fetchReviewsByProductId dispatches fulfilled on success", async () => {
        expect(state.reviews).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PRODUCTS_REVIEWS}/34`).reply(200, productData.reviews);
        const result = await store.dispatch(fetchReviewsByProductId("34"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchReviewsByProductId/fulfilled");
        expect(state.reviews).toEqual(productData.reviews);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProductByQuery dispatches fulfilled on success", async () => {
        expect(state.product).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PRODUCTS_GRAPHQL_PRODUCT).reply(200, { data: { product: productData } });
        const result = await store.dispatch(fetchProductByQuery("1"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchProductByQuery/fulfilled");
        expect(state.product).toEqual(productData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProductByQuery dispatches rejected on failure", async () => {
        expect(state.errorMessage).toEqual("");
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PRODUCTS_GRAPHQL_PRODUCT).reply(400, "ERROR");
        const result = await store.dispatch(fetchProductByQuery("1"));

        state = store.getState().product;
        expect(result.type).toBe("product/fetchProductByQuery/rejected");
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });
});
