import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import Home from "../pages/home";
import UserDetail from "../pages/user/UserDetail";
import Followers from "../pages/user/followers";
import Following from "../pages/user/following";
import Post from "../pages/posts/Post";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/users/:username",
    element: <UserDetail />,
  },
  {
    path: "/users/:username/followers",
    element: <Followers />,
  },
  {
    path: "/users/:username/following",
    element: <Following />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);
