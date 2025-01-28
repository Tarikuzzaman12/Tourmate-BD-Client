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
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Register.jsx';
import GuideDetails from './Components/GuideDetails.jsx';
import Stories from './pages/Stories.jsx';
import AdminDashboard from './Dashboard/AdminDashboard.jsx';
import UserDashboard from './Dashboard/UserDashboard.jsx';
import GuideDashboard from './Dashboard/GuideDashboard.jsx';
import ManageProfile from './UserDashboardComponents/ManageProfile.jsx';
import JoinGuide from './UserDashboardComponents/JoinGuide.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';
import Booking from './UserDashboardComponents/Booking.jsx';
import AddStory from './UserDashboardComponents/AddStory.jsx';
import ManageStory from './UserDashboardComponents/ManageStory.jsx';
import Payment from './UserDashboardComponents/Payment.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GManageProfile from './GuideDashboardComponents/GManageProfile.jsx';
import GAddStory from './GuideDashboardComponents/GAddStory.jsx';
import GManageStory from './GuideDashboardComponents/GManageStory.jsx';
import AssignedTour from './GuideDashboardComponents/AssignedTour.jsx';
import AManageProfile from './AdminDashboardComponents/AManageProfile.jsx';
import AddPackage from './AdminDashboardComponents/AddPackage.jsx';
import ManageUser from './AdminDashboardComponents/ManageUser.jsx';
import ManageCandidates from './AdminDashboardComponents/ManageCandidates.jsx';

const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your actual key

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
        element:<ProtectedRoute role="admin"><AdminDashboard ></AdminDashboard></ProtectedRoute>,
        children: [
          {
            path: "manage-profile",
            element:<AManageProfile></AManageProfile>,
          },
          {
            path: "add-package",
            element:<AddPackage></AddPackage>,
          },
          {
            path: "manage-users",
            element:<ManageUser></ManageUser>,
          },
          {
            path: "manage-candidates",
            element:<ManageCandidates></ManageCandidates>,
          },
        
        ]
      },
      {
        path:"/dashboard/user",
        element:<ProtectedRoute role="user"><UserDashboard></UserDashboard></ProtectedRoute>,
        children: [
          {
            path: "manage-profile",
            element:<ManageProfile></ManageProfile>,
          },
          {
            path: "join-guide",
            element:<JoinGuide></JoinGuide>,
          },
          {
            path: "my-bookings",
            element:<Booking></Booking>,
          },
          {
            path: "add-story",
            element:<AddStory></AddStory>,
          },
          {
            path: "manage-stories",
            element:<ManageStory></ManageStory>,
          },
        
        ]
      },
      {
        path:"/dashboard/guide",
        element:<ProtectedRoute role="guide"><GuideDashboard></GuideDashboard></ProtectedRoute>,
        children: [
          {
            path: "manage-profile",
            element:<GManageProfile></GManageProfile>,
          },
          {
            path: "my-assigned",
            element:<AssignedTour></AssignedTour>,
          },
          {
            path: "add-story",
            element:<GAddStory></GAddStory>,
          },
          {
            path: "manage-stories",
            element:<GManageStory></GManageStory>,
          },
        
        ]
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/payment/:id",
        element: (
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        ),
      },
    ],
  },
]);


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

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
   </QueryClientProvider>
  </StrictMode>
);
