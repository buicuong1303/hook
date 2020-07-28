import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../postListSlice';

const rootReducer = {
  posts: postReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
