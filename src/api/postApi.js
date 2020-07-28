import axiosClient from './axiosClient';

const postApi = {
  getAllPost: (params) => {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },
};
export default postApi;
