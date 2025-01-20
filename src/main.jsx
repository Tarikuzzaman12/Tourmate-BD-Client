import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Community from './pages/Community.jsx';
import Trips from './pages/Trips.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import PkgDetails from './Components/PkgDetails.jsx';
import AuthProvider from './Components/Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register.jsx';
import GuideDetails from './Components/GuideDetails.jsx';
import Stories from './pages/Stories.jsx';
import AdminDashboard from './Dashboard/AdminDashboard.jsx';
import UserDashboard from './Dashboard/UserDashboard.jsx';
import GuideDashboard from './Dashboard/GuideDashboard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path: "/packages/:id",
        element: <PkgDetails></PkgDetails>,
      },
      {
        path: "/guides/:id",
        element: <GuideDetails></GuideDetails>,
      },
      {
        path: "community",
        element: <Community></Community>,
      },
      {
        path: "trips",
        element: <Trips></Trips>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "stories",
        element: <Stories></Stories>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path:"/dashboard/admin",
        element:<AdminDashboard></AdminDashboard>
      },
      {
        path:"/dashboard/user",
        element:<UserDashboard></UserDashboard>
      },
      {
        path:"/dashboard/guide",
        element:<GuideDashboard></GuideDashboard>
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
   <RouterProvider router={router} />
   </AuthProvider>
    </StrictMode>,
)
