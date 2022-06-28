import { LoadingStatus, ProductErrors, User } from "../../types/types";
import { RootState } from "../../store";
import { AdminState } from "./admin-slice";
import {updateProduct} from "./admin-thunks";

export const selectAdminState = (state: RootState): AdminState => state.admin;
export const selectAdminStateUsers = (state: RootState): Array<User> => selectAdminState(state).users;
export const selectAdminStateUser = (state: RootState): Partial<User> => selectAdminState(state).user;
export const selectPagesCount = (state: RootState): number => selectAdminState(state).pagesCount;
export const selectTotalElements = (state: RootState): number => selectAdminState(state).totalElements;
export const selectAdminStateErrors = (state: RootState): Partial<ProductErrors> => selectAdminState(state).errors;
export const selectIsProductAdded = (state: RootState): boolean => selectAdminState(state).isProductAdded;
export const selectIsProductEdited = (state: RootState): boolean => selectAdminState(state).isProductEdited;
export const selectIsProductDeleted = (state: RootState): boolean => selectAdminState(state).isProductDeleted;
export const selectIsAdminStateLoading = (state: RootState): boolean => selectAdminState(state).loadingState === LoadingStatus.LOADING;
