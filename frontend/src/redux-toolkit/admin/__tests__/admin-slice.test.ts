import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {
    ADMIN_ADD,
    ADMIN_DELETE,
    ADMIN_EDIT,
    ADMIN_GRAPHQL_USER,
    ADMIN_GRAPHQL_USER_ALL,
    ADMIN_USER,
    ADMIN_USER_ALL,
    API_BASE_URL
} from "../../../constants/urlConstants";
import { store } from "../../../store";
import {
    addProduct,
    deleteProduct,
    fetchAllUsers,
    fetchAllUsersByQuery,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateProduct
} from "../admin-thunks";
import { LoadingStatus } from "../../../types/types";
import { productData, productErrorData, productsData } from "../../../utils/test-data/product-test-data";
import { initialState } from "../admin-slice";
import { userData, usersData } from "../../../utils/test-data/user-test-data";

describe("admin slice tests", () => {
    const mock = new MockAdapter(axios);
    const mockFormData: FormData = new FormData();
    let state = store.getState().admin;

    beforeEach(() => {
        state = initialState;
        mockFormData.append("file", "file");
        mockFormData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
    });

    it("should addProduct dispatches pending and fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isProductAdded).toEqual(false);

        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(200);
        const result = await store.dispatch(addProduct(mockFormData));

        state = store.getState().admin;
        expect(result.type).toBe("admin/addProduct/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isProductAdded).toEqual(true);
    });

    it("should addProduct dispatches rejected on failure", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isProductAdded).toEqual(false);
        expect(state.errors).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_ADD).reply(400, productErrorData);
        const result = await store.dispatch(addProduct(mockFormData));

        state = store.getState().admin;
        expect(result.type).toBe("admin/addProduct/rejected");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isProductAdded).toEqual(false);
        expect(state.errors).toEqual(productErrorData);
    });

    it("should updateProduct dispatches pending and fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isProductEdited).toEqual(false);
        expect(store.getState().product.product).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_EDIT).reply(200, productData);
        const result = await store.dispatch(updateProduct(mockFormData));

        state = store.getState().admin;
        expect(result.type).toBe("admin/updateProduct/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isProductEdited).toEqual(true);
        expect(store.getState().product.product).toEqual(productData);
    });

    it("should updateProduct dispatches pending and fulfilled on failure", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isProductEdited).toEqual(false);
        expect(state.errors).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_EDIT).reply(400, productErrorData);
        const result = await store.dispatch(updateProduct(mockFormData));

        state = store.getState().admin;

        expect(result.type).toBe("admin/updateProduct/rejected");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isProductEdited).toEqual(false);
        expect(state.errors).toEqual(productErrorData);
    });

    it("should deleteProduct dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.isProductDeleted).toEqual(false);
        expect(state.errors).toEqual({});

        mock.onDelete(API_BASE_URL + `${ADMIN_DELETE}/${1}`).reply(200, productsData);
        const result = await store.dispatch(deleteProduct(1));

        state = store.getState().admin;

        expect(result.type).toBe("admin/deleteProduct/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.isProductDeleted).toEqual(true);
        expect(state.errors).toEqual({});
    });

    it("should fetchAllUsers dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.users).toEqual([]);

        mock.onGet(API_BASE_URL + ADMIN_USER_ALL).reply(200, usersData);
        const result = await store.dispatch(fetchAllUsers(1));

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchAllUsers/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.users).toEqual(usersData);
    });

    it("should fetchUserInfo dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.user).toEqual({});

        mock.onGet(API_BASE_URL + `${ADMIN_USER}/1`).reply(200, userData);
        const result = await store.dispatch(fetchUserInfo("1"));

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchUserInfo/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.user).toEqual(userData);
    });

    it("should fetchUserInfoByQuery dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.user).toEqual({});

        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_USER).reply(200, userData);
        const result = await store.dispatch(fetchUserInfoByQuery("1"));

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchUserInfoByQuery/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.user).toEqual(userData);
    });

    it("should fetchAllUsersByQuery dispatches fulfilled on success", async () => {
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);
        expect(state.users).toEqual([]);

        mock.onPost(API_BASE_URL + ADMIN_GRAPHQL_USER_ALL).reply(200, usersData);
        const result = await store.dispatch(fetchAllUsersByQuery());

        state = store.getState().admin;

        expect(result.type).toBe("admin/fetchAllUsersByQuery/fulfilled");
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
        expect(state.users).toEqual(usersData);
    });
});
