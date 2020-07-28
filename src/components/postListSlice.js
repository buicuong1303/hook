import { createSlice } from '@reduxjs/toolkit';
import postApi from '../api/postApi';
const posts = createSlice({
  name: 'posts',
  initialState: {
    listPosts: [],
    pagination: {
      _page: 1,
      _limit: 10,
      _totalRow: 11,
    },
    isLoading: false,
    error: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
    getListPostSuccess: (state, action) => {
      state.listPosts = action.payload.data;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = posts;
const { getListPostSuccess, startLoading, hasError } = actions;
export const fetchPostList = (params) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await postApi.getAllPost(params);
    dispatch(getListPostSuccess(res));
  } catch (error) {
    dispatch(hasError(error.message));
  }
};
export default reducer;
