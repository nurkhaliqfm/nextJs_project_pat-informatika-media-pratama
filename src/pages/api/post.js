import axios from "axios";

const API_BASE_URL = "http://localhost:8001/api/posts";

export const fetchAllPosts = async (page) => {
  const response = await axios.get(`${API_BASE_URL}?page=${page}`);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createPost = async (post) => {
  const response = await axios.post(API_BASE_URL, post);
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
