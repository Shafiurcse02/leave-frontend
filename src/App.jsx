import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import PrivateRoute from "./components/PrivateRoute.jsx"
import { fetchCurrentUser } from "./features/auth/authAPI"
import About from "./pages/About.jsx"
import Home from "./pages/Home.jsx"
import Leave from "./pages/Leave.jsx"
import LeaveTypeEdit from "./pages/LeaveTypeEdit.jsx"
import LeaveTypeList from "./pages/LeaveTypeList.jsx"
import Login from "./pages/Login.jsx"
import LogoutPage from "./pages/LogoutPage.jsx"
import NotFound from "./pages/NotFound.jsx"
import P from "./pages/P.jsx"
import Profile from "./pages/Profile.jsx"
import Registration from "./pages/Registration.jsx"
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pop" element={<P />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/logout"
            element={
              <PrivateRoute>
                <LogoutPage />
              </PrivateRoute>}
          />
          {/* Protected Route */}
          <Route path="/leave"
            element={
              <PrivateRoute>
                <Leave />
              </PrivateRoute>}
          />
          <Route path="/leaveTypes"
            element={
              <PrivateRoute>
                <LeaveTypeList />
              </PrivateRoute>}
          />
          <Route path="/leave-types/edit/:id"
            element={
              <PrivateRoute>
                <LeaveTypeEdit />
              </PrivateRoute>}
          />
          <Route path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App