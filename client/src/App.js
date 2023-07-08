import React, {useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSession,
  getUser,
  getUserPostsQuery,
  logout,
} from "./api/requests";
import { getUserPosts, loginUser, logoutUser } from "./store/userSlice";
import Alert from "./components/Alert";
import Layout from "./components/Layout";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [sessionExpired, setSessionExpired] = useState(false);

  // update a user information
  useQuery({
    enabled: user !== null,
    queryKey: ["users", "find", `${user?._id}`],
    queryFn: () => getUser(user?._id),
    onSuccess: ({ data }) => dispatch(loginUser(data)),
    onError: (err) => console.error(err),
  });

  // update user posts
  useQuery({
    enabled: user !== null,
    queryKey: ["posts", "user", `${user?._id}`],
    queryFn: () => getUserPostsQuery(user?._id),
    onSuccess: ({ data }) => dispatch(getUserPosts(data)),
    onError: (err) => console.error(err),
  });

  // checking if token is expired and login out user
  useQuery({
    enabled: user !== null,
    queryKey: ["auth", "session"],
    queryFn: checkSession,
    onError: async (err) => {
      const errMsg = err.response?.data?.message;
      if (
        errMsg === "token expired" ||
        errMsg === "You are not Unauthenticated"
      ) {
        await logout();
        dispatch(logoutUser());
        setSessionExpired(true);
      } else {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={user ? <Home /> : <Navigate to="auth" />} />
          <Route path="auth" element={<Auth />} />
          <Route path="profile/:id" element={user ? <Profile /> : <Auth />} />
        </Route>
        <Route path="/*" element={<h2>Page not found</h2>} />
      </Routes>

      {sessionExpired && (
        <Alert
          title="Session is Expired"
          closeModal={() => setSessionExpired(false)}
        />
      )}
    </>
  );
}

export default App;
