import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const API = axios.create({baseURL : baseUrl, withCredentials : true});

export const checkSession = async () => (await API.get("/api/auth/session")).data;

export const login = async (formData) => (await API.post("/api/auth/login", formData)).data;

export const logout = async () => (await API.get("/api/auth/logout")).data;

export const signup = async (formData) => (await API.post("/api/auth/register", formData)).data

export const createPost = async (postData) => (await API.post("/api/posts/create", postData)).data

export const getPosts = async () => (await API.get("/api/posts")).data

export const getUserPostsQuery = async (userId) => (await API.get(`/api/posts//user/${userId}`)).data

export const getUserFollowers = async (userId) => (await API.get(`/api/users/find/${userId}/following`)).data

export const getUser = async (userId) => (await API.get(`/api/users/find/${userId}`)).data

export const updateUserQuery = async (userId, data) => (await API.put(`/api/users/find/${userId}`, data)).data

export const followUserRequest = async (userId) => (await API.put(`/api/users/find/${userId}/follow`)).data

export const unFollowUserRequest = async (userId) => (await API.put(`/api/users/find/${userId}/unfollow`)).data

export const likePost = async (postId) => (await API.put(`/api/posts/find/${postId}/like`)).data

export const dislikePost = async (postId) => (await API.put(`/api/posts/find/${postId}/dislike`)).data


