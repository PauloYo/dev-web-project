import { createBrowserRouter } from "react-router-dom"

import Home from "../views/Home"
import SignIn from "../views/SignIn"
import Login from "../views/Login"
import PublicLists from "../views/PublicLists"
import UserLists from "../views/UserLists"
import Games from "../views/Games"
import CreateList from "../views/CreateList"
import ProfileEdit from "../views/ProfileEdit"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/profile-edit",
    Component: ProfileEdit
  },
  {
    path: "/create-list",
    Component: CreateList
  },
  {
    path: "/user-lists",
    Component: UserLists
  },
  {
    path: "/games",
    Component: Games
  },
  {
    path: "/public-lists",
    Component: PublicLists
  },
])
