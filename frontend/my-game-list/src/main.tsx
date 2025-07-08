import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './routes/Home.tsx'
import SignIn from './routes/SignIn.tsx'
import Login from './routes/Login.tsx'
import ProfileEdit from './routes/ProfileEdit.tsx'
import CreateList from './routes/CreateList.tsx'
import UserLists from './routes/UserLists.tsx'
import Games from './routes/Games.tsx'
import PublicLists from './routes/PublicLists.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/create-list" element={<CreateList />} />
        <Route path="/user-lists" element={<UserLists />} />
        <Route path="/games" element={<Games />} />
        <Route path="/public-lists" element={<PublicLists />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
